import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        // token: localStorage.getItem('token') || null,
        // user: null,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    }),
    actions: {
        async register(name, email, password) {
            await axios.post('/api/register', { name, email, password })
                .catch((err) => {
                    throw err;
                })
        },

        async login(email, password) {
            const response = await axios.post('/api/login', { email, password });
            // this.token = response.data.token;
            // this.user = response.data.user;
            this.user = response.data
            localStorage.setItem('user', JSON.stringify(this.user));
        },

        async logout() {
            // this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        },
    },
});
