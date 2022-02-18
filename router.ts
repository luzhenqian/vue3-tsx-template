import { createRouter, createWebHistory } from 'vue-router'
import welcomeRoutes from './src/welcome/routes'
import counterV1Routes from './src/counter_v1/routes'
import counterV2Routes from './src/counter_v2/routes'
import goodscartRoutes from './src/goodscart/routes'
import vantDemoRoutes from './src/vant-demo/routes'
import citySelectRoutes from './src/city_select/routes'
import refVsReactiveRoutes from './src/ref_vs_reactive/routes'

const router = createRouter({
  history: createWebHistory('/vtt/'),
  routes: [
    ...welcomeRoutes,
    ...counterV1Routes,
    ...counterV2Routes,
    ...goodscartRoutes,
    ...vantDemoRoutes,
    ...citySelectRoutes,
    ...refVsReactiveRoutes,
  ]
})

export default router
