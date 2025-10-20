package main

import (
	"log"
	"net/http"
	"os"

	"clientSideServerProject/internal/api"
	"clientSideServerProject/internal/db"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	dbConn, err := db.Connect()
	if err != nil {
		log.Fatal("DB connection error:", err)
	}
	defer dbConn.Close()

	r := chi.NewRouter()

	// Middleware CORS para permitir peticiones desde el frontend
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			if req.Method == "OPTIONS" {
				w.WriteHeader(http.StatusNoContent)
				return
			}
			next.ServeHTTP(w, req)
		})
	})

	api.RegisterRoutes(r, dbConn)

	port := os.Getenv("BACKEND_PORT")
	if port == "" {
		port = "8081"
	}
	log.Printf("Servidor corriendo en el puerto %s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
