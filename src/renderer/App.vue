<template>
  <v-app id="sticky-web" standalone>
    <v-navigation-drawer permanent clipped light>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="teal" dark>
      <v-toolbar-title>Toolbar</v-toolbar-title>
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
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        right: null
      }
    }
  }
</script>

<style>
  /* CSS */
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
