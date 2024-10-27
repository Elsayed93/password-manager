import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Passwords from '../components/Passwords.vue';
import { useAuthStore } from '../store/authStore';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    { path: '/register', component: Register },
    {
        path: '/passwords',
        component: Passwords,
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

router.beforeEach((to, from) => {
    const authStore = useAuthStore();

    // explicitly return false to cancel the navigation
    if (
        // make sure the user is authenticated
        !authStore.user &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        // redirect the user to the login page
        return { name: 'Login' }
    }
    return true
})

export default router;
