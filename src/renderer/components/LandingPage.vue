<template>
  <div id="app">
    Hello World! Here are some example buttons to look at the colours.

    <div>
      <v-btn>Normal</v-btn>
    </div>
    <div>
      <v-btn primary>Primary</v-btn>
    </div>
    <div>
      <v-btn accent class="purple accent-4">Accent (Not supported with 'accent' property)</v-btn>
    </div>
    <div>
      <v-btn secondary>Secondary</v-btn>
    </div>
    <div>
      <v-btn warning>Warning</v-btn>
    </div>
    <div>
      <v-btn success>Success</v-btn>
    </div>
    <div>
      <v-btn info>Info</v-btn>
    </div>
    <div>
      <v-btn error>Error</v-btn>
    </div>
    <div>
      <v-btn primary disabled>Disabled</v-btn>
    </div>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'sticky-web',
    components: { SystemInformation },
    methods: {

    }
  }
</script>

<style>
  .main-content {
    padding: 16px;
  }
</style>
