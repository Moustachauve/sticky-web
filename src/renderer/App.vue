<template>
  <v-app id="sticky-web" standalone dark>
    <v-toolbar class="primary">
      <v-toolbar-title>Sticky Web</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    data: function () {
      return {}
    }
  }
</script>

<style>
  /* CSS */
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
