const List = require('blessed').list

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
    selected: {
      bg: 'blue'
    },
    focus: {
      border: {
        type: 'line',
        fg: 'blue'
      }
    }
  }
})

class ComponentList extends List {
  constructor (components, options) {
    const o = Object.assign(baseOptions(), options)
    super(o)
    this.components = components.map(C => new C(this, o))
  }
}

module.exports = ComponentList
