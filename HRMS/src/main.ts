import "./assets/main.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createApp, type App } from "vue";
import { createPinia } from "pinia";

import AppHRMS from "./App.vue";
import router from "./router";

import Nav from "./components/Nav.vue";

import { auth } from "./includes/firebase";

let app: App<Element>;
auth.onAuthStateChanged(() => {
	if (!app) {
		app = createApp(AppHRMS);
		app.use(createPinia());
		app.use(router);
		app.component("Nav", Nav);
		app.mount("#app");
	}
});
