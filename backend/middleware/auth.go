package middleware

import (
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
)

// AuthMiddleware checks for an Authorization token
func AuthMiddleware(c *fiber.Ctx) error {
    authHeader := c.Get("Authorization")
    log.Printf("Authorization Header: %s", authHeader) // Log the Authorization header
    
    if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
    }

    // In a real application, you would validate the token here
    // token := strings.TrimPrefix(authHeader, "Bearer ")
    // if !isValidToken(token) {
    //     return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
    // }

    return c.Next()  // Proceed to the next handler if the token is valid
}