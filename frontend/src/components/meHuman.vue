<template>
  <div class="hair">
    <h3>{{ state.name }}</h3>
    age: <q-btn dense round icon="remove" @click="decreaseAge" /> {{state.age}} <q-btn dense round icon="add" @click="addAge" />
    birthYear: {{ birthYear }}
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'

// create a human object
const state = reactive({
  hairLength: 'long',
  hairColor: 'black',
  skin: 'brown',
  withBangs: true,
  name: 'Pogi',
  age: 26
})

const addAge = () => state.age++

const decreaseAge = () => state.age--

const currentYear = new Date().getFullYear()

const birthYear = computed(() => currentYear - state.age)

</script>
