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
	log.Printf("Running in %s", os.Getenv("ENV"))
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

