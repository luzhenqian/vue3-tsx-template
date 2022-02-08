import { createRouter, createWebHistory } from 'vue-router'
import counterV1Routes from './src/counter_v1/routes'
import counterV2Routes from './src/counter_v2/routes'
import goodscartRoutes from './src/goodscart/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...counterV1Routes,
    ...counterV2Routes,
    ...goodscartRoutes,
  ]
})

export default router
