import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes : Array<RouteRecordRaw>= [{
    path: '/profile/:id(\\d+)',
    name: 'Profile',
    component: () => import("@/views/Profile.vue")
  }]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
