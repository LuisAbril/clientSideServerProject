<template>
  <div class="minigames-container">
    <h1>Minigames</h1>
    <ul>
      <li><NuxtLink to="/minigames/guess-the-number">Guess the Number</NuxtLink></li>
      <li><NuxtLink to="/minigames/tic-tac-toe">Tic Tac Toe</NuxtLink></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// No logic needed for the index page
</script>

<style scoped>
.minigames-container {
  max-width: 600px;
  margin: 3rem auto;
  background: #232526;
  color: #fff;
  padding: 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px #000a;
  font-family: 'Montserrat', sans-serif;
}
ul {
  margin-top: 2rem;
}
li {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}
</style>
