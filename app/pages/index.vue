<template>
  <div class="login-container">
    <div v-if="pending">Loading...</div>
    <div v-else-if="userStore.loggedIn">
      <div class="container user-container">
        <h2>Welcome, {{ userStore.user?.user?.battletag || userStore.user?.user?.sub }}</h2>
        <pre class="userinfo">{{ userStore.user?.user }}</pre>
      </div>
      <div v-if="gamesPending" class="container loading-container">Loading your games...</div>
      <div v-else>
        <div v-if="games && games.games && games.games.length">
          <div class="container games-container">
            <h3>Your Blizzard Games:</h3>
            <ul>
              <li v-for="game in games.games" :key="game">{{ game }}</li>
            </ul>
          </div>
        </div>
        <div v-if="games && games.wow">
          <div class="container wow-container">
            <h4>World of Warcraft Characters:</h4>
            <ul>
              <li v-for="(account, idx) in games.wow" :key="idx">
                <ul>
                  <li v-for="char in account.characters" :key="char.name">
                    <span class="char-name">{{ char.name }}</span>
                    <span class="char-detail">({{ char.level }} {{ char.playable_class?.name?.en_US }})</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="games && games.diablo">
          <div class="container diablo-container">
            <h4>Diablo Progress:</h4>
            <pre>{{ games.diablo }}</pre>
          </div>
        </div>
        <div v-if="games && !games.games?.length && !games.wow && !games.diablo" class="container empty-container">
          No Blizzard games found for this account.
        </div>
      </div>
      <div class="minigames-buttons">
        <NuxtLink to="/minigames/guess-the-number" class="gamer-btn">Guess the Number</NuxtLink>
        <NuxtLink to="/minigames/tic-tac-toe" class="gamer-btn">Tic Tac Toe</NuxtLink>
      </div>
    </div>
    <div v-else>
      <div class="minigames-buttons">
        <NuxtLink to="/minigames/guess-the-number" class="gamer-btn">Guess the Number</NuxtLink>
        <NuxtLink to="/minigames/tic-tac-toe" class="gamer-btn">Tic Tac Toe</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from '#app';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const pending = ref(true);
const games = ref(null);
const gamesPending = ref(false);

const fetchUser = async () => {
    const { data } = await useFetch('/api/auth/user', { key: 'user', watch: false, server: false, immediate: true, cache: 'no-cache', credentials: 'include' });
    userStore.setUser(data.value);
};

const fetchGames = async () => {
    gamesPending.value = true;
    const { data } = await useFetch('/api/auth/games');
    games.value = data.value;
    gamesPending.value = false;
};

const logout = async () => {
    await fetch('/api/auth/logout', { credentials: 'include' });
    userStore.clearUser();
    games.value = null;
    window.location.href = '/';
};

onMounted(async () => {
    await fetchUser();
    pending.value = false;
    if (userStore.loggedIn) {
        await fetchGames();
    }

    // Si venimos de un login (callback), forzar recarga de usuario
    if (window.location.search.includes('code=') && window.location.pathname === '/') {
        // Esperar a que cookies estén listas y recargar usuario
        setTimeout(async () => {
            await fetchUser();
            if (userStore.loggedIn) {
                await fetchGames();
            }
        }, 300);
    }
});
</script>

<style scoped>
.gamer-btn {
    background: linear-gradient(120deg, #1a2980 0%, #00ffe7 100%);
    color: #fff;
    font-size: 1.5rem;
    font-family: 'Orbitron', 'Montserrat', sans-serif;
    border: 2.5px solid #00ffe7;
    border-radius: 16px;
    padding: 1.2rem 3.2rem;
    cursor: pointer;
    box-shadow: 0 4px 18px #00ffe799, 0 1.5px 8px #000a;
    text-decoration: none;
    font-weight: bold;
    letter-spacing: 1.2px;
    transition: background 0.18s, color 0.18s, transform 0.12s, box-shadow 0.18s;
    text-align: center;
    position: relative;
    overflow: hidden;
    margin: 0;
    outline: none;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 2.5rem;
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
    width: 48px;
    height: 48px;
}
.container {
    background: #232526;
    border-radius: 18px;
    box-shadow: 0 2px 16px #000a;
    padding: 2rem 2.5rem;
    margin: 2rem auto;
    max-width: 600px;
    color: #e0f7fa;
    font-family: 'Montserrat', sans-serif;
}
.user-container {
    background: linear-gradient(90deg, #232526, #1a2980);
    color: #00ffe7;
    text-align: center;
}
.games-container {
    border-left: 6px solid #00ffe7;
}
.wow-container {
    border-left: 6px solid #ffb300;
}
.diablo-container {
    border-left: 6px solid #c60b1e;
}
.empty-container {
    background: #232526;
    color: #ffb300;
    text-align: center;
}
.loading-container {
    background: #232526;
    color: #fff;
    text-align: center;
}
.userinfo {
    background: #181a1b;
    color: #00ffe7;
    padding: 1rem;
    border-radius: 10px;
    margin: 1rem 0;
    font-size: 1.1rem;
    max-width: 500px;
    word-break: break-all;
    text-align: left;
}
.char-name {
    color: #00ffe7;
    font-weight: bold;
}
.char-detail {
    color: #fff;
    margin-left: 0.5rem;
}
.highlight {
    color: #ffb300;
    font-weight: bold;
}
.minigames-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.5rem;
    gap: 1.5rem;
}
</style>

