
<template>
  <div class="contacts-container">
    <h1>{{ $t('contactTitle') }}</h1>
    <p>Email: support@battlenetinfo.gg</p>
    <p>{{ $t('contactPhone') }}</p>
  </div>
</template>

<style scoped>
.contacts-container {
  max-width: 500px;
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
  title: 'Contact - BattleNet Info',
  meta: [
    { name: 'description', content: 'Contact BattleNet Info support.' },
    { property: 'og:title', content: 'Contact - BattleNet Info' },
    { property: 'og:description', content: 'Contact BattleNet Info support.' },
    { property: 'og:image', content: '/bnet-logo.svg' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
});

</script>

<style>

</style>