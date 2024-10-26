import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Passwords from '../components/Passwords.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/passwords', component: Passwords },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;
