<template>
  <div class="minigame-container">
    <h2>Guess the Number</h2>
    <div class="difficulty-select">
      <label>Difficulty:</label>
      <select v-model="difficulty" @change="setDifficulty(difficulty)">
        <option value="easy">Easy (1-50)</option>
        <option value="normal">Normal (1-100)</option>
        <option value="hard">Hard (1-200)</option>
      </select>
    </div>
    <div v-if="!won">
      <p>Guess a number between {{ getRange().min }} and {{ getRange().max }}:</p>
      <input v-model.number="guess" type="number" :min="getRange().min" :max="getRange().max" @keyup.enter="checkGuess" />
      <button @click="checkGuess">Guess</button>
      <p v-if="feedback">{{ feedback }}</p>
      <div v-if="history.length">
        <h4>Attempts History</h4>
        <ul>
          <li v-for="(item, idx) in history" :key="idx">
            Attempt {{ idx + 1 }}: {{ item.guess }} - {{ item.result }}
          </li>
        </ul>
      </div>
      <p>Total attempts: {{ attempts }}</p>
    </div>
    <div v-else>
      <p>🎉 Congratulations! You guessed the number <b>{{ number }}</b> in {{ attempts }} attempts!</p>
      <div>
        <h4>Attempts History</h4>
        <ul>
          <li v-for="(item, idx) in history" :key="idx">
            Attempt {{ idx + 1 }}: {{ item.guess }} - {{ item.result }}
          </li>
        </ul>
      </div>
      <button @click="resetGame">Play Again</button>
    </div>
    <div class="mouse-info">
      <small>Mouse position: X: {{ x }}, Y: {{ y }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMouse } from '@vueuse/core';
import { useGuessNumberStore } from '~/stores/guessNumber';

const store = useGuessNumberStore();
const difficulties = [
  { label: 'Easy (1-50)', value: 'easy', min: 1, max: 50 },
  { label: 'Normal (1-100)', value: 'normal', min: 1, max: 100 },
  { label: 'Hard (1-200)', value: 'hard', min: 1, max: 200 }
];
const difficulty = ref(store.stats.difficulty || 'normal');
function getRange() {
  const d = difficulties.find(d => d.value === difficulty.value) || difficulties[1];
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
</style>
