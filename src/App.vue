<template>
  <div id="app">
    <nav class="navbar">
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
            <router-link to="/create-task" class="nav-link">Create Task</router-link>
            <router-link to="/create-category" class="nav-link">Create Category</router-link>
            <router-link to="/users/new" class="nav-link">Add User</router-link>
            <router-link to="/logout" class="nav-link">Logout</router-link>
          </template>
          <template v-else>
            <router-link to="/register" class="nav-link">Register</router-link>
          </template>
        </div>
      </div>
    </nav>
    <main class="main-content">
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
:root {
  --primary-color: #6200ee;
  --primary-dark: #3700b3;
  --primary-light: #bb86fc;
  --secondary-color: #03dac6;
  --background: #f5f5f5;
  --surface: #ffffff;
  --error: #b00020;
  --text-primary: rgba(0, 0, 0, 0.87);
  --text-secondary: rgba(0, 0, 0, 0.6);
  --shadow-color: rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  background-color: var(--background);
  color: var(--text-primary);
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: var(--surface);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px var(--shadow-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 500;
  text-decoration: none;
  margin-right: 2rem;
}

.navbar-nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--primary-color);
  background-color: rgba(98, 0, 238, 0.04);
}

.nav-link.router-link-active {
  color: var(--primary-color);
  font-weight: 500;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Form styles */
.form-group {
  margin-bottom: 1.5rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
}

/* Button styles */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
}

/* Card styles */
.card {
  background-color: var(--surface);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px var(--shadow-color);
}

/* List styles */
.list-group {
  list-style: none;
  padding: 0;
}

.list-group-item {
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-group-item:last-child {
  border-bottom: none;
}

/* Utility classes */
.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }
.mt-5 { margin-top: 2.5rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }
.mb-5 { margin-bottom: 2.5rem; }

.p-1 { padding: 0.5rem; }
.p-2 { padding: 1rem; }
.p-3 { padding: 1.5rem; }
.p-4 { padding: 2rem; }
.p-5 { padding: 2.5rem; }

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }

  .main-content {
    padding: 1rem;
  }

  .navbar-nav {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
