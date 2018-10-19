const Box = require('blessed').box

class ComponentBox extends Box {
  constructor (components, options) {
    super(options)
    this.components = components.map(C => new C(this, options))
  }
}

module.exports = ComponentBox
