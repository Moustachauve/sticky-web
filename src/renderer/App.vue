<template>
  <div class="layout" id="sticky-web">
    <mu-appbar title="Sticky Web"></mu-appbar>
    <div class="body">
        <mu-content-block>
          <router-view></router-view>
        </mu-content-block>
    </div>
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
</style>
