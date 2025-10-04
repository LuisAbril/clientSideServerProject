<template>
  <div class="minigame-container">
    <h2>Guess the Number</h2>
    <div v-if="!won">
      <p>Guess a number between 1 and 100:</p>
      <input v-model.number="guess" type="number" min="1" max="100" @keyup.enter="checkGuess" />
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
import { ref } from 'vue';
import { useMouse } from '@vueuse/core';
const number = ref(Math.floor(Math.random() * 100) + 1);
const guess = ref(0);
const feedback = ref('');
const won = ref(false);
const attempts = ref(0);
const history = ref<{ guess: number, result: string }[]>([]);
const { x, y } = useMouse();

function checkGuess() {
  if (won.value) return;
  if (guess.value < 1 || guess.value > 100) {
    feedback.value = 'Please enter a number between 1 and 100.';
    return;
  }
  attempts.value++;
  if (guess.value === number.value) {
    feedback.value = '';
    won.value = true;
    history.value.push({ guess: guess.value, result: 'Correct!' });
  } else if (guess.value < number.value) {
    feedback.value = 'Too low!';
    history.value.push({ guess: guess.value, result: 'Too low' });
  } else {
    feedback.value = 'Too high!';
    history.value.push({ guess: guess.value, result: 'Too high' });
  }
}
function resetGame() {
  number.value = Math.floor(Math.random() * 100) + 1;
  guess.value = 0;
  feedback.value = '';
  won.value = false;
  attempts.value = 0;
  history.value = [];
}
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
</style>
