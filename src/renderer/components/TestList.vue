<template>
  <div id="test-list">
    <mu-card>
      <mu-card-actions>
        <mu-flexbox justify="flex-start" align="baseline">
          <mu-raised-button secondary label="Run All" icon="fast_forward" />
          <mu-raised-button secondary label="Add" icon="add" to="editor" />
        </mu-flexbox>
      </mu-card-actions>
    </mu-card>
    <mu-card v-for="(test, index) in tests" v-bind:key="index">
      <mu-card-actions>
        <mu-flexbox justify="flex-end" align="baseline">
          <mu-flexbox-item justify="flex-start">{{test.name}}</mu-flexbox-item>
          <mu-flat-button label="Run" icon="play_arrow" />
          <mu-flat-button label="Edit" icon="settings" to="editor" />
        </mu-flexbox>
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
  export default {
    name: 'test-list',
    methods: {

    },
    data: function () {
      return {
        tests: [
          {name: 'hello test 1'},
          {name: 'hello test 2'},
          {name: 'hello test 3'}
        ]
      }
    }
  }

</script>

<style>
  
</style>
