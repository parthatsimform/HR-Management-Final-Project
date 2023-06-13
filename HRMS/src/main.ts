import './assets/main.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Nav from './components/Nav.vue'

const app = createApp(App)
app.component("Nav",Nav)
app.use(createPinia())
app.use(router)

app.mount('#app')
