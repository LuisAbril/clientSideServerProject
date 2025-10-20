-- +goose Up
-- Migración para crear la tabla rankings
CREATE TABLE rankings (
    id SERIAL PRIMARY KEY,
    battlenet_name VARCHAR(255) NOT NULL,
    game_date TIMESTAMP NOT NULL DEFAULT NOW(),
    attempts INT NOT NULL,
    difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard'))
);

CREATE INDEX idx_rankings_difficulty ON rankings (difficulty);

-- +goose Down
-- Elimina la tabla rankings
DROP TABLE IF EXISTS rankings;
