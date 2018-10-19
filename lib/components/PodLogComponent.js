const Component = require('./Component')
const { spawn } = require('child_process')
const emitter = require('../util/emitter')
const eventCodes = require('../util/eventCodes')

// TODO: add toggle to stop auto scroll
// TODO: list all containers in pod and allow setting with numbers
// TODO: handle EOF when log times out
// TODO: allow copy paste
// TODO: emit kubect commands to log
// TODO: show loading icon
// TODO: save to file or clipboard

class PodLogComponent extends Component {
  constructor (node, options) {
    super(node, options)

    this.setPodName(options.podName)
    this.setContainerName(options.containerName)

    this.node.on('attach', () => {
      this.start()
    })

    this.node.on('detach', () => {
      this.stop()
    })
  }

  appendLogs (logs) {
    if (!this.node.parent) return
    this.node.pushLine(logs)
    try {
      this.node.setScrollPerc(100)
    } catch (err) {
      // TODO see if this catch can be removed
    }
    this.node.screen.render()
  }

  setPodName (pod) {
    if (!pod) throw new Error('options.podName required')
    this.podName = pod
  }

  setContainerName (container) {
    if (!container) throw new Error('options.containerName required')
    this.containerName = container
  }

  start () {
    if (this.logStream) {
      this.stop()
    }
    this.node.setText('')
    this.logStream = openLogStream(this.podName, this.containerName)
    this.logStream.stdout.on('data', data => this.appendLogs(s(data)))
    this.logStream.stderr.on('data', data => this.appendLogs('{red-fg}' + s(data) + '{/red-fg}'))
  }

  stop () {
    if (this.logStream) {
      this.logStream.kill()
      this.logStream = null
    }
  }
}

const s = s => (s + '').trim()

const openLogStream = (pod, container) => {
  const args = ['logs', pod, container, '-f', '--tail=1000']
  emitter.emit(eventCodes.KUBECTL, 'kubectl ' + args.join(' '))
  return spawn('kubectl', args)
}

module.exports = PodLogComponent
