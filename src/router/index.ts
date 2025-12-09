import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('@/views/EventsView.vue')
  },
  {
    path: '/events/:id',
    name: 'EventDetail',
    component: () => import('@/views/EventDetailView.vue')
  },
  {
    path: '/deposit/:id',
    name: 'DepositPayment',
    component: () => import('@/views/DepositPaymentView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

