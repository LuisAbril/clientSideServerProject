<template>
  <div>
    <h1 class="ranking-title">{{ $t('Ranking Guess the Number') }}</h1>

    <section class="ranking-section gamer-bg">
      <h2 class="ranking-difficulty gamer-gradient gamer-border gamer-shadow">{{ $t('Fácil') }}</h2>
      <table v-if="rankings.easy.length" class="ranking-table gamer-table">
        <thead>
          <tr>
            <th>{{ $t('Battle.net') }}</th>
            <th>{{ $t('Fecha') }}</th>
            <th>{{ $t('Intentos') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rankings.easy" :key="r.id">
            <td>{{ r.BattleNetName }}</td>
            <td>{{ formatDate(r.GameDate) }}</td>
            <td>{{ r.Attempts }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="ranking-empty gamer-text">
        {{ $t('No hay datos para esta dificultad') }}
      </div>
    </section>

    <section class="ranking-section gamer-bg">
      <h2 class="ranking-difficulty gamer-gradient gamer-border gamer-shadow">{{ $t('Media') }}</h2>
      <table v-if="rankings.medium.length" class="ranking-table gamer-table">
        <thead>
          <tr>
            <th>{{ $t('Battle.net') }}</th>
            <th>{{ $t('Fecha') }}</th>
            <th>{{ $t('Intentos') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rankings.medium" :key="r.id">
            <td>{{ r.BattleNetName }}</td>
            <td>{{ formatDate(r.GameDate) }}</td>
            <td>{{ r.Attempts }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="ranking-empty gamer-text">
        {{ $t('No hay datos para esta dificultad') }}
      </div>
    </section>

    <section class="ranking-section gamer-bg">
      <h2 class="ranking-difficulty gamer-gradient gamer-border gamer-shadow">{{ $t('Difícil') }}</h2>
      <table v-if="rankings.hard.length" class="ranking-table gamer-table">
        <thead>
          <tr>
            <th>{{ $t('Battle.net') }}</th>
            <th>{{ $t('Fecha') }}</th>
            <th>{{ $t('Intentos') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rankings.hard" :key="r.id">
            <td>{{ r.BattleNetName }}</td>
            <td>{{ formatDate(r.GameDate) }}</td>
            <td>{{ r.Attempts }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="ranking-empty gamer-text">
        {{ $t('No hay datos para esta dificultad') }}
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const BACKEND_URL = 'http://localhost:8081'

const rankings = ref({
  easy: [],
  medium: [],
  hard: []
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return isNaN(date) ? dateStr : date.toLocaleString()
}

onMounted(() => {
  fetch(`${BACKEND_URL}/rankings/easy`)
    .then(res => res.json())
    .then(data => {
      rankings.value.easy = Array.isArray(data) ? data : []
    })
    .catch(() => {
      rankings.value.easy = []
    })

  fetch(`${BACKEND_URL}/rankings/medium`)
    .then(res => res.json())
    .then(data => {
      rankings.value.medium = Array.isArray(data) ? data : []
    })
    .catch(() => {
      rankings.value.medium = []
    })

  fetch(`${BACKEND_URL}/rankings/hard`)
    .then(res => res.json())
    .then(data => {
      rankings.value.hard = Array.isArray(data) ? data : []
    })
    .catch(() => {
      rankings.value.hard = []
    })
})
</script>

<style scoped>
.ranking-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-family: 'Orbitron', 'Montserrat', sans-serif;
  font-weight: bold;
  color: #00ffe7;
  text-shadow: 0 0 10px #00ffe7, 0 0 20px #2c3e50;
  letter-spacing: 2px;
}

.ranking-section {
  margin-bottom: 2rem;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.18);
}

.gamer-bg {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
}

.gamer-gradient {
  background: linear-gradient(90deg, #00ffe7 0%, #0072ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Orbitron', 'Montserrat', sans-serif;
}

.gamer-border {
  border-bottom: 2px solid #00ffe7;
  padding-bottom: 0.5rem;
}

.gamer-shadow {
  text-shadow: 0 0 8px #00ffe7, 0 0 4px #0072ff;
}

.ranking-difficulty {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: left;
  font-weight: bold;
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
  background: #181a1b;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.18);
  border-radius: 8px;
  overflow: hidden;
}

.ranking-table th,
.ranking-table td {
  border: 1px solid #00ffe7;
  padding: 0.7rem 1.2rem;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: #fff;
}

.ranking-table th {
  background: #0072ff;
  color: #00ffe7;
  font-weight: 700;
  letter-spacing: 1px;
}

.ranking-table tr:nth-child(even) {
  background: #232526;
}

.ranking-table tr:nth-child(odd) {
  background: #181a1b;
}

.ranking-empty {
  color: #00ffe7;
  font-style: italic;
  padding: 1rem 0;
  text-align: center;
}

.gamer-text {
  font-family: 'Orbitron', 'Montserrat', sans-serif;
  text-shadow: 0 0 6px #00ffe7;
}
</style>