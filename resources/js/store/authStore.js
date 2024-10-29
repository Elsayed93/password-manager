import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
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
            this.user = response.data
            localStorage.setItem('user', JSON.stringify(this.user));
        },

        async logout() {
            this.user = null;
            localStorage.removeItem('token');
        },
    },
});
