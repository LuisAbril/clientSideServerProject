<template>
  <div class="minigame-container">
    <h2>{{ $t('ticTacToe.title') }}</h2>
    <div class="board">
      <div v-for="(cell, idx) in board" :key="idx" class="cell" @click="makeMove(idx)">
        {{ cell }}
      </div>
    </div>
    <div v-if="winner">
      <p>{{ winner }} {{ $t('ticTacToe.win') }}</p>
      <button @click="resetGame">{{ $t('ticTacToe.playAgain') }}</button>
    </div>
    <div v-else-if="isDraw">
      <p>{{ $t('ticTacToe.draw') }}</p>
      <button @click="resetGame">{{ $t('ticTacToe.playAgain') }}</button>
    </div>
    <div v-else>
      <p>{{ $t('ticTacToe.currentPlayer') }}: {{ currentPlayer }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';
useHead({
  title: 'Tic Tac Toe - BattleNet Info',
  meta: [
    { name: 'description', content: 'Play Tic Tac Toe minigame on BattleNet Info.' },
    { property: 'og:title', content: 'Tic Tac Toe - BattleNet Info' },
    { property: 'og:description', content: 'Play Tic Tac Toe minigame on BattleNet Info.' },
    { property: 'og:image', content: '/bnet-logo.svg' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
});
import { ref, computed } from 'vue';
import { useTicTacToeStore } from '~/stores/ticTacToe';
const tttStore = useTicTacToeStore();
const board = ref<string[]>(Array(9).fill(''));
const currentPlayer = ref('X');
const winner = ref('');

tttStore.loadStats();

function makeMove(idx: number) {
  if (board.value[idx] || winner.value) return;
  board.value[idx] = currentPlayer.value;
  if (checkWinner()) {
    winner.value = currentPlayer.value;
    tttStore.recordGame(currentPlayer.value);
  } else if (board.value.every(cell => cell)) {
    winner.value = '';
    tttStore.recordGame('draw');
  } else {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
  }
}
function checkWinner() {
  const lines: [number, number, number][] = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return lines.some(([a, b, c]: [number, number, number]) =>
    board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]
  );
}
const isDraw = computed(() => !winner.value && board.value.every(cell => cell));
function resetGame() {
  board.value = Array(9).fill('');
  currentPlayer.value = 'X';
  winner.value = '';
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
.board {
  display: grid;
  grid-template-columns: repeat(3, 60px);
  grid-gap: 8px;
  margin: 2rem auto;
  justify-content: center;
}
.cell {
  width: 60px;
  height: 60px;
  background: #1a2980;
  color: #00ffe7;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.cell:hover {
  background: #00ffe7;
  color: #1a2980;
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
