<template>
  <div id="test-list">

    <mu-content-block>
      <span>{{testCount}} total test, {{testPassing}} passing, {{testFailing}} failling, {{testPending}} not executed and {{testExecuting}} executing</span>
    </mu-content-block>
    <mu-content-block>
      <mu-raised-button secondary label="Run All" icon="fast_forward" />
      <mu-raised-button secondary label="Add" icon="add" @click="openCreateDialog" />
    </mu-content-block>
    
    <mu-divider />
    <mu-content-block>
      <table id="test-list">
        <thead>
          <tr>
            <th class="col-status"></th>
            <th class="col-name">Test</th>
            <th class="col-last-run">Time since last run</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tr v-for="(test, index) in tests" v-bind:key="index">
          <td><div :class="'test-status ' + test.status"></div></td>
          <td>{{test.name}}</td>
          <td>{{displayDate(test.lastRun)}}</td>
          <td>
            <mu-icon-button tooltip="Run" icon="play_arrow" />
            <mu-icon-button tooltip="Edit" icon="edit" to="editor" />
          </td>
        </tr>
      </table>
    </mu-content-block>
    <TestCreateDialog :open="createDialogOpened" v-on:close="closeCreateDialog" v-on:createTest="createTest"></TestCreateDialog>
  </div>
</template>

<script>
  import TestCreateDialog from './TestCreateDialog'
  import { ipcRenderer } from 'electron'

export default {
    name: 'test-list',
    components: { TestCreateDialog },
    methods: {
      openCreateDialog () {
        this.createDialogOpened = true
      },
      closeCreateDialog () {
        this.createDialogOpened = false
      },
      createTest (params) {
        console.log(params)
        this.createDialogOpened = false
        ipcRenderer.send('createNewTest', params)
      },
      displayDate (date) {
        if (!date) {
          return 'Never'
        }
        if (typeof date === 'string') {
          date = new Date(date)
        }

        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
      }
    },
    data: function () {
      return {
        createDialogOpened: false,
        tests: [/*
          {name: 'hello test 1', status: 'success', lastRun: new Date()},
          {name: 'hello test 2', status: 'fail', lastRun: new Date()},
          {name: 'hello test 3', status: 'fail', lastRun: new Date()},
          {name: 'hello test 4', status: 'success', lastRun: new Date()},
          {name: 'hello test 5', status: 'executing', lastRun: new Date()},
          {name: 'hello test 6', status: '', lastRun: new Date()}
        */]
      }
    },
    computed: {
      testCount: function () { return this.tests.length },
      testPassing: function () {
        return countTestWithStatus(this.tests, 'success')
      },
      testFailing: function () {
        return countTestWithStatus(this.tests, 'fail')
      },
      testPending: function () {
        return countTestWithStatus(this.tests, '')
      },
      testExecuting: function () {
        return countTestWithStatus(this.tests, 'executing')
      }
    },
    mounted: function () {
      ipcRenderer.on('createNewTestDone', function (event, test) {
        this.tests.push(test)
      }.bind(this))

      ipcRenderer.on('loadAllTestsResult', function (event, tests) {
        this.tests = tests || []
      }.bind(this))

      ipcRenderer.send('loadAllTests')
    }
  }

  function countTestWithStatus (tests, status) {
    var nbPassing = 0
    for (var i = 0; i < tests.length; i++) {
      if (tests[i].status === status) {
        nbPassing++
      }
    }
    return nbPassing
  }

</script>

<style>
  #test-list {
    width: 100%;
  }

  #test-list .col-status {
    width: 30px;
  }

  #test-list .col-last-run {
    width: 180px;
  }

  #test-list .col-actions {
    width: 125px;
  }

  .test-status {
    height: 20px;
    width: 20px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    background-color: #bababa;
  }

  .test-status.success {
    background-color: #4caf50;
  }
  .test-status.fail {
    background-color: #f44336;
  }
  .test-status.executing {
    background-color: #ffc107;
  }

  .mu-raised-button {
    overflow: visible;
  }
</style>
