import { createRouter, createWebHistory } from 'vue-router'
import counterRoutes from './pages/counter/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...counterRoutes
  ]
})

export default router
