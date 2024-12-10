package middleware

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

// LoggingMiddleware logs the incoming HTTP request
func LoggingMiddleware(c *fiber.Ctx) error {
	// Log the HTTP method and path
	log.Printf("Request: %s %s", c.Method(), c.Path())

	// Call the next handler in the chain
	return c.Next()
}