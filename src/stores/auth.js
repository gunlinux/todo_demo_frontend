// src/stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || ''
  }),
  actions: {
    setAuth(token, userId) {
      this.token = token;
      this.userId = userId;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    },
    logout() {
      this.token = '';
      this.userId = '';
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }
});
