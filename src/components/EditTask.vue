<template>
  <form @submit.prevent="updateTask">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" class="form-control" id="title" v-model="currentTask.title" required>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea class="form-control" id="description" rows="3" v-model="currentTask.description"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Update</button>
  </form>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const currentTask = reactive({});
    const authStore = useAuthStore();

    const config = {
      headers: {
        'token': authStore.token,
        'id': authStore.userId,
      }
    };


    async function getTaskById(id) {
      try {
        const response = await axios.get(`/api/tasks/${id}`, config);
        Object.assign(currentTask, response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    }

    async function updateTask() {
      try {
        await axios.patch(`/api/tasks/${route.params.id}`, currentTask, config);
        alert('Task updated successfully!');
        router.push('/');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }

    onMounted(() => {
      getTaskById(route.params.id);
    });

    return {
      currentTask,
      updateTask
    };
  }
};
</script>
