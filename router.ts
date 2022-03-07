import { createRouter, createWebHistory } from 'vue-router'
import _ from "lodash"

const router = createRouter({
  history: createWebHistory('/vtt/'),
  routes: []
})

const context = require.context('./src', true, /page.tsx/)

// 约定式路由
_.forEach(context.keys(), (modulePath: string) =>{
  const routePath = modulePath.substring(1, modulePath.length).replaceAll('page.tsx', '')
  router.addRoute('vtt', {
    path: routePath,
    component: () => context(modulePath)
  })
})

export default router
