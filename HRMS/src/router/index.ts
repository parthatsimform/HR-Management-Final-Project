import { createRouter, createWebHistory } from 'vue-router'

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
  routes: routes
})

export default router
