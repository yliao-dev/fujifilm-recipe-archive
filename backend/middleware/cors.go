package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// CORSConfig is a function that returns the CORS middleware
func CORSConfig() fiber.Handler {
	return cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173", // Adjust the origin if necessary
		AllowHeaders: "Origin,Content-Type,Accept",
	})
}