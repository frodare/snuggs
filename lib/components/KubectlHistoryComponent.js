const Component = require('./Component')
const emitter = require('../util/emitter')

class KubectlHistoryComponent extends Component {
  constructor (node, options) {
    super(node, options)
    this.buf = ''
    emitter.on('kubectl', cmd => {
      this.buf += cmd + '\n'
      this.update()
    })
  }

  update () {
    if (!this.node.parent) return
    this.node.setText(this.buf.trim())
    try {
      // TODO: try to figure out why this throws an error when page is too small
      this.node.setScrollPerc(100)
    } catch (err) {

    }
  }
}

module.exports = KubectlHistoryComponent
