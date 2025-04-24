<template>
  <form @submit.prevent="createCategory">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" class="form-control" id="title" v-model="newCategory.title" required>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const newCategory = reactive({
      title: ''
    });
    const router = useRouter();
    const authStore = useAuthStore();

    const config = {
      headers: {
        'token': authStore.token,
        'id': authStore.userId,
      }
    };

    async function createCategory() {
      try {
        await axios.post('/api/categories/', newCategory, config);
        alert('Category created successfully!');
        router.push('/');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }

    return {
      newCategory,
      createCategory
    };
  }
};
</script>
