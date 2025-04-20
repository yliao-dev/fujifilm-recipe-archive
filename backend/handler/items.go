package handler

import (
	"context"
	"fmt"
	"log"

	"golang-backend/mock"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)


type Settings struct {
	Color             string `json:"color" bson:"color"`
	Contrast          string `json:"contrast" bson:"contrast"`
	Highlight         string `json:"highlight" bson:"highlight"`
	Shadow            string `json:"shadow" bson:"shadow"`
	Sharpness         string `json:"sharpness" bson:"sharpness"`
	Clarity           string `json:"clarity" bson:"clarity"`
	GrainEffect       string `json:"grain_effect" bson:"grain_effect"`
	ColorChromeEffect string `json:"color_chrome_effect" bson:"color_chrome_effect"`
	// Add more fields as needed...
}

type Recipe struct {
	ID             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name           string             `json:"name" bson:"name"`
	CameraModels   []string           `json:"camera_models" bson:"camera_models"`
	FilmSimulation string             `json:"film_simulation" bson:"film_simulation"`
	Creator        string             `json:"creator" bson:"creator"`
	Tags           []string           `json:"tags" bson:"tags"`
	Notes          string             `json:"notes" bson:"notes"`
	SampleImageURL string             `json:"sample_image_url" bson:"sample_image_url"`
	Settings       Settings           `json:"settings" bson:"settings"`
}

// store _id in frontend, use _id to fetch recipes
func GetItem(c *fiber.Ctx) error {
	var collection = c.Locals("db").(*mongo.Collection)
	var err error
	var objectID primitive.ObjectID
	var item Recipe
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
	return c.JSON(item)
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
	return c.JSON(mock.Recipes)

}

func CreateItems(c *fiber.Ctx) error {
	fmt.Println("CreateItems")
	return nil
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