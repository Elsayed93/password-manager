<template>
    <div class="p-8">
        <h1 class="text-2xl font-bold mb-4">Login</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" class="border p-2 mb-4 block w-full">
            <input v-model="password" type="password" placeholder="Password" class="border p-2 mb-4 block w-full">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

async function login() {
    await authStore.login(email.value, password.value);
    router.push('/passwords');
}
</script>

<style>
</style>