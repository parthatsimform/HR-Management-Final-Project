import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes : Array<RouteRecordRaw>= [
  const routes = [{
    path: '/profile/:id(\\d+)',
    name: 'Profile',
    component: () => import("@/views/Profile.vue")
  },
  {
    path: '/emp-department',
    name: 'EmpDept',
    component: () => import("@/views/EmpDept.vue"),
  
  }]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
