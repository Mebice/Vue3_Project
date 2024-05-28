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
        {
          path:'cartList',
          component: () => import('../views/CartList.vue')
        },
        {
          path:'checkout',
          component: () => import('../views/Checkout.vue')
        },
        {
          path:'pay',
          component: () => import('../views/Pay.vue')
        },
        {
          path:'paycallback',
          component: () => import('../views/PayCallBack.vue')
        },
        {
          path:'member',
          component: () => import('../views/Member.vue'),
          children: [
            {
              path:'', // 默認頁
              component: () => import('../components/Member/UserInfo.vue'),    
            },
            {
              path:'order',
              component: () => import('../components/Member/UserOrder.vue'),    
            },
          ]
        },
        {
          path:'search',
          component: () => import('../views/Search.vue')
        },
      ]
    },
    {
      path: '/login',
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

// 全局导航守卫
router.beforeEach((to, from, next) => {
  // 如果即将导航的目标路径不是搜索页
  if (to.path !== '/search') {
      // 清除sessionStorage中的搜索关键词
      sessionStorage.removeItem('searchQuery');
  }
  next();
});

export default router
