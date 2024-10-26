import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
    }),
    actions: {
        async register(name, email, password) {
            const response = await axios.post('/api/register', { name, email, password })
                .catch((err) => {
                    throw err;
                })
        },
        async login(email, password) {
            const response = await axios.post('/api/login', { email, password });
            this.token = response.data.token;
            this.user = response.data.user;
            localStorage.setItem('token', this.token);
        },
        async logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        },
    },
});
