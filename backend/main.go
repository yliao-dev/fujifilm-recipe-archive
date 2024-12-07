package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

func main() {
	fmt.Println("Connecting server")

	app := fiber.New()

	app.Get("/api/items", getItems)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	

	log.Fatal(app.Listen("0.0.0.0:" + port))
}

func getItems(c *fiber.Ctx) error {
	return c.SendString("Hello, Fiber")
}