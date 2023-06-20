import { createRouter, createWebHistory, type Router } from "vue-router";
import { useEmployeeStore } from "@/stores/employeeStore";

const routes = [
	{
		name: "Home",
		path: "/",
		component: () => import("../views/Home.vue"),
		meta: {
			requiresAuth: true,
		},
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
		path: "/profile",
		name: "Profile",
		component: () => import("../views/Profile.vue"),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/emp-directory",
		name: "Directory",
		component: () => import("../views/EmployeeDirectory.vue"),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/apply-leave",
		name: "ApplyLeave",
		component: () => import("../views/ApplyLeave.vue"),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/:catchAll(.*)*",
		component: () => import("../views/ErrorPage.vue"),
	},
];

const router: Router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	linkExactActiveClass: "active-nav-link",
});

router.beforeEach((to, from, next) => {
	const employeeStore = useEmployeeStore();
	if (!to.meta.requiresAuth) {
		employeeStore.isLoggedIn &&
		(to.fullPath == "/login" || to.fullPath == "/register")
			? next({ name: "Home" })
			: next();
	} else {
		employeeStore.isLoggedIn ? next() : next({ name: "Login" });
	}
});

export default router;
