<template>
  <header class="gamer-header">
    <div class="logo">BattleNet Info</div>
    <nav>
  <NuxtLink to="/" class="nav-btn">Home</NuxtLink>
  <NuxtLink to="/about" class="nav-btn">About Us</NuxtLink>
  <NuxtLink to="/contacts" class="nav-btn">Contact</NuxtLink>
  <button v-if="!userStore.loggedIn" class="gamer-btn" @click="loginWithBattleNet">
        <img src="/bnet-logo.svg" alt="Battle.net" class="bnet-logo" />
        Login with Battle.net
      </button>
      <button v-else class="gamer-btn" @click="logout">
        Logout
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useFetch } from '#app';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();

const fetchUser = async () => {
  const { data } = await useFetch('/api/auth/user', { key: 'header-user', watch: false, server: false, immediate: true, cache: 'no-cache', credentials: 'include' });
  userStore.setUser(data.value);
};
const loginWithBattleNet = () => {
  window.location.href = '/api/auth/login';
};
const logout = async () => {
  await fetch('/api/auth/logout', { credentials: 'include' });
  userStore.clearUser();
  window.location.href = '/logging-out';
};
const checkLoginCallback = () => {
  if (typeof window !== 'undefined' && window.location.search.includes('code=') && window.location.pathname === '/') {
    setTimeout(() => {
      fetchUser();
    }, 300);
  }
};
onMounted(() => {
  fetchUser();
  checkLoginCallback();
});
</script>

<style scoped>
  .gamer-btn {
    background: linear-gradient(120deg, #1a2980 0%, #00ffe7 100%);
    color: #fff;
    font-size: 0.95rem;
    font-family: 'Orbitron', 'Montserrat', sans-serif;
    border: 2px solid #00ffe7;
    border-radius: 14px;
    padding: 0.45rem 1.1rem;
    cursor: pointer;
    box-shadow: 0 2px 10px #00ffe799, 0 1px 4px #000a;
    text-decoration: none;
    font-weight: bold;
    letter-spacing: 1.1px;
    transition: background 0.18s, color 0.18s, transform 0.12s, box-shadow 0.18s;
    text-align: center;
    position: relative;
    overflow: hidden;
    margin-left: 2rem;
    outline: none;
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
  }
  .gamer-btn:active {
    transform: scale(0.97);
  }
  .gamer-btn:hover {
    background: linear-gradient(120deg, #00ffe7 0%, #1a2980 100%);
    color: #181a1b;
    box-shadow: 0 8px 28px #00ffe7cc, 0 2px 12px #000a;
    border-color: #fff;
  }
  .bnet-logo {
    width: 32px;
    height: 32px;
  }
.gamer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #0f2027, #2c5364, #1a2980);
  color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px #000a;
  font-family: 'Orbitron', 'Montserrat', sans-serif;
}
.logo {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #00ffe7;
  text-shadow: 0 0 8px #00ffe7, 0 0 2px #fff;
}
  .nav-btn {
    background: linear-gradient(120deg, #232526 0%, #1a2980 100%);
    color: #fff;
    border: 2px solid #00ffe7;
    border-radius: 12px;
    padding: 0.45rem 1.2rem;
    margin-left: 1.2rem;
    font-size: 1.05rem;
    font-family: 'Orbitron', 'Montserrat', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    box-shadow: 0 2px 8px #00ffe733;
    transition: background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s;
    display: inline-block;
    outline: none;
    cursor: pointer;
  }
  .nav-btn:hover {
    background: linear-gradient(120deg, #00ffe7 0%, #1a2980 100%);
    color: #181a1b;
    border-color: #fff;
    box-shadow: 0 4px 16px #00ffe7cc;
    text-shadow: 0 0 6px #00ffe7;
  }
</style>
