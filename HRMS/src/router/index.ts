import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
		name: "Home",
		path: "/",
		component: () => import("../views/Home.vue"),
	},
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
    component: () => import("../views/Profile.vue")
  },
  {
    path: '/emp-directory',
    name: 'Directory',
    component: () => import("../views/EmployeeDirectory.vue")
  },
  {
    path: '/apply-leave',
    name: 'ApplyLeave',
    component: () => import("../views/ApplyLeave.vue")
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active-nav-link'
})

export default router;
