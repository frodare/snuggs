const { box } = require('blessed')
const emitter = require('../util/emitter')

let buf = ' '

emitter.on('kubectl', cmd => {
  buf += cmd + '\n'
})

class KubectlHistory extends box {
  constructor (options) {
    super(options)

    // TODO find a better why to detect if the widget is attached
    this.on('attach', () => {
      this.attached = true
    })

    this.on('detach', () => {
      this.attached = false
    })

    emitter.on('kubectl', () => this.update())
  }

  update (cmd) {
    if (!this.attached) return
    this.setText(buf.trim())
    try {
      // TODO: try to figure out why this throws an error when page is too small
      this.setScrollPerc(100)
    } catch (err) {

    }
  }
}

module.exports = KubectlHistory
