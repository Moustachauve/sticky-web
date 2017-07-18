const { ipcRenderer } = require('electron')

console.log('File successfuly injected')
var isSelectingElement = false

document.addEventListener('DOMContentLoaded', function () {
  var unique = require('unique-selector')

  var data = {
    'title': document.title,
    'url': window.location.href,
    'favicon': 'https://www.google.com/s2/favicons?domain=' + window.location.href
  }

  ipcRenderer.sendToHost('window-data', data)

  ipcRenderer.on('startSelect', function () {
    console.log('aaaa')
    isSelectingElement = true
    console.log(isSelectingElement)
  })
  ipcRenderer.on('stopSelect', function () {
    console.log('bbbb')
    isSelectingElement = false
  })

  document.body.addEventListener('mouseover', function (e) {
    if (isSelectingElement) {
      console.log('hover')
      e.target.style = 'outline: 1px solid rgba(10,10,10,0.4); outline-offset: -1px; box-shadow: inset 0 0 0 1000px rgba(105,171,253,.5);'
      e.preventDefault()
    }
  })

  document.body.addEventListener('click', function (e) {
    if (isSelectingElement) {
      e.preventDefault()
      e.stopImmediatePropagation()
      try {
        var uniqueSelector = unique.default(e.target)
      } catch (ex) {
        alert('This element is not yet supported (Browser restriction)')
      }
      console.log(uniqueSelector)
      ipcRenderer.sendToHost('element-clicked', uniqueSelector)
    }
  }, true)

  document.body.addEventListener('mouseout', function (e) {
    console.log('mouse left', isSelectingElement)
    e.target.style = ''
  })
})
