import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const loggedIn = ref(false);

  function setUser(u: any) {
    user.value = u;
    loggedIn.value = !!(u && u.loggedIn);
  }
  function clearUser() {
    user.value = null;
    loggedIn.value = false;
  }

  return { user, loggedIn, setUser, clearUser };
});
