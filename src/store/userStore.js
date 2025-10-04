// src/store/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user)); // ← make sure this is set here
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
    initialize() {
      const saved = localStorage.getItem('user');
      if (saved) {
        try {
          this.user = JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse user");
          this.user = null;
          localStorage.removeItem('user');
        }
      }
    },
  },
});
