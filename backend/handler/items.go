package handler

import (
	"backend/types"
	"context"
	"log"
	"os"
	"path/filepath"
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
	// Parse the JSON body for the recipe text data
	if err := c.BodyParser(&item); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	
	// Set the created time
	item.CreatedAt = time.Now().Format(time.RFC3339)
	
	// Access the database collection
	collection := c.Locals("db").(*mongo.Collection)
	insertResult, err := collection.InsertOne(context.Background(), item)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert into database"})
	}

	// Extract the inserted ID
	id := insertResult.InsertedID.(primitive.ObjectID)
	item.ID = id.Hex()


	// Respond with a success message and the created item
	return c.Status(201).JSON(fiber.Map{
		"message": "Recipe saved to MongoDB",
		"item":    item,
	})
}

func PatchItem(c *fiber.Ctx) error {
	collection := c.Locals("db").(*mongo.Collection)
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid recipe ID"})
	}
	var updatedRecipe types.Recipe
	if err := c.BodyParser(&updatedRecipe); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	updatedRecipe.ID = ""
	updateData, err := bson.Marshal(updatedRecipe)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to serialize recipe data"})
	}
	var updateMap bson.M
	if err := bson.Unmarshal(updateData, &updateMap); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to prepare update data"})
	}
	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": updateMap}
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update recipe"})
	}
	updatedRecipe.ID = id

	return c.Status(200).JSON(fiber.Map{
		"message": "Recipe updated successfully",
		"item":    updatedRecipe,
	})
}

func DeleteItem(c *fiber.Ctx) error {
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


func UploadImage(c *fiber.Ctx) error {
    itemID := c.Params("id")
	log.Println("Item ID:", itemID) 
    if itemID == "" {
        return c.Status(400).JSON(fiber.Map{"error": "Item ID is required"})
    }
    file, err := c.FormFile("sample_image")
    if err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "No image file found"})
    }

    filename := itemID + filepath.Ext(file.Filename)
    filePath := filepath.Join("public", "images", filename)

    if err := createDirIfNotExist("public/images"); err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create images directory"})
    }

    if err := c.SaveFile(file, filePath); err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to save image"})
    }

    imageURL := "/images/" + filename
    return c.Status(200).JSON(fiber.Map{
        "message": "Image uploaded successfully",
        "image_url": imageURL,
    })
}
func createDirIfNotExist(dirPath string) error {
    if _, err := os.Stat(dirPath); os.IsNotExist(err) {
        err := os.MkdirAll(dirPath, os.ModePerm)
        if err != nil {
            return err
        }
    }
    return nil
}
