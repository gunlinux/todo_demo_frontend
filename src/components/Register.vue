<template>
  <div class="container mt-5">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Имя пользователя</label>
        <input v-model="username" id="username" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-success mt-3">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from '@/axios';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const auth = useAuthStore();
    const router = useRouter();

    async function register() {
      try {
        const response = await axios.post('/', { username: username.value });
        const { id, token } = response.data;
        auth.setAuth(token, id);
        router.push('/'); // на главную или куда угодно
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        alert('Ошибка при регистрации. Проверьте данные.');
      }
    }

    return { username, register };
  }
};
</script>
