<template>
  <div class="hair">
    <h3>{{ state.name }}</h3>
    age: <q-btn dense round icon="remove" @click="decreaseAge" /> {{state.age}} <q-btn dense round icon="add" @click="addAge" />
    birthYear: {{ birthYear }}

    <q-btn dense round icon="save" @click="emit('updateAge', state.age)" />
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  human: {
    type: Object,
    default: () => ({
      name: 'pogi',
      age: 0
    })
  }
})

const emit = defineEmits(['updateAge'])

// create a human object
const state = reactive({
  hairLength: 'long',
  hairColor: 'black',
  skin: 'brown',
  withBangs: true,
  name: props.human.name,
  age: props.human.age
})

const addAge = () => state.age++

const decreaseAge = () => state.age--

const currentYear = new Date().getFullYear()

watch(() => state.age, (newVal, oldVal) => {
  console.log('newAge', newVal, oldVal)
  emit('updateAge', newVal)
})

const birthYear = computed(() => {
  return currentYear - state.age
})

</script>
