const Component = require('./Component')
const emitter = require('../util/emitter')
const events = require('../util/eventCodes')

class KubectlHistoryComponent extends Component {
  constructor (node, options) {
    super(node, options)
    this.buf = ''

    emitter.on(events.KUBECTL, cmd => {
      this.buf += cmd + '\n'
      this.update()
    })

    emitter.on(events.ERROR, err => {
      this.buf += '{red-fg}' + err + '{/red-fg}\n'
      this.update()
    })

    emitter.on(events.LOG, err => {
      this.buf += '{green-fg}' + err + '{/green-fg}\n'
      this.update()
    })
  }

  update () {
    if (!this.node.parent) return
    this.node.setContent(this.buf.trim())
    try {
      // TODO: try to figure out why this throws an error when page is too small
      this.node.setScrollPerc(100)
    } catch (err) {

    }
  }
}

module.exports = KubectlHistoryComponent
