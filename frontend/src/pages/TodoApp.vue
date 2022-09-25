<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Batch 45 {{ task }}</q-toolbar-title>

      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>
    <q-input class="q-ma-md" rounded outlined  v-model="task" label="What needs to be done"
      @keyup.enter="add"
    />
    <q-list bordered separator class="q-ma-md">
      <q-item clickable v-ripple v-for="(todo, i) in state.todos" :key="todo.id + 'item'" >
        <q-item-section avatar>
          <q-checkbox v-model="todo.done" />
        </q-item-section>
        <q-item-section>{{ i }} {{ todo.title }} {{ todo.done }}</q-item-section>
        <q-item-section side>
          <q-btn icon="close" round dense color="red" flat size="small" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>

import { reactive, ref } from 'vue'

// create an array of todos

const task = ref('')

const state = reactive({
  todos: [
    {
      id: 1,
      title: 'Learn React',
      done: true
    },
    {
      id: 2,
      title: 'Learn Vue',
      done: true
    },
    {
      id: 3,
      title: 'Learn Vue 2',
      done: true
    }
  ]
})

function add () {
  state.todos.unshift({
    id: Date.now(),
    title: task.value,
    done: false
  })

  task.value = ''

  console.log(state.todos)
}

</script>

<style>
  h3 {
    background-color: purple;
    color: white;
  }

  .header {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .pinkcolor {
    color: pink;
  }

  #header {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
