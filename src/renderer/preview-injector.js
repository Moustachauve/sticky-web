const { ipcRenderer } = require('electron')

console.log('File successfuly injected')

document.addEventListener('DOMContentLoaded', function () {
  var data = {
    'title': document.title,
    'url': window.location.href,
    'favicon': 'https://www.google.com/s2/favicons?domain=' + window.location.href
  }

  ipcRenderer.sendToHost('window-data', data)
})
