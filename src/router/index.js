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
        {
          path:'category/sub/:id',
          component: () => import('../views/SubCategory.vue')
        },
        {
          path:'detail/:id',
          component: () => import('../views/Detail.vue')
        },
      ]
    },
    {
      path: '/Login',
      component: () => import('../views/Login.vue')
    }
  ],
  // 路由滾動行為訂製
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router
