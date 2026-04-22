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
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/RegisterPage.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/ProfilePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '/404',
      component: () => import('@/pages/404View.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/profile')
  } else {
    next()
  }
})

export default router
