package middleware

import (
	"log"
	"net/http"
)

// LoggingMiddleware logs the incoming HTTP request
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Request: %s %s", r.Method, r.URL.Path) // Log the HTTP method and path
		next.ServeHTTP(w, r)  // Call the next handler in the chain
	})
}