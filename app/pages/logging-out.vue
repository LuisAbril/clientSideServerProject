<template>
  <div class="redirecting-container">
    <h2>Logging out...</h2>
    <p>You will be redirected to the homepage in a moment.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  setTimeout(() => {
    window.location.href = '/';
  }, 1200);
});
</script>

<style scoped>
.redirecting-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #00ffe7;
  font-family: 'Orbitron', 'Montserrat', sans-serif;
  font-size: 1.5rem;
}
</style>
