import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		name: "Login",
		path: "/login",
		component: () => import("../views/Login.vue"),
	},
	{
		name: "Register",
		path: "/register",
		component: () => import("../views/Register.vue"),
	},
	{
    path: '/profile/:id(\\d+)',
    name: 'Profile',
    component: () => import("@/views/Profile.vue")
  }]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;
