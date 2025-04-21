package handler

import (
	"backend/types"
	"backend/utils"
	"context"
	"fmt"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// store _id in frontend, use _id to fetch recipes
func GetItem(c *fiber.Ctx) error {
	id := c.Params("id")


	recipes, err := utils.LoadRecipesFromFile(utils.StoragePath)
	if err != nil {
		log.Println("Failed to load recipes:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to load recipes"})
	}

	// Loop through the mock data to find the recipe by ID
	var item types.Recipe
	for _, recipe := range recipes {
		if recipe.ID == id { // Match by ID (mock data has the string ID)
			item = recipe
			break
		}
	}

	// If no item is found in mock data, return a 404 error
	if item.ID == "" {
		log.Printf("Recipe with ID %s not found", id)
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Recipe not found"})
	}
	return c.JSON(item)

	// var collection = c.Locals("db").(*mongo.Collection)
	// var err error
	// var objectID primitive.ObjectID
	// var item Recipe
	// id := c.Params("id")

	// if objectID, err = primitive.ObjectIDFromHex(id); err != nil {
	// 	log.Printf("Invalid ObjectID: %s", id) // Log invalid ObjectID
	// 	return c.Status(400).JSON(fiber.Map{"error": "invalid item ID for get"})
	// }
	// filter := bson.M{"_id": objectID}
	// if err = collection.FindOne(context.Background(), filter).Decode(&item); err != nil {
	//     log.Printf("Error fetching item: %v", err) // Log any errors	
	// 	if err == mongo.ErrNoDocuments {
	// 		return c.Status(404).JSON(fiber.Map{"error": "item not found"})
	// 	}
	// 	// If there is any other error, return a 500 internal error
	// 	return c.Status(500).JSON(fiber.Map{"error": "failed to fetch item"})
	// }
	// return c.JSON(item)
}

func GetItems(c *fiber.Ctx) error {
	// var collection = c.Locals("db").(*mongo.Collection)
	// var items []Recipe
	// var cursor *mongo.Cursor // represents an iterator for query results.
	// var err error

	// // bson.M{}: An empty BSON map used as the filter, meaning return all documents.
	// if cursor, err = collection.Find(context.Background(), bson.M{}); err != nil {
	// 	return err
	// }
	// defer cursor.Close(context.Background())

	// for cursor.Next(context.Background()) {
	// 	var item Recipe
	// 	if err := cursor.Decode(&item); err != nil {
	// 		return err
	// 	}
	// 	items = append(items, item)
	// }

	// return c.JSON(items)
	recipes, err := utils.LoadRecipesFromFile(utils.StoragePath)
	if err != nil {
		log.Println("Failed to load recipes:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to load recipes"})
	}
	return c.JSON(recipes)
}


func CreateItems(c *fiber.Ctx) error {
	var recipe types.Recipe
	if err := c.BodyParser(&recipe); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	recipe.ID = primitive.NewObjectID().Hex()
	recipe.CreatedAt = time.Now().Format(time.RFC3339)

	collection := c.Locals("db").(*mongo.Collection)
	insertResult, err := collection.InsertOne(context.Background(), recipe)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert into database"})
	}

	return c.Status(201).JSON(fiber.Map{
		"message": "Recipe saved to MongoDB",
		"id":      insertResult.InsertedID,
		"item":    recipe,
	})
}

func PatchItems(c *fiber.Ctx) error {
	fmt.Println("PatchItems")
		recipeId := c.Params("id")
	if recipeId == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Missing recipe ID"})
	}

	// Parse incoming update data
	var updatedData types.Recipe
	if err := c.BodyParser(&updatedData); err != nil {
		fmt.Println("Error parsing body:", err)
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Load all existing recipes
	recipes, err := utils.LoadRecipesFromFile(utils.StoragePath)
	if err != nil {
		fmt.Println("Failed to load recipes:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to load existing recipes"})
	}

	// Update the matching recipe
	updated := false
	for i, recipe := range recipes {
		if recipe.ID == recipeId {
			updatedData.ID = recipeId
			updatedData.CreatedAt = recipe.CreatedAt // preserve original createdAt
			recipes[i] = updatedData
			updated = true
			break
		}
	}

	if !updated {
		return c.Status(404).JSON(fiber.Map{"error": "Recipe not found"})
	}

	// Save the updated list back to file
	if err := utils.SaveRecipesToFile(recipes); err != nil {
		fmt.Println("Failed to save updated recipes:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to save updated recipes"})
	}

	return c.JSON(fiber.Map{
		"message": "Recipe updated successfully",
		"item":    updatedData,
	})

	// var collection = c.Locals("db").(*mongo.Collection)
	// var objectID primitive.ObjectID
	// var err error
	// id := c.Params("id")
	// if objectID, err = primitive.ObjectIDFromHex(id); err != nil {
	// 	return c.Status(400).JSON(fiber.Map{"error": "invalid todo ID"})
	// }
	// filter := bson.M{"_id": objectID}
	// update := bson.M{"$set": bson.M{"status": true}}
	// if _, err = collection.UpdateOne(context.Background(), filter, update); err != nil {
	// 	return err
	// }
	// return c.Status(200).JSON(fiber.Map{"success": true})
}

func DeleteItems(c *fiber.Ctx) error {

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