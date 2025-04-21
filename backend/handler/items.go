package handler

import (
	"backend/types"
	"context"
	"fmt"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// store _id in frontend, use _id to fetch recipes
func GetItem(c *fiber.Ctx) error {
	var collection = c.Locals("db").(*mongo.Collection)
	var err error
	var objectID primitive.ObjectID
	var item types.Recipe
	id := c.Params("id")

	if objectID, err = primitive.ObjectIDFromHex(id); err != nil {
		log.Printf("Invalid ObjectID: %s", id) // Log invalid ObjectID
		return c.Status(400).JSON(fiber.Map{"error": "invalid item ID for get"})
	}
	filter := bson.M{"_id": objectID}
	if err = collection.FindOne(context.Background(), filter).Decode(&item); err != nil {
	    log.Printf("Error fetching item: %v", err) // Log any errors	
		if err == mongo.ErrNoDocuments {
			return c.Status(404).JSON(fiber.Map{"error": "item not found"})
		}
		// If there is any other error, return a 500 internal error
		return c.Status(500).JSON(fiber.Map{"error": "failed to fetch item"})
	}
	// Convert _id to string
	item.ID = objectID.Hex()
	return c.JSON(item)
}

func GetItems(c *fiber.Ctx) error {
	var collection = c.Locals("db").(*mongo.Collection)
	var items []types.Recipe
	var cursor *mongo.Cursor // represents an iterator for query results.
	var err error

	// bson.M{}: An empty BSON map used as the filter, meaning return all documents.
	if cursor, err = collection.Find(context.Background(), bson.M{}); err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var item types.Recipe
		if err := cursor.Decode(&item); err != nil {
			return err
		}
		items = append(items, item)
	}
		if err := cursor.Err(); err != nil {
		return err
	}

	return c.JSON(items)
}


func CreateItem(c *fiber.Ctx) error {
	var item types.Recipe
	if err := c.BodyParser(&item); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	item.CreatedAt = time.Now().Format(time.RFC3339)

	collection := c.Locals("db").(*mongo.Collection)
	insertResult, err := collection.InsertOne(context.Background(), item)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert into database"})
	}
	item.ID = insertResult.InsertedID.(primitive.ObjectID).Hex()


	return c.Status(201).JSON(fiber.Map{
		"message": "Recipe saved to MongoDB",
		"item":    item,
	})
}

func PatchItem(c *fiber.Ctx) error {
	var collection = c.Locals("db").(*mongo.Collection)
	var objectID primitive.ObjectID
	var updateData bson.M
	var err error


	id := c.Params("id")
	if objectID, err = primitive.ObjectIDFromHex(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid todo ID"})
	}

	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid body"})
	}

	delete(updateData, "_id")
	log.Printf("\nUpdate Data: %+v", updateData)


	update := bson.M{"$set": updateData}
	filter := bson.M{"_id": objectID}

	if _, err = collection.UpdateOne(context.Background(), filter, update); err != nil {
    	return c.Status(500).JSON(fiber.Map{"error": "failed to update item"})
	}


	return c.Status(200).JSON(fiber.Map{
		"message": "Recipe updated successfully",
		"item_id": objectID.Hex(),
	})
}

func DeleteItem(c *fiber.Ctx) error {

	fmt.Println("DeleteItems")
	return nil

	// var collection = c.Locals("db").(*mongo.Collection)
	// var objectID primitive.ObjectID
	// var err error
	// id := c.Params("id")
	// if objectID, err = primitive.ObjectIDFromHex(id); err != nil {
	// 	return c.Status(400).JSON(fiber.Map{"error": "invalid item ID for delete"})
	// }
	// filter := bson.M{"_id": objectID}
	// if _, err = collection.DeleteOne(context.Background(), filter); err != nil {
	// 	return err
	// }
	// return c.Status(200).JSON(fiber.Map{"success": true})
}