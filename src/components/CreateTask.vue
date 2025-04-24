<template>
  <form @submit.prevent="createTask">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" class="form-control" id="title" v-model="newTask.title" required />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea class="form-control" id="description" rows="3" v-model="newTask.description"></textarea>
    </div>

    <div class="form-group">
      <label for="category">Category</label>
      <select class="form-control" id="category" v-model="newTask.category_id" required>
        <option disabled value="">Выберите категорию</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.title }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="status">Status</label>
      <select class="form-control" id="status" v-model="newTask.status" required>
        <option value="new">New</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <div class="form-group">
      <label for="dead_line">Deadline</label>
      <input type="datetime-local" class="form-control" id="dead_line" v-model="rawDeadline" required />
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

      const categories = ref([]);

      onMounted(async () => {
        try {
          const response = await axios.get('/api/categories', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          categories.value = response.data;
        } catch (error) {
          console.error("Ошибка получения категорий:", error);
        }
      });

export default {
  setup() {
    const newTask = reactive({
      title: '',
      description: '',
      category_id: null,
      status: 'new',
      dead_line: ''
    });

    const rawDeadline = ref('');
    const categories = ref([]);
    const router = useRouter();

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };

    function formatDeadline(raw) {
      const date = new Date(raw);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const mi = String(date.getMinutes()).padStart(2, '0');
      const ss = '00';
      return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    }

    async function createTask() {
      try {
        newTask.dead_line = formatDeadline(rawDeadline.value);
        await axios.post('/api/tasks', newTask, config);
        alert('Задача создана успешно!');
        router.push('/');
      } catch (error) {
        console.error('Ошибка при создании задачи:', error);
      }
    }

    async function fetchCategories() {
      try {
        const response = await axios.get('/api/user/categories', config);
        categories.value = response.data;
      } catch (error) {
        console.error('Ошибка получения категорий:', error);
      }
    }

    onMounted(() => {
      fetchCategories();
    });

    return {
      newTask,
      rawDeadline,
      categories,
      createTask
    };
  }
};
</script>
