<template>

  <div v-if="tasks.length > 0">
    <h2>Tasks</h2>
    <ul class="list-group">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ task.title }}
        <div>
          <router-link
            :to="{ name: 'EditTask', params: { id: task.id } }"
            class="btn btn-sm btn-primary mr-2"
          >Edit</router-link>
          <button @click="deleteTask(task.id)" class="btn btn-sm btn-danger">Delete</button>
        </div>
      </li>
    </ul>
  </div>
  <p v-else>No tasks found.</p>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const tasks = ref([]);
    const config  = {
           headers: {
            'id': '1',
            'NotAuth': '666',
            }
        }


    async function getTasks() {
      try {
        const response = await axios.get('/api/tasks', config);
        tasks.value = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    async function deleteTask(id) {
      if (confirm('Are you sure you want to delete this task?')) {
        try {
          await axios.delete(`/api/tasks/${id}`, config);
          getTasks(); // Refresh the list after deletion
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      }
    }

    onMounted(getTasks);

    return {
      tasks,
      deleteTask
    };
  }
};
</script>
