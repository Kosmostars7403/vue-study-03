import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '@/views/Tasks'
import Task from '@/views/Task'
import New from '@/views/New'

const routes = [
  {path: '/', component: Tasks},
  {path: '/task/:id', component: Task},
  {path: '/new', component: New},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})

export default router
