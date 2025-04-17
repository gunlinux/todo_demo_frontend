<template>
  <form @submit.prevent="createTask">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" class="form-control" id="title" v-model="newTask.title" required>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea class="form-control" id="description" rows="3" v-model="newTask.description"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const newTask = reactive({
      title: '',
      description: ''
    });
    const router = useRouter();
    const config  = {
           headers: {
            'id': '1',
            'NotAuth': '666',
            }
        }

    async function createTask() {
      try {
        await axios.post('/api/tasks', newTask, config);
        alert('Task created successfully!');
        router.push('/');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }

    return {
      newTask,
      createTask
    };
  }
};
</script>
