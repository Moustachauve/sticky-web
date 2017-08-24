<template>
  <div class="layout" id="sticky-web">
    <mu-flexbox orient="vertical" justify="start" id="main-container">
      <mu-appbar title="Sticky Web"></mu-appbar>
      <div class="body mu-flexbox-item">
        <router-view></router-view>
      </div>
    </mu-flexbox>
  </div>
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

  html, body, #sticky-web, #main-container {
    height: 100%;color: #ffffff;
  }

  .mu-appbar-title > span {
    color: white;
  }
  
  .mu-flat-button-primary {
      color: #4fc3f7;
  }
</style>
