const { ipcRenderer } = require('electron')

console.log('File successfuly injected')
var isSelectingElement = false
var uniqueHoverCssClass = 'sticky-web-hover-element-u-class'

document.addEventListener('DOMContentLoaded', function () {
  injectCss()
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
    isSelectingElement = false
  })

  document.body.addEventListener('mouseover', function (e) {
    if (isSelectingElement) {
      console.log('hover')
      e.target.classList.add(uniqueHoverCssClass)
      e.preventDefault()
    }
  })

  document.body.addEventListener('click', function (e) {
    if (isSelectingElement) {
      e.preventDefault()
      e.stopImmediatePropagation()
      e.target.classList.remove(uniqueHoverCssClass)
      try {
        var uniqueSelector = unique.default(e.target)
      } catch (ex) {
        alert('This element is not yet supported (Browser restriction)')
      }
      console.log(uniqueSelector)

      var objAttributes = {}
      var attributes = [...e.target.attributes]

      for (var attr in attributes) {
        objAttributes[attributes[attr].name] = attributes[attr].value
      }

      ipcRenderer.sendToHost('element-clicked', {
        uniqueSelector: uniqueSelector,
        target: {
          tagName: e.target.tagName,
          attributes: objAttributes
        }
      })
    }
  }, true)

  document.body.addEventListener('mouseout', function (e) {
    if (isSelectingElement) {
      console.log('mouse left', isSelectingElement)
      e.target.classList.remove(uniqueHoverCssClass)
    }
  })
})

function injectCss () {
  var node = document.createElement('style')
  node.innerHTML = 'html .' + uniqueHoverCssClass + ' { outline: 1px solid rgba(10,10,10,0.4) !important; outline-offset: -1px !important; box-shadow: inset 0 0 0 1000px rgba(105,171,253,.5) !important; }'
  document.body.appendChild(node)
}
