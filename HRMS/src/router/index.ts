import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
});

export default router;
