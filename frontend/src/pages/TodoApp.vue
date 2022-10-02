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
      ref="inputRef"
      @keyup.esc="inputRef.resetValidation()"
      :rules="[ val => val.length >= 3 || 'requires at least 3 characters' ]"
    />
    <q-list bordered separator class="q-ma-md">
      <q-item clickable v-ripple v-for="(todo, i) in state.todos" :key="todo.id + 'item'" >
        <q-item-section avatar>
          <q-checkbox v-model="todo.done" @update:model-value="saveState" />
        </q-item-section>
        <q-item-section
          :class="{
            strikethrough: todo.done
          }"
        >
          <q-input v-if="editing === i" ref="edits" v-model="tempTask" @keyup.esc="editing = -1" @blur="editing = -1" />
          <span v-else
            @dblclick="
              editing = i,
              tempTask = todo.title
            "
          >
            {{ i }} {{ todo.title }}
          </span>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="close" @click="removeTodo(todo.id)" round dense color="red" flat size="small" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>

import { reactive, ref } from 'vue'

// create an array of todoss

const task = ref('')
const tempTask = ref('')

const inputRef = ref(null)

const editing = ref(-1)

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

// state.todos = JSON.parse(window.localStorage.getItem('todos')) || [...state.todos]

console.log(JSON.parse(window.localStorage.getItem('todos')))

state.todos = JSON.parse(window.localStorage.getItem('todos') || '[]')

function add () {
  state.todos.unshift({
    id: Date.now(),
    title: task.value,
    done: false
  })

  task.value = ''

  // window.localStorage.setItem('todos', JSON.stringify([...state.todos]))
  saveState()

  console.log(state.todos)
}

const saveState = () => window.localStorage.setItem('todos', JSON.stringify([...state.todos]))

// function saveState () {
//   window.localStorage.setItem('todos', JSON.stringify([...state.todos]))
// }

const removeTodo = (id) => {
  // for (let index = 0; index < state.todos.length; index++) {
  //   const todo = state.todos[index]

  //   if (todo.id === id) {
  //     state.todos.splice(index, 1)
  //     saveState()
  //     return
  //   }
  // }

  const index = state.todos.findIndex(todo => todo.id === id)
  state.todos.splice(index, 1)

  // state.todos.find(function (todo) {
  //   return todo.id === id
  // })
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

  /* strikethrough */
  .strikethrough {
    text-decoration: line-through;
    color: grey
  }
</style>
