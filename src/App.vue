<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/" class="navbar-brand">Task Manager</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <template v-if="isAuthenticated">
            <router-link to="/create-task" class="nav-item nav-link">Create Task</router-link>
            <router-link to="/create-category" class="nav-item nav-link">Create Category</router-link>
            <router-link to="/users/new" class="nav-item nav-link">Add User</router-link>
            <router-link to="/logout" class="nav-item nav-link">Logout</router-link>
          </template>
          <template v-else>
            <router-link to="/register" class="nav-item nav-link">Register</router-link>
          </template>
        </div>
      </div>
    </nav>
    <main class="container mt-5">
      <router-view />
    </main>
  </div>
</template>

<script>
import { useAuthStore } from './stores/auth'
import { computed } from 'vue'

export default {
  name: 'App',
  setup() {
    const auth = useAuthStore()
    const isAuthenticated = computed(() => !!auth.token)

    return {
      isAuthenticated
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
