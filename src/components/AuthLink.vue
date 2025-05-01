<template>
  <div class="container mt-5">
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <div v-else class="alert alert-info">
      Authenticating...
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import axios from '@/axios';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const auth = useAuthStore();
    const error = ref('');

    onMounted(async () => {
      const { id, token } = route.query;
      
      if (!id || !token) {
        error.value = 'Invalid authentication link';
        return;
      }

      try {
        // First set the auth data so axios interceptor can use it
        auth.setAuth(token, id);

        // Check auth with backend using the default header method
        await axios.get('/user/check_auth');
        
        // If we got here, auth is successful
        router.push('/');
      } catch (err) {
        // If auth failed, clear the auth data and show error
        auth.logout();
        error.value = 'Authentication failed. Please try again.';
        console.error('Auth error:', err);
      }
    });

    return {
      error
    };
  }
};
</script> 