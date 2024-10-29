import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
// import './index.css';
import router from './routes';
import 'flowbite';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')