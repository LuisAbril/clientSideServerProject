package api

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"clientSideServerProject/internal/db"

	"github.com/go-chi/chi/v5"
)

func RegisterRoutes(r *chi.Mux, dbConn *sql.DB) {
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API is running"))
	})

	r.Get("/rankings/{difficulty}", func(w http.ResponseWriter, r *http.Request) {
		difficulty := chi.URLParam(r, "difficulty")
		if difficulty != "easy" && difficulty != "medium" && difficulty != "hard" {
			http.Error(w, "Invalid difficulty", http.StatusBadRequest)
			return
		}

		rankings, err := db.GetRankingsByDifficulty(dbConn, difficulty)
		if err != nil {
			http.Error(w, "Error fetching rankings", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(rankings)
	})
}


