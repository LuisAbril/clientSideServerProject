package api

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"clientSideServerProject/internal/db"

	"github.com/go-chi/chi/v5"
)

type SaveRankingRequest struct {
	BattleNetName string `json:"BattleNetName"`
	GameDate      string `json:"GameDate"`
	Attempts      int    `json:"Attempts"`
	Difficulty    string `json:"Difficulty"`
}

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

	r.Post("/rankings", func(w http.ResponseWriter, r *http.Request) {
		var req SaveRankingRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request", http.StatusBadRequest)
			return
		}
		gameDate := time.Now()
		if req.GameDate != "" {
			parsed, err := time.Parse(time.RFC3339, req.GameDate)
			if err == nil {
				gameDate = parsed
			}
		}
		err := db.InsertRanking(dbConn, req.BattleNetName, gameDate, req.Attempts, req.Difficulty)
		if err != nil {
			http.Error(w, "Error saving ranking", http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
	})
}


