package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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
	ID primitive.ObjectID `json:"_id.omitempty" bson:"_id,omitempty"`
	Status bool `json:"status"`
	Body Body `json:"body"`
}

var collection *mongo.Collection


func main() {
	fmt.Println("Connecting server")

	if os.Getenv("ENV") != "production" {
		// load the .evn file if not in production
		err := godotenv.Load("../.env")
		if err != nil {
			log.Fatal("error loading .env file", err)
		}
	}
	// -------- MongoDB Section -------- //
	var client *mongo.Client
	var err error
	MONGODB_URL := os.Getenv("MONGODB_URL")
	if MONGODB_URL == "" {
		log.Fatal("MONGODB_URL is not set in the environment variables")
	}
	clientOptions := options.Client().ApplyURI(MONGODB_URL)
	if client, err = mongo.Connect(context.Background(), clientOptions); err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatal(err)
		}
	}()

	if err = client.Ping(context.Background(), nil); err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}
	fmt.Println("Connected to MONGODB ATLAS")

	collection = client.Database("golang_db").Collection("items")

	// -------- MongoDB END Section -------- //
	
	// -------- API Calls Section -------- //
	app := fiber.New()
	app.Get("/api/items", getItems)
	app.Post("/api/items", createItems)
	app.Patch("/api/items/:id", patchItems)
	app.Delete("/api/items/:id", deleteItems)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	if os.Getenv("ENV") == "production" {
		app.Static("/", ".client/dist")
	}
	

	log.Fatal(app.Listen("0.0.0.0:" + port))
}


// func checkDocumentSize() error {
// 	// Create a document
// 	job := bson.M{
// 		"id":          "1",  // From the "body" object
// 		"title":       "Senior React Developer", // From the "body" object
// 		"type":        "Full-Time", // From the "body" object
// 		"description": "We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript, with experience working with modern JavaScript frameworks such as React or Angular.", // From the "body" object
// 		"location":    "Boston, MA", // From the "body" object
// 		"salary":      "$70K - $80K", // From the "body" object
// 		"company": bson.M{ // Nested "company" object as another bson.M
// 			"name":        "NewTek Solutions",
// 			"description": "NewTek Solutions is a leading technology company specializing in web development and digital solutions. We pride ourselves on delivering high-quality products and services to our clients while fostering a collaborative and innovative work environment.",
// 			"contactEmail": "contact@teksolutions.com",
// 			"contactPhone": "555-555-5555",
// 		},
// 	}

// 	// Check the size of the document before inserting it
// 	docBytes, err := bson.Marshal(job)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	fmt.Printf("Document size: %d bytes\n", len(docBytes))
// 	return nil
// }

func getItems(c *fiber.Ctx) error {
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

func createItems(c *fiber.Ctx) error {
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

func patchItems(c *fiber.Ctx) error {
	return c.SendString("patchItems")
}
func deleteItems(c *fiber.Ctx) error {
	return c.SendString("deleteItems")
}

