import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutView.vue')
    },
    {
      path: '/products/:id',
      name: 'product',
      component: () => import('@/pages/ProductView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/CartView.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('@/pages/PaymentView.vue')
    },
    {
      path: '/check',
      name: 'check',
      component: () => import('@/pages/CheckView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '/404',
      component: () => import('@/pages/404View.vue')
    },
  ]
})

export default router
