<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Batch 45</q-toolbar-title>

      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>
    <q-input rounded outlined  modelValue="text" label="What needs to be done" />
    <q-list bordered separator>
      <q-item clickable v-ripple >
        <q-item-section avatar>
          <q-icon name="signal_wifi_off" />
        </q-item-section>
        <q-item-section>Active</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>

      <q-item clickable v-ripple active-class="text-orange">
        <q-item-section avatar>
          <q-icon name="signal_wifi_off" />
        </q-item-section>
        <q-item-section>Active, Active class</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

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
