<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const BACKEND_URL = 'http://localhost:8081'

// Variables del juego
const battlenetName = ref('Anonimous') // El nombre del usuario Battle.net se asigna manualmente o desde props
const attempts = ref(0)
const difficulty = ref('easy')
const isWinner = ref(false)

function saveGameToRanking() {
  fetch(`${BACKEND_URL}/rankings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      BattleNetName: battlenetName.value,
      GameDate: new Date().toISOString(),
      Attempts: attempts.value,
      Difficulty: difficulty.value
    })
  })
}

function onUserWin() {
  saveGameToRanking()
  // ...existing code para reiniciar el juego o mostrar ranking...
}

</script>

<style>

</style>