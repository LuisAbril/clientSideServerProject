
<template>
  <div class="app-bg">
    <Header />
    <main class="main-bg">
      <slot />
    </main>
    <Footer />
  </div>
</template>


<script setup lang="ts">
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
</script>

<style>
.app-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #181a1b 60%, #232526 100%, #1a2980 120%);
  width: 100vw;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  transition: background 0.5s;
}
.main-bg {
  min-height: 80vh;
  background: rgba(35,37,38,0.98);
  padding: 1.5rem 1.2rem 1.5rem 1.2rem;
  margin: 2.5rem auto 2.5rem auto;
  max-width: 600px;
  box-shadow: 0 4px 32px #00ffe733, 0 1.5px 8px #000a;
  border-radius: 22px;
  border: 1.5px solid #1a2980;
  transition: box-shadow 0.3s, border 0.3s;
}
.main-bg:hover {
  box-shadow: 0 8px 48px #00ffe799, 0 2px 12px #000a;
  border-color: #00ffe7;
}
</style>
