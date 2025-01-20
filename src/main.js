import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импортируем роутер

const app = createApp(App);

// Регистрация роутера в приложении
app.use(router);

// Монтирование приложения
app.mount('#app');
