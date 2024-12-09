package middleware

import (
	"net/http"
	"strings"
)

// AuthMiddleware checks for an Authorization token
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// In a real application, you would validate the token here
		// token := strings.TrimPrefix(authHeader, "Bearer ")
		// if !isValidToken(token) {
		//     http.Error(w, "Unauthorized", http.StatusUnauthorized)
		//     return
		// }

		next.ServeHTTP(w, r)  // Proceed to the next handler if authenticated
	})
}