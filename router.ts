import { createRouter, createWebHistory } from 'vue-router'
import counterV1Routes from './pages/counter_v1/routes'
import counterV2Routes from './pages/counter_v2/routes'
import goodscartRoutes from './pages/goodscart/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...counterV1Routes,
    ...counterV2Routes,
    ...goodscartRoutes,
  ]
})

export default router
