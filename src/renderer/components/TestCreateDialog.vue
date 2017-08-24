<template>
<div>
  <mu-dialog :open="open" title="Create a New Test" @close="close">
    <form id="createTestDialogForm" v-on:submit="createTest">
      <mu-text-field label="Test Name" :errorText="urlErrorText" hintText="Brief description of what is being tested" v-model="name"/><br>
      <mu-text-field label="Starting URL" :errorText="urlErrorText" hintText="http://example.com/" v-model="startUrl"/>
    </form>

    <mu-flat-button slot="actions" @click="close" primary label="Cancel" />
    <mu-flat-button slot="actions" primary @click="createTest" label="Create" />
  </mu-dialog>
</div>
</template>

<script>
  import { isWebUri } from 'valid-url'

  export default {
    data: function () {
      return {
        name: '',
        startUrl: '',
        urlErrorText: ''
      }
    },
    props: ['open'],
    methods: {
      close: function () {
        this.$emit('close')
      },
      createTest: function (event) {
        event.preventDefault()

        let hasErrors = false

        if (!isWebUri(this.startUrl)) {
          this.urlErrorText = 'Please enter a valid Url'
          hasErrors = true
        } else {
          this.urlErrorText = ''
        }

        if (!hasErrors) {
          this.$emit('createTest', {
            name: this.name,
            startUrl: this.startUrl
          })
        }
      }
    }
  }
</script>

<<style>
  .mu-text-field {
    width: 100%;
  }
</style>
