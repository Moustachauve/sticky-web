<template>
  <div id="app">
    <mu-flexbox align="stretch">
      <mu-flexbox-item id="left-column" grow="0">
        <div>
          <mu-flat-button secondary fullWidth icon="arrow_back" to="/">Go back</mu-flat-button>
        </div>
        <mu-text-field label="website" type="url" v-model="websiteUrl" full-width />
        <div>
          <div>Actual loaded URL:</div>
          <div class="url-box">{{websiteUrlLoaded}}</div>
        </div>

        <p>Hello World! Here are some example buttons to look at the colours.</p>
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
      <mu-flexbox-item class="mu-paper mu-paper-round mu-paper-2">
        <mu-flexbox orient="vertical" justify="stretch" id="main-container">
          <div id="preview-title"><span>Title:</span> {{pageTitle}}</div>
          <webview :src="websiteUrl" id="preview-webview" class="mu-flexbox-item" :preload="'file://' + dirPath + '/../preview-injector.js'"></webview>
        </mu-flexbox>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
  // const {remote} = require('electron')
  const path = require('path')

  var pageTitle = 'Default...'

  export default {
    name: 'sticky-web',
    methods: {

    },
    data: function () {
      return {
        websiteUrl: 'http://cgagnier.ca',
        websiteUrlLoaded: '',
        pageTitle: pageTitle,
        dirPath: path.resolve(__dirname) /* app.getAppPath() */
      }
    },
    mounted: function () {
      console.log('onload?')
      var webview = document.getElementById('preview-webview')

      if (webview) {
        webview.addEventListener('dom-ready', () => {
          webview.openDevTools()
        })
        webview.addEventListener('ipc-message', function (e) {
          console.log('ipc-message', e)
          this.pageTitle = e.args[0].title
          this.websiteUrlLoaded = e.args[0].url
        }.bind(this))
      } else {
        console.error('Webview not found!')
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
    width: 250px;
    padding: 16px;
  }

  #preview-title {
    width: 100%;
    padding: 5px;
  }

  #preview-title > span {
    color: #bababa;
  }

  .url-box {
    overflow-x: auto;
  }
</style>
