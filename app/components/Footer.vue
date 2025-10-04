<template>
  <footer class="gamer-footer">
    <div>© 2025 BattleNet Info | Powered by Nuxt</div>
    <div class="links">
      <a href="https://github.com/LuisAbril/" target="_blank">GitHub</a>
      <a href="https://battle.net/" target="_blank">Battle.net</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No logic for now
</script>

<style scoped>
.gamer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #232526, #414345);
  color: #fff;
  padding: 1rem 2rem;
  font-family: 'Orbitron', 'Montserrat', sans-serif;
  font-size: 1rem;
  box-shadow: 0 -2px 8px #000a;
}
.links a {
  color: #00ffe7;
  margin-left: 1.5rem;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s;
}
.links a:hover {
  color: #fff;
  text-shadow: 0 0 6px #00ffe7;
}
</style>
