// middleware/dbMiddleware.go

package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

// AttachDBMiddleware attaches the MongoDB collection to the request context
func AttachDBMiddleware(client *mongo.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Attach the MongoDB collection to the request context
		dbName := os.Getenv("MONGO_DB_NAME") // Use the database name from the environment variable

		if dbName == "" {
			return c.Status(500).JSON(fiber.Map{
				"error": "Database name is not configured properly",
			})
		}

		// Hardcode collection name (e.g., "items")
		collection := client.Database(dbName).Collection("items")
		c.Locals("db", collection)
		return c.Next()
	}
}