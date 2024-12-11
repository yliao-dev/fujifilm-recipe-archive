package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// CORSConfig is a function that returns the CORS middleware


func CORSConfig() fiber.Handler {
	allowOrigins := "http://localhost:5173"  // Default for development
	if os.Getenv("ENV") == "production" {
		allowOrigins = "http://localhost:4173" // Set this to your production frontend URL
	}
	return cors.New(cors.Config{
		AllowOrigins: allowOrigins,  // Set dynamic URL based on ENV
		AllowMethods: "GET,POST,DELETE,PUT,PATCH",
		AllowHeaders: "Origin,Content-Type,Accept,Authorization",
	})
}