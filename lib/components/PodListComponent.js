const Component = require('./Component')
const emitter = require('../util/emitter')
const eventCodes = require('../util/eventCodes')
const pods = require('../util/podLoader')

// TODO add a filter to pod list

class PodLogComponent extends Component {
  constructor (list, options) {
    super(list, options)
    this.node.on('select', item => emitter.emit(eventCodes.SET_POD, parseNameFromRow(item.getText())))
    this.node.on('attach', () => this.update())
    emitter.on(eventCodes.LOADED_POD_SUMMARY, () => this.update())
  }

  update () {
    if (!pods.getSummary().length) return
    // TODO figure out how to clear the list when set with empty array
    this.node.setItems(pods.getSummary())
    if (pods.getSummary().length) {
      this.node.select(0)
    }
    this.node.screen.render()
  }
}

const parseNameFromRow = row => {
  const m = row.match(/([^\s]+)\s/)
  return (m && m[1]) || ''
}

module.exports = PodLogComponent
