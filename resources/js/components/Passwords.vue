<template>
    <div class="p-8">
        <h1 class="text-2xl font-bold mb-4">Your Saved Passwords</h1>
        <button @click="showAddForm = !showAddForm" class="bg-blue-500 text-white px-4 py-2 mb-4">
            {{ showAddForm ? 'Cancel' : 'Add New Password' }}
        </button>

        <button class="bg-red-500 text-white px-4 py-2 mb-4 ml-2" @click="logout">
            Logout
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

        <!-- list passwords -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Platform
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Password
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="password in passwords" :key="password.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ password.platform_name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ password.username }}
                        </td>
                        
                        <td class="px-6 py-4">
                            <!-- Display password based on visibility status -->
                            {{ password.isPasswordHidden ? password.encrypted_password.replace(/./g, '*') :
                            password.encrypted_password }}

                            <!-- Toggle button for password visibility -->
                            <span class="material-symbols-outlined cursor-pointer"
                                @click="togglePasswordVisibility(password)">
                                {{ password.isPasswordHidden ? 'visibility' : 'visibility_off' }}
                            </span>
                        </td>

                        <td>
                            <button @click="deletePassword(password.id)" class="text-red-500">Delete</button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const passwords = ref([]);
const showAddForm = ref(false);
const newPassword = ref({
    platform_name: '',
    username: '',
    encrypted_password: '',
});

const router = useRouter()

onMounted(async () => {
    await loadPasswords();
});

async function loadPasswords() {
    const response = await axios.get('/api/passwords', {
        headers: {
            Authorization: `Bearer ${authStore.user.token}`,
        },
    });

    // Add `isPasswordHidden` for each password entry
    passwords.value = response.data.map(password => ({
        ...password,
        isPasswordHidden: true
    }));
}

async function addPassword() {
    await axios.post('/api/passwords',
        newPassword.value,
        {
            headers: {
                Authorization: `Bearer ${authStore.user.token}`,
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
            Authorization: `Bearer ${authStore.user.token}`,
        },
    });
    await loadPasswords();
}

const togglePasswordVisibility = (password) => {
    password.isPasswordHidden = !password.isPasswordHidden;
}

const logout = async () => {
    await authStore.logout();
    router.push('/login')
}


</script>

<style></style>