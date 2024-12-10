package main

import (
	"context"
	"fmt"
	"golang-backend/handler"
	"golang-backend/middleware"

	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)






func main() {
	fmt.Println("Connecting server")

	if os.Getenv("ENV") != "production" {
		// load the .evn file if not in production
		err := godotenv.Load("../client/.env")
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
	// -------- MongoDB END Section -------- //
	
	// -------- API Calls Section -------- //

	app := fiber.New()

	// Middleware
	app.Use(middleware.LoggingMiddleware)         // Log every request
	app.Use(middleware.CORSConfig())             // Handle CORS
	// app.Use(middleware.AuthMiddleware)           // Handle authentication (only for certain routes)
	app.Use(middleware.AttachDBMiddleware(client)) // Attach MongoDB to request

	app.Get("/api/items", handler.GetItems)
	app.Get("/api/items/:id", handler.GetItem)
	app.Post("/api/items", handler.CreateItems)
	app.Patch("/api/items/:id", handler.PatchItems)
	app.Delete("/api/items/:id", handler.DeleteItems)

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


