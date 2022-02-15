import { createRouter, createWebHistory } from 'vue-router'
import counterV1Routes from './src/counter_v1/routes'
import counterV2Routes from './src/counter_v2/routes'
import goodscartRoutes from './src/goodscart/routes'
import vantDemoRoutes from './src/vant-demo/routes'
import citySelectRoutes from './src/city_select/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...counterV1Routes,
    ...counterV2Routes,
    ...goodscartRoutes,
    ...vantDemoRoutes,
    ...citySelectRoutes,
  ]
})

export default router
