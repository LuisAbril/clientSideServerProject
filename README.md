# How to start the project

## Project overview

This project includes a backend (Go), a frontend (Nuxt), and a PostgreSQL database for storing game rankings.  
Below you will find instructions to start each part, manage the database, and a class diagram for the backend structure.

---

## Class Diagram

The following diagram illustrates the main classes and relationships in the backend:

![Class Diagram](./ClassDiagram.pbg)

*The diagram shows the main entities and their interactions, such as the database connection, API routes, and ranking model.*

---

## Start the backend

```bash
# From the project root
go run cmd/main.go
```
The backend will start on the port configured in `.env` (default is `8081`).

## Start the frontend

```bash
# From the frontend folder (e.g. /app or /frontend)
npm install

npm run dev
```
The frontend will start on port `3000` by default.

---

# Database usage

## Reset PostgreSQL database (delete and recreate tables and data)

### 1. Drop the database (optional, deletes everything):
```bash
dropdb -h localhost -p 5432 -U postgres rankings
```

### 2. Create the database again:
```bash
createdb -h localhost -p 5432 -U postgres rankings
```

### 3. Run migrations to create tables:
If you see "command not found", first install goose:
```bash
go install github.com/pressly/goose/v3/cmd/goose@latest
export PATH=$PATH:$HOME/go/bin
```
Now run:
```bash
GOOSE_DRIVER=postgres GOOSE_DBSTRING="host=localhost port=5432 user=postgres password=m dbname=rankings sslmode=disable" goose -dir ./migrations up
```

### 4. (Optional) Add sample data to the rankings table:
```bash
psql -h localhost -p 5432 -U postgres -d rankings <<EOF
INSERT INTO rankings (battlenet_name, game_date, attempts, difficulty) VALUES
('Player1', NOW(), 3, 'easy'),
('Player2', NOW(), 5, 'easy'),
('Player3', NOW(), 2, 'medium'),
('Player4', NOW(), 6, 'medium'),
('Player5', NOW(), 4, 'hard'),
('Player6', NOW(), 7, 'hard');
EOF
```

### Alternatively, to only clear the rankings table:
```bash
psql -h localhost -p 5432 -U postgres -d rankings -c "TRUNCATE TABLE rankings RESTART IDENTITY;"
```

---

# Quick summary

- **Backend:** `go run cmd/main.go`
- **Frontend:** `npm run dev`
- **Database:** reset and migrate using the commands above
- **Sample data:** use the SQL insert block above

---