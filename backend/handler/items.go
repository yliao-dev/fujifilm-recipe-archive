package handler

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)


type Company struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ContactEmail string `json:"contactEmail"`
	ContactPhone string `json:"contactPhone"`
}

type Body struct {
	ID          string  `json:"id"`
	Title       string  `json:"title"`
	Type        string  `json:"type"`
	Description string  `json:"description"`
	Location    string  `json:"location"`
	Salary      string  `json:"salary"`
	Company     Company `json:"company"`
}

type Item struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Status bool `json:"status"`
	Body Body `json:"body"`
}


// store _id in frontend, use _id to fetch jobs
// func GetItem(c *fiber.Ctx) error {
// 	var collection = c.Locals("db").(*mongo.Collection)
// 	var err error
// 	var objectID primitive.ObjectID
// 	var item = Item
// 	var id = c.Params("id")

// 	if objectID, err = primitive.ObjectIDFromHex(id); err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": "invalid item ID for get"})
// 	}
// 	filter := bson.M{"_id": objectID}
// 	if err = collection.FindOne(context.Background(), filter).Decode(&item); err != nil {
// 				if err == mongo.ErrNoDocuments {
// 			return c.Status(404).JSON(fiber.Map{"error": "item not found"})
// 		}
// 		// If there is any other error, return a 500 internal error
// 		return c.Status(500).JSON(fiber.Map{"error": "failed to fetch item"})
// 	}


// 	return c.JSON(item)
// }

func GetItems(c *fiber.Ctx) error {
	var collection = c.Locals("db").(*mongo.Collection)
	var items []Item
	var cursor *mongo.Cursor // represents an iterator for query results.
	var err error

	// bson.M{}: An empty BSON map used as the filter, meaning return all documents.
	if cursor, err = collection.Find(context.Background(), bson.M{}); err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var item Item
		if err := cursor.Decode(&item); err != nil {
			return err
		}
		items = append(items, item)
	}

	return c.JSON(items)
}

func CreateItems(c *fiber.Ctx) error {
	var collection = c.Locals("db").(*mongo.Collection)
	var insertResult *mongo.InsertOneResult
	var err error
	item := new(Item)
	c.BodyParser(item)
	if err := c.BodyParser(item); err != nil {
		return err
	}
	if item.Body.ID == "" {
		return c.Status(400).JSON(fiber.Map{"error": "item body cannot be empty"})
	}
	if insertResult, err = collection.InsertOne(context.Background(), item); err != nil {
		return err
	}
	item.ID = insertResult.InsertedID.(primitive.ObjectID)
	return c.Status(201).JSON(item) 
}

func PatchItems(c *fiber.Ctx) error {
	var collection = c.Locals("db").(*mongo.Collection)
	var objectID primitive.ObjectID
	var err error
	id := c.Params("id")
	if objectID, err = primitive.ObjectIDFromHex(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid todo ID"})
	}
	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"status": true}}
	if _, err = collection.UpdateOne(context.Background(), filter, update); err != nil {
		return err
	}
	return c.Status(200).JSON(fiber.Map{"success": true})

}
func DeleteItems(c *fiber.Ctx) error {
	var collection = c.Locals("db").(*mongo.Collection)
	var objectID primitive.ObjectID
	var err error
	id := c.Params("id")
	if objectID, err = primitive.ObjectIDFromHex(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid item ID for delete"})
	}
	filter := bson.M{"_id": objectID}
	if _, err = collection.DeleteOne(context.Background(), filter); err != nil {
		return err
	}
	return c.Status(200).JSON(fiber.Map{"success": true})
}