<template>
  <div id="app">
    <mu-flexbox align="stretch">
      <mu-flexbox-item id="left-column" grow="0">
        Hello World! Here are some example buttons to look at the colours.
        <mu-text-field label="website" type="url" v-model="websiteUrl" />
        <div>
          <mu-raised-button fullWidth>Normal</mu-raised-button>
        </div>
        <div>
          <mu-raised-button primary fullWidth>Primary</mu-raised-button>
        </div>
        <div>
          <mu-raised-button secondary fullWidth>Secondary</mu-raised-button>
        </div>
        <div>
          <mu-raised-button disabled fullWidth>Disabled</mu-raised-button>
        </div>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <webview :src="websiteUrl"></webview>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'sticky-web',
    components: { SystemInformation },
    methods: {

    },
    data: function () {
      return {
        websiteUrl: 'http://cgagnier.ca'
      }
    }
  }
</script>

<style>
  #app, #app > .mu-flexbox {
    height: 100%;
  }

  webview {
    height: 100%
  }

  #left-column {
    width: 300px;
    padding: 16px;
  }
</style>
