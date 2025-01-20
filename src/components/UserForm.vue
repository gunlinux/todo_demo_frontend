<template>
  <form @submit.prevent="addUser">
    <div class="form-group">
      <label for="username">Name</label>
      <input type="text" class="form-control" id="name" v-model="newUser.username" required>
    </div>
    <button type="submit" class="btn btn-primary">Add User</button>
  </form>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const newUser = reactive({
      username: '',
    });
    const router = useRouter();

    async function addUser() {
      try {
        await axios.post('/api/user/', newUser);
        alert('User added successfully!');
        router.push('/');
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }

    return {
      newUser,
      addUser
    };
  }
};
</script>
