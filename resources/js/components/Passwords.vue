<template>
    <div class="p-8">
        <h1 class="text-2xl font-bold mb-4">Your Saved Passwords</h1>
        <button @click="showAddForm = !showAddForm" class="bg-blue-500 text-white px-4 py-2 mb-4">
            {{ showAddForm ? 'Cancel' : 'Add New Password' }}
        </button>

        <div v-if="showAddForm" class="mb-6">
            <form @submit.prevent="addPassword">
                <input v-model="newPassword.platform_name" type="text" placeholder="Platform Name"
                    class="border p-2 mb-2 block w-full">
                <input v-model="newPassword.username" type="text" placeholder="Username"
                    class="border p-2 mb-2 block w-full">
                <input v-model="newPassword.encrypted_password" type="password" placeholder="Password"
                    class="border p-2 mb-4 block w-full">
                <button type="submit" class="bg-green-500 text-white px-4 py-2">Save</button>
            </form>
        </div>

        <ul>
            <li v-for="password in passwords" :key="password.id" class="border-b py-2">
                <strong>{{ password.platform_name }}</strong>: {{ password.username }}
                <button @click="deletePassword(password.id)" class="text-red-500 ml-4">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();
const passwords = ref([]);
const showAddForm = ref(false);
const newPassword = ref({
    platform_name: '',
    username: '',
    encrypted_password: '',
});

onMounted(async () => {
    await loadPasswords();
});

async function loadPasswords() {
    const response = await axios.get('/api/passwords', {
        headers: {
            Authorization: `Bearer ${authStore.token}`,
        },
    });
    passwords.value = response.data;
}

async function addPassword() {
    await axios.post(
        '/api/passwords',
        newPassword.value,
        {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        }
    );
    await loadPasswords();
    newPassword.value = { platform_name: '', username: '', encrypted_password: '' };
    showAddForm.value = false;
}

async function deletePassword(id) {
    await axios.delete(`/api/passwords/${id}`, {
        headers: {
            Authorization: `Bearer ${authStore.token}`,
        },
    });
    await loadPasswords();
}
</script>

<style>

</style>