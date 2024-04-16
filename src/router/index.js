import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'', // 代表默認頁
          component: () => import('../views/Home.vue')
        },
        {
          path:'category/:id',
          component: () => import('../views/Category.vue')
        },
      ]
    },
    {
      path: '/Login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
