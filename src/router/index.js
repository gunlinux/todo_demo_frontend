import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '@/components/TaskList.vue'
import CreateTask from '@/components/CreateTask.vue'
import CreateCategory from '@/components/CreateCategory.vue'
import EditTask from '@/components/EditTask.vue'
import UserForm from '@/components/UserForm.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
