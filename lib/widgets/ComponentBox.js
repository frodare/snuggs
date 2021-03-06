const Box = require('blessed').box

const baseOptions = () => ({
  scrollable: true,
  keys: true,
  tags: true,
  mouse: true,
  border: {
    type: 'line'
  },
  scrollbar: {
    bg: 'blue',
    fg: 'white'
  },
  style: {
    focus: {
      border: {
        type: 'line',
        fg: 'blue'
      }
    }
  }
})

class ComponentBox extends Box {
  constructor (components, options) {
    const o = Object.assign(baseOptions(), options)
    super(o)
    this.components = components.map(C => new C(this, o))
  }
}

module.exports = ComponentBox
