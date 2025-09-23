<template>
    <div>
        <h1>Hello {{ myName }}</h1>
        <input v-model="myName" placeholder="Enter your name" />
        <ul>
            <li
                v-for="student in students"
                :key="student"
                :style="{ backgroundColor: student === myName ? 'green' : '' }"
            >
                {{ student }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const myName = ref('')
const students = ref(['Manuel', 'Pepe', 'Ana', 'Maria'])

// Si quieres que el input también esté en verde cuando coincide:
</script>

<style>
input.match {
    background-color: green;
}
</style>
