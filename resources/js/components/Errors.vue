<template>
    <div style="color: red;" v-if="error">
        <ul>
            <li v-for="(messages, index) in error" :key="index">{{ messages[0] }}</li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        error: {
            type: Object,
            default: null
        }
    }
}
</script>

<style></style>
