
<template>
  <div class="about-container">
    <h1>{{ $t('aboutTitle') }}</h1>
    <p>{{ $t('aboutText') }}</p>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 600px;
  margin: 3rem auto;
  background: #232526;
  color: #fff;
  padding: 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px #000a;
  font-family: 'Montserrat', sans-serif;
}
h1 {
  color: #00ffe7;
  font-family: 'Orbitron', 'Montserrat', sans-serif;
  margin-bottom: 1.5rem;
}
</style>

<script lang="ts" setup>

import { useHead } from '#imports';
useHead({
  title: 'About - BattleNet Info',
  meta: [
    { name: 'description', content: 'About BattleNet Info, a modern web app for gamers.' },
    { property: 'og:title', content: 'About - BattleNet Info' },
    { property: 'og:description', content: 'About BattleNet Info, a modern web app for gamers.' },
    { property: 'og:image', content: '/bnet-logo.svg' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
});

</script>

<style>

</style>