<template>
  <div class="minigame-container">
    <h2>{{ $t('guessNumber.title') }}</h2>
    <div class="difficulty-select">
      <label>{{ $t('guessNumber.difficulty') }}</label>
      <select v-model="difficulty" :class="selectColorClass" @change="setDifficulty(difficulty)">
        <option value="easy">{{ $t('guessNumber.easy') }}</option>
        <option value="normal">{{ $t('guessNumber.normal') }}</option>
        <option value="hard">{{ $t('guessNumber.hard') }}</option>
      </select>
    </div>
    <div v-if="!won">
      <p>{{ $t('guessNumber.guessPrompt', { min: getRange().min, max: getRange().max }) }}</p>
      <input v-model.number="guess" type="number" :min="getRange().min" :max="getRange().max" @keyup.enter="checkGuess" />
      <button @click="checkGuess">{{ $t('guessNumber.guessBtn') }}</button>
      <p v-if="feedback">{{ feedback }}</p>
      <div v-if="history.length">
        <h4>{{ $t('guessNumber.history') }}</h4>
        <ul>
          <li v-for="(item, idx) in history" :key="idx">
            {{ $t('attempt') }} {{ idx + 1 }}: {{ item.guess }} - {{ item.result }}
          </li>
        </ul>
      </div>
      <p>{{ $t('guessNumber.attempts', { attempts }) }}</p>
    </div>
    <div v-else>
      <p>🎉 {{ $t('guessNumber.congrats', { number, attempts }) }}</p>
      <div>
        <h4>{{ $t('guessNumber.history') }}</h4>
        <ul>
          <li v-for="(item, idx) in history" :key="idx">
            {{ $t('attempt') }} {{ idx + 1 }}: {{ item.guess }} - {{ item.result }}
          </li>
        </ul>
      </div>
      <!-- Botón para guardar la partida en el ranking -->
      <button @click="saveGameToRanking">{{ $t('Guardar partida en ranking') }}</button>
      <button @click="resetGame">{{ $t('guessNumber.playAgain') }}</button>
    </div>
    <div class="mouse-info">
      <small>Mouse position: X: {{ x }}, Y: {{ y }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';
useHead({
  title: 'Guess the Number - BattleNet Info',
  meta: [
    { name: 'description', content: 'Play Guess the Number minigame on BattleNet Info.' },
    { property: 'og:title', content: 'Guess the Number - BattleNet Info' },
    { property: 'og:description', content: 'Play Guess the Number minigame on BattleNet Info.' },
    { property: 'og:image', content: '/bnet-logo.svg' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
});
import { ref, computed, watch } from 'vue';
import { useMouse } from '@vueuse/core';
import { useGuessNumberStore } from '~/stores/guessNumber';
const store = useGuessNumberStore();

const BACKEND_URL = 'http://localhost:8081'

// Simula el nombre del usuario Battle.net (ajusta según tu lógica real)
const battlenetName = ref('PlayerBattleNet#1234')

const difficulties = [
  { label: 'Easy (1-50)', value: 'easy', min: 1, max: 50 },
  { label: 'Normal (1-100)', value: 'normal', min: 1, max: 100 },
  { label: 'Hard (1-200)', value: 'hard', min: 1, max: 200 }
];
const difficulty = ref(store.stats.difficulty || 'normal');
function getRange() {
  const d = difficulties.find(d => d.value === difficulty.value) || difficulties[1];
  if (!d) return { min: 1, max: 100 };
  return { min: d.min, max: d.max };
}
const number = ref(Math.floor(Math.random() * (getRange().max - getRange().min + 1)) + getRange().min);
const guess = ref(0);
const feedback = ref('');
const won = ref(false);
const attempts = ref(0);
const history = ref<{ guess: number, result: string }[]>([]);
const { x, y } = useMouse();

function playSound(type: 'correct' | 'wrong') {
  const audio = new Audio(`/sounds/${type}.mp3`);
  audio.play();
}

function setDifficulty(level: string) {
  difficulty.value = level;
  store.setDifficulty(level);
  resetGame();
}

function saveGameToRanking() {
  fetch(`${BACKEND_URL}/rankings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      BattleNetName: battlenetName.value,
      GameDate: new Date().toISOString(),
      Attempts: attempts.value,
      Difficulty: difficulty.value === 'normal' ? 'medium' : difficulty.value // adapta 'normal' a 'medium'
    })
  })
}

function checkGuess() {
  if (won.value) return;
  const { min, max } = getRange();
  if (guess.value < min || guess.value > max) {
    feedback.value = `Please enter a number between ${min} and ${max}.`;
    return;
  }
  attempts.value++;
  if (guess.value === number.value) {
    feedback.value = '';
    won.value = true;
    history.value.push({ guess: guess.value, result: 'Correct!' });
    playSound('correct');
    store.setHighScore(attempts.value);
    store.recordGame(attempts.value);
    // Guardar automáticamente la partida en el ranking al ganar
    saveGameToRanking();
  } else if (guess.value < number.value) {
    feedback.value = 'Too low!';
    history.value.push({ guess: guess.value, result: 'Too low' });
    playSound('wrong');
  } else {
    feedback.value = 'Too high!';
    history.value.push({ guess: guess.value, result: 'Too high' });
    playSound('wrong');
  }
}
function resetGame() {
  const { min, max } = getRange();
  number.value = Math.floor(Math.random() * (max - min + 1)) + min;
  guess.value = 0;
  feedback.value = '';
  won.value = false;
  attempts.value = 0;
  history.value = [];
}

watch(difficulty, (newVal) => {
  setDifficulty(newVal);
});

// Dynamic class for select color
const selectColorClass = computed(() => {
  if (difficulty.value === 'easy') return 'select-easy';
  if (difficulty.value === 'normal') return 'select-normal';
  if (difficulty.value === 'hard') return 'select-hard';
  return '';
});
</script>

<style scoped>
.minigame-container {
  max-width: 400px;
  margin: 3rem auto;
  background: #232526;
  color: #fff;
  padding: 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px #000a;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}
.mouse-info {
  margin-top: 2rem;
  color: #00ffe7;
  font-size: 0.95rem;
}
input {
  margin-right: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
}
button {
  background: #00ffe7;
  color: #232526;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s, color 0.2s;
}
button:hover {
  background: #1a2980;
  color: #fff;
}
.difficulty-select {
  margin-bottom: 1.5rem;
  color: #00ffe7;
  font-size: 1rem;
  text-align: left;
}
.difficulty-select select {
  background: #232526;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  margin-left: 0.5rem;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  border-width: 2px;
  border-style: solid;
}
.difficulty-select select:focus {
  box-shadow: 0 0 6px #00ffe788;
}
.difficulty-select option {
  background: #232526;
  color: #00ffe7;
}
.select-easy {
  color: #00ff7f !important;
  border-color: #00ff7f !important;
}
.select-normal {
  color: #ffe700 !important;
  border-color: #ffe700 !important;
}
.select-hard {
  color: #ff3c3c !important;
  border-color: #ff3c3c !important;
}
</style>
