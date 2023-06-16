import "./assets/main.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import Nav from "./components/Nav.vue";

import { auth } from "./includes/firebase";

let app: any;
auth.onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App);
		app.use(createPinia());
		app.use(router);
		app.component("Nav", Nav);
		app.mount("#app");
	}
});
