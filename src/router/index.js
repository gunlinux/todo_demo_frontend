import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '@/components/TaskList.vue'
import CreateTask from '@/components/CreateTask.vue'
import CreateCategory from '@/components/CreateCategory.vue'
import EditTask from '@/components/EditTask.vue'
import UserForm from '@/components/UserForm.vue'
import RegUser from '@/components/RegUser.vue'
import AuthLink from '@/components/AuthLink.vue'
import { useAuthStore } from '../stores/auth';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: TaskList
  },
  {
    path: '/create-task',
    name: 'CreateTask',
    component: CreateTask
  },
  {
    path: '/create-category',
    name: 'CreateCategory',
    component: CreateCategory
  },

  {
    path: '/edit-task/:id',
    name: 'EditTask',
    component: EditTask,
    props: true
  },
  {
    path: '/users/new',
    name: 'NewUser',
    component: UserForm
  },
  {
    path: '/register',
    name: 'RegUser',
    component: RegUser
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      auth.logout();
      next('/register');
    }
  },
  {
    path: '/auth/link',
    name: 'AuthLink',
    component: AuthLink
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) {
    next('/register');
  } else {
    next();
  }
});