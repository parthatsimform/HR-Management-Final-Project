import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from "vue";
import { createPinia } from "pinia";
// import { VueFire, VueFireAuth } from "vuefire";

import App from "./App.vue";
import router from "./router";
// import { firebaseApp } from "./firebase";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.use(VueFire, {
// 	firebaseApp,
// 	modules: [VueFireAuth()],
// });

app.mount("#app");
