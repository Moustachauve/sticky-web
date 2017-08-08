<template>
  <div id="app">
    <mu-flexbox align="stretch">
      <mu-flexbox-item id="left-column" grow="0">
        <div>
          <mu-flat-button secondary fullWidth icon="arrow_back" to="/">Go back</mu-flat-button>
        </div>
        <h3>{{test.name}}</h3>
        <mu-text-field label="Starting Url" type="url" v-model="test.startUrl" full-width />
        <div>
          <div>Currently loaded URL:</div>
          <div class="url-box">{{websiteUrlLoaded}}</div>
        </div>
        <div>
          <mu-raised-button fullWidth icon="my_location" v-on:click="selectElement">Select Element</mu-raised-button>
        </div>
        
      </mu-flexbox-item>
      <mu-flexbox-item class="mu-paper mu-paper-round mu-paper-2">
        <mu-flexbox orient="vertical" justify="stretch" id="main-container">
          <div id="preview-title"><span>Title:</span> {{pageTitle}}</div>
          <webview :src="test.startUrl" id="preview-webview" class="mu-flexbox-item" :preload="'file://' + dirPath + '/../preview-injector.js'"></webview>
        </mu-flexbox>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
  // const {remote} = require('electron')
  import { ipcRenderer } from 'electron'
  const path = require('path')
  var webview

  var pageTitle = 'Default...'

  export default {
    name: 'sticky-web',
    methods: {
      selectElement: function () {
        webview.send('startSelect')
      }
    },
    data: function () {
      return {
        test: [],
        websiteUrlLoaded: '',
        pageTitle: pageTitle,
        dirPath: path.resolve(__dirname) /* app.getAppPath() */
      }
    },
    props: ['uuid'],
    mounted: function () {
      if (!this.uuid) {
        return this.$router.push({name: 'test-list'})
      }

      ipcRenderer.on('loadTestResult', function (event, test) {
        this.test = test || []
      }.bind(this))

      ipcRenderer.send('loadTest', this.uuid)

      webview = document.getElementById('preview-webview')
      if (webview) {
        loadWebview(webview, this)
      } else {
        console.error('Webview not found!')
      }
    }
  }

  function loadWebview (webview, vuejs) {
    webview.addEventListener('dom-ready', () => {
      // webview.openDevTools()
    })
    webview.addEventListener('ipc-message', function (e) {
      console.log('ipc-message', e.channel, e.args)
      if (e.channel === 'window-data') {
        this.pageTitle = e.args[0].title
        this.websiteUrlLoaded = e.args[0].url
      } else if (e.channel === 'element-clicked') {
        webview.send('stopSelect')
      }
    }.bind(vuejs))
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
