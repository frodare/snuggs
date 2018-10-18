const blessed = require('blessed')

let box
let screen

const build = screenIn => {
  screen = screenIn
  box = blessed.box({
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
  return box
}

const log = s => {
  box.pushLine(s)
  box.setScrollPerc(100)
  screen.render()
}

const getBox = () => box

module.exports = {
  build,
  getBox,
  log
}
