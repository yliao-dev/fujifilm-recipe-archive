// middleware/dbMiddleware.go

package middleware

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

// AttachDBMiddleware attaches the MongoDB collection to the request context
func AttachDBMiddleware(client *mongo.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Attach the MongoDB collection to the request context
		collection := client.Database("golang_db").Collection("items")
		c.Locals("db", collection)
		return c.Next()
	}
}