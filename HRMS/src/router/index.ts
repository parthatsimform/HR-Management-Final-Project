import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '/profile',
  name: 'Profile',
  component: () => import("@/views/Profile.vue"),

}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
