
const blessed = require('blessed')
const PodLogBox = require('./PodLogBox')
const setupGlobalKeys = require('./setupGlobalKeys')

var screen = blessed.screen({
  smartCSR: true
})
screen.title = 'my window title'

const logs = new PodLogBox({
  top: '35%',
  left: '0',
  label: 'JS Logs',
  width: '30%',
  height: '30%',
  tags: true,
  scrollable: true,
  focused: true,
  keys: true,
  mouse: true,
  border: {
    type: 'line'
  },
  scrollbar: {
    bg: 'blue'
  }
})

screen.append(logs)

screen.key(['d'], function (ch, key) {
  logs.detach()
  screen.render()
})

screen.key(['a'], function (ch, key) {
  screen.append(logs)
  screen.render()
})

setupGlobalKeys(screen)

screen.render()
