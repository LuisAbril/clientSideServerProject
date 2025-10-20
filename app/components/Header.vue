<template>
  <header class="gamer-header">
    <div class="logo">BattleNet Info</div>
    <nav class="nav-flex">
      <NuxtLink :to="$localePath('index')" class="nav-btn">{{ $t('home') }}</NuxtLink>
      <NuxtLink :to="$localePath('about')" class="nav-btn">{{ $t('about') }}</NuxtLink>
      <NuxtLink :to="$localePath('contacts')" class="nav-btn">{{ $t('contact') }}</NuxtLink>
      
      <NuxtLink
        to="/ranking"
        class="header-link"
        active-class="active"
      >
        Ranking
      </NuxtLink>

      <div class="nav-btn-group">
        <button v-if="!userStore.loggedIn" class="gamer-btn login-btn-small" @click="loginWithBattleNet">
          <img src="/bnet-logo.svg" alt="Battle.net" class="bnet-logo" loading="lazy" />
          {{ $t('loginBtn') }}
        </button>
        <button v-else class="gamer-btn" @click="logout">
          {{ $t('logout') }}
        </button>
        <button class="gamer-btn" @click="toggleLocale">
          <span v-if="locale === 'en'">ES</span>
          <span v-else>EN</span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import { useFetch } from '#app';
import { useUserStore } from '~/stores/user';
import { useI18n, useLocalePath } from '#imports';

const userStore = useUserStore();
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();

const fetchUser = async () => {
  const { data } = await useFetch('/api/auth/user', { key: 'header-user', watch: false, server: false, immediate: true, cache: 'no-cache', credentials: 'include' });
  userStore.setUser(data.value);
};
const loginWithBattleNet = () => {
  if (typeof window !== 'undefined') {
    const loader = document.createElement('div');
    loader.className = 'global-loader';
    loader.innerHTML = `<div class='spinner'></div><span class='loader-text'>Loading...</span>`;
    document.body.appendChild(loader);
    window.location.href = '/api/auth/login';
  }
};
const logout = async () => {
  if (typeof window !== 'undefined') {
    const loader = document.createElement('div');
    loader.className = 'global-loader';
    loader.innerHTML = `<div class='spinner'></div><span class='loader-text'>Loading...</span>`;
    document.body.appendChild(loader);
  }
  await fetch('/api/auth/logout', { credentials: 'include' });
  userStore.clearUser();
  window.location.href = '/';
};
const toggleLocale = () => {
  setLocale(locale.value === 'en' ? 'es' : 'en');
};
onMounted(() => {
  fetchUser();
});

// Watch for login state changes to refresh user info automatically
watchEffect(() => {
  if (!userStore.loggedIn) {
    fetchUser();
  }
});
</script>

<style scoped>
  .nav-flex {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    flex-wrap: wrap;
  }
  .nav-btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-left: 1.2rem;
  }
  .login-btn-small {
    font-size: 0.8rem;
    padding: 0.25rem 0.7rem;
    border-radius: 10px;
    min-width: unset;
    height: 2.1rem;
    gap: 0.4rem;
  }
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
    flex-wrap: wrap;
  }
  .logo {
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 2px;
    color: #00ffe7;
    text-shadow: 0 0 8px #00ffe7, 0 0 2px #fff;
    word-break: break-word;
  }
  @media (max-width: 700px) {
    .gamer-header {
      flex-direction: column;
      align-items: flex-start;
      padding: 0.7rem 0.5rem;
    }
    .logo {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }
    .nav-flex {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    .nav-btn, .gamer-btn {
      font-size: 0.95rem;
      padding: 0.35rem 0.7rem;
      margin-left: 0;
      margin-bottom: 0.3rem;
    }
    .bnet-logo {
      width: 24px;
      height: 24px;
    }
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
    color: #181a1a;
    border-color: #fff;
    box-shadow: 0 4px 16px #00ffe7cc;
    text-shadow: 0 0 6px #00ffe7;
  }
  .header-link {
    font-size: 1.05rem;
    padding: 0.45rem 1.2rem;
    min-width: 70px;
    border-radius: 12px;
    background: linear-gradient(120deg, #232526 0%, #1a2980 100%);
    color: #fff;
    border: 2px solid #00ffe7;
    font-family: 'Orbitron', 'Montserrat', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    box-shadow: 0 2px 8px #00ffe733;
    transition: background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s;
    display: inline-block;
    outline: none;
    cursor: pointer;
    margin-left: 1.2rem;
  }
  .header-link:hover {
    background: linear-gradient(120deg, #00ffe7 0%, #1a2980 100%);
    color: #181a1a;
    border-color: #fff;
    box-shadow: 0 4px 16px #00ffe7cc;
    text-shadow: 0 0 6px #00ffe7;
  }
</style>

