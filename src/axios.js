// src/axios.js
import axios from 'axios';
import { useAuthStore } from './stores/auth';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use(config => {
  const auth = useAuthStore();
  if (auth.token && auth.userId) {
    config.headers['token'] = auth.token;
    config.headers['id'] = auth.userId;
  }
  return config;
});

export default api;
