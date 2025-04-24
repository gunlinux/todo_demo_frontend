<template>
  <form @submit.prevent="updateTask">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" class="form-control" id="title" v-model="currentTask.title" maxlength="30" required>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea class="form-control" id="description" rows="3" v-model="currentTask.description" maxlength="200"></textarea>
    </div>
    <div class="form-group">
      <label for="status">Status</label>
      <select class="form-control" id="status" v-model="currentTask.status" required>
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
    <div class="form-group">
      <label for="deadline">Deadline</label>
      <input type="datetime-local" class="form-control" id="deadline" v-model="currentTask.dead_line">
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

    function formatDateTime(inputStr) {
      let parts = inputStr.split("T");
      let datePart = parts[0];
      let timePart = parts[1].split(":");

      // добавляем секунды вручную, поскольку они отсутствуют в исходной строке
      let formattedTime = `${timePart[0]}:${timePart[1]}:00`;

      return `${datePart} ${formattedTime}`;
    }

    async function updateTask() {
      try {
        await axios.patch(
          `/api/tasks/${route.params.id}`,
          {
            title: currentTask.title,
            description: currentTask.description,
            status: currentTask.status,
            dead_line: formatDateTime(currentTask.dead_line)
          },
          config
        );
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