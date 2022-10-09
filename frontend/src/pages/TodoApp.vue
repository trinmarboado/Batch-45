<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Batch 45 {{ task }}</q-toolbar-title>

      <q-btn flat round dense icon="picture_as_pdf" @click="pdf('open')" />
      <q-btn flat round dense icon="print" @click="print" />
    </q-toolbar>
    <pie-chart :donut="true" :data="[['Active', remaining], ['Completed', state.todos.length - remaining]]"></pie-chart>
    <q-input class="q-ma-md" rounded outlined  v-model="task" label="What needs to be done"
      @keyup.enter="add"
      ref="inputRef"
      @keyup.esc="inputRef.resetValidation()"
      :rules="[ val => val.length >= 3 || 'requires at least 3 characters' ]"
    />
    {{ remaining }} item/s left
    <q-list bordered separator class="q-ma-md listPrint">
      <q-item clickable v-ripple v-for="(todo, i) in state.todos" :key="todo.id + 'item'" >
        <q-item-section avatar>
          <q-checkbox :modelValue="todo.done" @click="toggleStatus(todo)" @update:model-value="saveState" />
        </q-item-section>
        <q-item-section
          :class="{
            strikethrough: todo.done
          }"
        >
          <!-- <q-input v-if="editing === i" ref="edits" v-model="tempTask"
            @keyup.enter="editing = -1, todo.title = tempTask"
            @keyup.esc="editing = -1"
            @blur="editing = -1" />
          <span v-else
            @dblclick="
              editing = i,
              tempTask = todo.title,
              focusInput($refs)
            "
          >
            {{ i }} {{ todo.title }}
          </span> -->

          <span @click.stop @dblclick="$refs.edit[i].show()">{{ i }} {{ todo.title }}</span>
          <q-popup-edit ref="edit" v-model="todo.title" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="close" @click="removeTodo(todo.id)" round dense color="red" flat size="small" />
        </q-item-section>
      </q-item>
    </q-list>
    {{ human }}
    <me-human v-model="human.name" :human="human" @updateAge="(val) => human.age = val" />
  </div>
</template>

<script setup>

import { computed, inject, reactive, ref } from 'vue'

import meHuman from 'components/meHuman.vue'

const todosService = inject('todosService')

todosService.on('dataChange', (todos) => {
  console.log(todos)
  state.todos = [...todos.map(t => ({ ...t, id: t._id }))]
})

function toggleStatus (todo) {
  todosService.patch(todo.id, {
    done: !todo.done
  })
}

todosService.init()

const pdfMake = inject('pdfMake')
const printElement = inject('printElement')

const print = () => {
  const el = document.querySelector('.listPrint')
  printElement(el)
}

function pdf (method) {
  const dd = {
    content: [
      {
        table: {
          body: [
            ['Status', 'Count'],
            ['active', remaining.value],
            ['completed', state.todos.length - remaining.value]
          ]
        }
      }
    ]
  }
  pdfMake.createPdf(dd)[method]()
}

// async function focusInput (refs) {
//   await nextTick()
//   refs.edits[0].select()
//   // setTimeout(() => {
//   //   // asd
//   // }, 500)
// }

const human = ref({ name: 'Jeh', age: 39 })

const task = ref('')
// const tempTask = ref('')

const inputRef = ref(null)

// const editing = ref(-1)

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

const remaining = computed(() => {
  return state.todos.filter(todos => !todos.done).length
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

<style scoped>
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
