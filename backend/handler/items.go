package handler

import (
	"backend/data"
	"backend/types"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
)

const storagePath = "./mock/storage.json"

func SaveRecipeToFile(newRecipe types.Recipe) error {
	// Ensure the tmp directory exists
	if err := os.MkdirAll(filepath.Dir(storagePath), os.ModePerm); err != nil {
		return fmt.Errorf("failed to create directory: %w", err)
	}

	var recipes []types.Recipe

	// Load existing recipes
	if file, err := os.ReadFile(storagePath); err == nil {
		if err := json.Unmarshal(file, &recipes); err != nil {
			return fmt.Errorf("failed to parse existing recipes: %w", err)
		}
	}
	recipes = append(recipes, newRecipe)
	data, err := json.MarshalIndent(recipes, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal recipes: %w", err)
	}

	if err := os.WriteFile(storagePath, data, 0644); err != nil {
		return fmt.Errorf("failed to write file: %w", err)
	}
	fmt.Println("SaveRecipeToFile")
	return nil
}


// store _id in frontend, use _id to fetch recipes
func GetItem(c *fiber.Ctx) error {
	id := c.Params("id")

	// Loop through the mock data to find the recipe by ID
	var item types.Recipe
	for _, recipe := range data.Recipes {
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

	// Return the found recipe as JSON
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
	return c.JSON(data.Recipes)

}

func CreateItems(c *fiber.Ctx) error {
	fmt.Println("CreateItems")

	var recipe types.Recipe
	if err := c.BodyParser(&recipe); err != nil {
		fmt.Println("Error parsing body:", err)
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	fmt.Printf("Received recipe: %+v\n", recipe)
	if err := SaveRecipeToFile(recipe); err != nil {
		fmt.Println("Failed to save recipe:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to save recipe"})
	}
	return c.Status(201).JSON(fiber.Map{
		"message": "Recipe received (mocked)",
		"item":    recipe,
	})
	// var collection = c.Locals("db").(*mongo.Collection)
	// var insertResult *mongo.InsertOneResult
	// var err error
	// item := new(Item)
	// c.BodyParser(item)
	// if err := c.BodyParser(item); err != nil {
	// 	fmt.Println(err)
	// 	return err
	// }
	// if item.Body.ID == "" {
	// 	return c.Status(400).JSON(fiber.Map{"error": "item body cannot be empty"})
	// }
	// if insertResult, err = collection.InsertOne(context.Background(), item); err != nil {
	// 	return err
	// }
	// item.ID = insertResult.InsertedID.(primitive.ObjectID)
	// return c.Status(201).JSON(item) 

}

func PatchItems(c *fiber.Ctx) error {
	fmt.Println("PatchItems")
	return nil

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