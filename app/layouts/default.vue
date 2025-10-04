<template>
  <div class="app-bg">
    <Header />
    <transition name="fade">
      <div v-if="showLoader" class="global-loader">
        <div class="spinner"></div>
        <span class="loader-text">Loading...</span>
      </div>
    </transition>
    <main class="main-bg" v-show="!showLoader">
      <slot />
    </main>
    <Footer />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import { useRouter } from 'vue-router';

const showLoader = ref(false);
const router = useRouter();

router.beforeEach((to, from, next) => {
  showLoader.value = true;
  next();
});
router.afterEach(() => {
  setTimeout(() => { showLoader.value = false; }, 400); // smooth fade
});

onMounted(() => {
  showLoader.value = false;
});
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
.global-loader {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  background: rgba(24,26,27,0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.spinner {
  border: 6px solid #232526;
  border-top: 6px solid #00ffe7;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin-bottom: 1.2rem;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loader-text {
  color: #00ffe7;
  font-size: 1.3rem;
  font-family: 'Orbitron', 'Montserrat', sans-serif;
  letter-spacing: 1.2px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
