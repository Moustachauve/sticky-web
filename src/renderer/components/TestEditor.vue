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

      <mu-flexbox-item id="right-column" grow="0">
        <h3>Actions</h3>
        <mu-raised-button fullWidth icon="my_location" v-on:click="selectElement" primary>Add</mu-raised-button>
        <mu-raised-button fullWidth icon="fast_forward" v-on:click="selectElement" secondary>Run All</mu-raised-button>
        <mu-raised-button fullWidth icon="play_arrow" v-on:click="playNextAction" secondary>Next Step</mu-raised-button>
        <mu-raised-button fullWidth icon="replay" v-on:click="resetNextAction" secondary>Reset</mu-raised-button>
        <table>
          <tbody>
            <template v-for="(action, index) in test.actions">
              <tr v-bind:key="index" v-if="currentActionIndex == index" class="currentActionIndicator">
                <td colspan="2"></td>
              </tr>
              <tr v-bind:key="index">
                <td>{{action.event}}</td>
                <td><span class="label">{{action.element.target.tagName}}</span> {{action.element.uniqueSelector}}</td>
              </tr>
            </template>

            <tr v-if="this.test.actions && this.currentActionIndex === this.test.actions.length" class="currentActionIndicator">
              <td colspan="2"></td>
            </tr>
          </tbody>
        </table>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-dialog :open="actionPickerVisible" title="Element Picked" @close="closeActionPicker">
      <p v-if="lastPickedElement.element && lastPickedElement.element.target">
        <span class="label">{{lastPickedElement.element.target.tagName}}</span> {{lastPickedElement.element.uniqueSelector}}
      </p>
      <p>
        <span class="label">Attributes:</span>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Value</td>
              <td>Check for same value</td>
            </tr>
          </thead>
          <tbody v-if="lastPickedElement.element && lastPickedElement.element.target && lastPickedElement.element.target.attributes">
            <tr v-for="(attribute, index) in lastPickedElement.element.target.attributes" v-bind:key="index">
              <td>{{index}}</td>
              <td>{{attribute}}</td>
              <td><input type="checkbox" /></td>
            </tr>
          </tbody>
        </table>
      </p>
      <form id="actionPickerForm" v-on:submit="closeActionPicker" v-if="lastPickedElement">
        <h2>Pick an action</h2>
        <label><input type="radio" v-model="lastPickedElement.event" value="" />Nothing</label>
        <label><input type="radio" v-model="lastPickedElement.event" value="click" />Click</label>
      </form>

      <mu-flat-button slot="actions" @click="closeActionPicker" secondary label="Cancel" />
      <mu-flat-button slot="actions" @click="addAction" primary label="Add" />
    </mu-dialog>
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
      },
      closeActionPicker: function () {
        this.actionPickerVisible = false
      },
      showActionPicker: function () {
        this.actionPickerVisible = true
      },
      addAction: function () {
        if (!this.test.actions) {
          this.test.actions = []
        }
        this.test.actions.push(this.lastPickedElement)

        this.closeActionPicker()
        this.playNextAction()
      },
      playNextAction: function () {
        if (!this.test.actions || this.currentActionIndex === this.test.actions.length) {
          return
        }
        this.currentActionIndex++
      },
      resetNextAction: function () {
        this.currentActionIndex = 0
      }
    },
    data: function () {
      return {
        test: {
          actions: []
        },
        currentActionIndex: 0,
        lastPickedElement: {},
        websiteUrlLoaded: '',
        pageTitle: pageTitle,
        dirPath: path.resolve(__dirname), /* app.getAppPath() */
        actionPickerVisible: false
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
      webview.openDevTools()
    })
    webview.addEventListener('ipc-message', function (e) {
      console.log('ipc-message', e.channel, e.args)
      if (e.channel === 'window-data') {
        this.pageTitle = e.args[0].title
        this.websiteUrlLoaded = e.args[0].url
      } else if (e.channel === 'element-clicked') {
        webview.send('stopSelect')
        this.lastPickedElement = {
          event: '',
          element: e.args[0]
        }
        this.showActionPicker()
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

  #left-column, #right-column {
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

  .label {
    color: #ffffff;
    font-weight: bold;
  }

  .mu-dialog-body {
    color: #ffffff;
  }

  .currentActionIndicator td {
    border-bottom: 2px solid chartreuse;
  }
</style>
