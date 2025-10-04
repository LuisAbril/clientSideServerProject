<template>
  <div class="login-container">
    <div v-if="pending">Loading...</div>
    <div v-else-if="userStore.loggedIn">
      <div class="container user-container">
        <h2>Welcome, {{ userStore.user?.user?.battletag || userStore.user?.user?.sub }}</h2>
      </div>
      <div class="main-flex-containers">
        <div class="container stats-container styled-container">
          <h3>Statistics</h3>
          <div v-if="gamesPending">Loading your games...</div>
          <template v-else>
            <div v-if="games && (games.games?.length || games.wow || games.diablo)">
              <h4>Your Blizzard Games:</h4>
              <ul v-if="games.games && games.games.length">
                <li v-for="game in games.games" :key="game">{{ game }}</li>
              </ul>
              <div v-if="games.wow">
                <h5>World of Warcraft Characters:</h5>
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
              <div v-if="games.diablo">
                <h5>Diablo Progress:</h5>
                <pre>{{ games.diablo }}</pre>
              </div>
            </div>
            <div v-else class="empty-container">No Blizzard games found for this account.</div>
          </template>
        </div>
        <div class="container minigames-container styled-container">
          <h3>Minigames</h3>
          <div class="minigames-buttons">
            <NuxtLink to="/minigames/guess-the-number" class="gamer-btn">Guess the Number</NuxtLink>
            <NuxtLink to="/minigames/tic-tac-toe" class="gamer-btn">Tic Tac Toe</NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <!-- Si no está logueado, no mostrar nada -->
    <div v-else>
      <div class="container user-container styled-container welcome-container">
        <h2>Welcome to BattleNet Info!</h2>
        <p class="welcome-text">Log in with your Battle.net account to view your game stats and play awesome minigames.<br>
        <span class="welcome-highlight">Level up your experience!</span></p>
        <div class="welcome-icons">
          <span class="icon">🎮</span>
          <span class="icon">✨</span>
          <span class="icon">🔥</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, watch } from 'vue';
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
  // Siempre recargar usuario al montar la página principal
  await fetchUser();
  pending.value = false;
  if (userStore.loggedIn) {
    await fetchGames();
  }
});

// Watch for login state changes to refresh user/games info automatically
watchEffect(async () => {
  if (userStore.loggedIn && !games.value) {
    await fetchGames();
  }
  if (!userStore.loggedIn && games.value) {
    games.value = null;
  }
});

// Watch for login state changes to refresh user info (in case cookie changes externally)
watch(
  () => userStore.loggedIn,
  async (loggedIn) => {
    if (loggedIn) {
      await fetchUser();
      await fetchGames();
    } else {
      await fetchUser();
      games.value = null;
    }
  }
);
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  margin-top: 3rem;
}
.welcome-text {
  color: #e0f7fa;
  font-size: 1.25rem;
  margin: 1.2rem 0 0.5rem 0;
  text-align: center;
}
.welcome-highlight {
  color: #a259ff;
  font-weight: bold;
  font-size: 1.1rem;
}
.welcome-icons {
  margin-top: 1.2rem;
  font-size: 2.2rem;
  display: flex;
  gap: 1.2rem;
  justify-content: center;
}
.icon {
  filter: drop-shadow(0 0 8px #a259ff88);
}
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
  border-radius: 18px;
  box-shadow: 0 2px 16px #000a;
  padding: 2rem 2.5rem;
  margin: 2rem auto;
  max-width: 600px;
  color: #e0f7fa;
  font-family: 'Montserrat', sans-serif;
}
.styled-container {
  background: linear-gradient(120deg, #181a1b 0%, #232526 100%);
  border: 2.5px solid #00ffe7;
  box-shadow: none;
  transition: box-shadow 0.22s, border-color 0.22s;
}
.styled-container:hover {
  border-color: #a259ff;
  box-shadow: 0 0 24px 0 #a259ffcc, 0 2px 12px #000a;
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
.main-flex-containers {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem;
  margin-top: 2.5rem;
}
.stats-container, .minigames-container {
  min-width: 320px;
  max-width: 400px;
  flex: 1 1 0;
  margin: 0 0.5rem;
}
</style>

