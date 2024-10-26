import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
    }),
    actions: {
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
