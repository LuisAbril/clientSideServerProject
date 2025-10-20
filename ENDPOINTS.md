# Endpoints públicos para obtener el ranking

GET /health
- Comprueba si el backend está funcionando.
- Respuesta: "API is running"

GET /rankings/easy
- Devuelve el ranking de jugadores en dificultad fácil.
- Respuesta: Array JSON de partidas con campos: id, BattleNetName, GameDate, Attempts, Difficulty

GET /rankings/medium
- Devuelve el ranking de jugadores en dificultad media.
- Respuesta: Array JSON de partidas con campos: id, BattleNetName, GameDate, Attempts, Difficulty

GET /rankings/hard
- Devuelve el ranking de jugadores en dificultad difícil.
- Respuesta: Array JSON de partidas con campos: id, BattleNetName, GameDate, Attempts, Difficulty



http://localhost:8080/rankings/medium

con este enlaze (y el resto tmb funciona), recibo lo siguiente:
[
  {
    "id": 7,
    "BattleNetName": "Player13",
    "GameDate": "2025-10-20T12:11:54.25205Z",
    "Attempts": 2,
    "Difficulty": "medium"
  },
  {
    "id": 2,
    "BattleNetName": "Player2",
    "GameDate": "2025-10-20T11:09:44.815482Z",
    "Attempts": 5,
    "Difficulty": "medium"
  },
  {
    "id": 13,
    "BattleNetName": "Carlos#2004",
    "GameDate": "2025-10-20T12:13:19.094149Z",
    "Attempts": 5,
    "Difficulty": "medium"
  },
  {
    "id": 6,
    "BattleNetName": "Player12",
    "GameDate": "2025-10-20T12:11:54.25205Z",
    "Attempts": 6,
    "Difficulty": "medium"
  }
]
