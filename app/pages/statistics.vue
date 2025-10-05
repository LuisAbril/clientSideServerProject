<template>
  <div class="stats-container">
    <h2>{{ $t('gameStats') }}</h2>
    <div class="game-section">
      <h3>{{ $t('guessNumber.title') }}</h3>
      <ul>
        <li><b>{{ $t('gamesPlayed') }}:</b> {{ guessStats.gamesPlayed }}</li>
        <li><b>{{ $t('guessNumber.attempts') }}:</b> {{ guessStats.totalAttempts }}</li>
        <li><b>{{ $t('bestGame') }}:</b> {{ guessStats.bestGame !== null ? guessStats.bestGame : '-' }}</li>
        <li><b>{{ $t('lastAttempts') }}:</b> {{ guessStats.lastAttempts }}</li>
        <li><b>{{ $t('guessNumber.difficulty') }}:</b> {{ guessStats.difficulty }}</li>
      </ul>
    </div>
    <!-- Add more game sections here in the future -->
  </div>
</template>

<script setup lang="ts">
import { useGuessNumberStore } from '~/stores/guessNumber';
const guessStore = useGuessNumberStore();
const guessStats = guessStore.stats;
</script>

<style scoped>
.stats-container {
  max-width: 500px;
  margin: 3rem auto;
  background: #232526;
  color: #fff;
  padding: 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px #000a;
  font-family: 'Montserrat', sans-serif;
}
.game-section {
  margin-bottom: 2rem;
}
h2, h3 {
  color: #00ffe7;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.7rem;
  font-size: 1.1rem;
}
</style>
