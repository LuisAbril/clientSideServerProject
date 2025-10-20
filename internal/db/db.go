package db

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	_ "github.com/lib/pq"
)

// Definición de la estructura Ranking
type Ranking struct {
	ID            int       `json:"id"`
	BattleNetName string    `json:"BattleNetName"`
	GameDate      time.Time `json:"GameDate"`
	Attempts      int       `json:"Attempts"`
	Difficulty    string    `json:"Difficulty"`
}

func Connect() (*sql.DB, error) {
	// Construye la cadena de conexión
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)
	// Conecta a la base de datos
	return sql.Open("postgres", dsn)
}

func GetRankingsByDifficulty(db *sql.DB, difficulty string) ([]Ranking, error) {
	// Consulta SQL
	rows, err := db.Query(`
		SELECT id, battlenet_name, game_date, attempts, difficulty
		FROM rankings
		WHERE difficulty = $1
		ORDER BY attempts ASC, game_date ASC
	`, difficulty)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var rankings []Ranking
	for rows.Next() {
		var r Ranking
		if err := rows.Scan(&r.ID, &r.BattleNetName, &r.GameDate, &r.Attempts, &r.Difficulty); err != nil {
			return nil, err
		}
		rankings = append(rankings, r)
	}
	return rankings, nil
}
