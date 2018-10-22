const Component = require('./Component')
const { spawn } = require('child_process')
const emitter = require('../util/emitter')
const eventCodes = require('../util/eventCodes')
const podLoader = require('../util/podLoader')

// TODO: add toggle to stop auto scroll
// TODO: list all containers in pod and allow setting with numbers
// TODO: handle EOF when log times out
// TODO: allow copy paste
// TODO: emit kubect commands to log
// TODO: show loading icon
// TODO: save to file or clipboard
// TODO: add filter to logs
// TODO: only allow log to get to a certian length

const log = m => emitter.emit(eventCodes.LOG, m)

class PodLogComponent extends Component {
  constructor (node, options) {
    super(node, options)

    // this.setPodName(options.podName)
    // this.setContainerName(options.containerName)

    this.node.on('attach', () => {
      this.start()
    })

    this.node.on('detach', () => {
      this.stop()
    })

    emitter.on(eventCodes.POD_UPDATED, () => {
      const p = podLoader.getSelectedPod()
      const c = podLoader.getSelectedContainer()
      if (!p || !c) return
      this.setPodName(p.metadata.name, c.name)
      this.start()
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

  setPodName (pod, container) {
    this.podName = pod
    this.containerName = container
  }

  start () {
    if (this.logStream) {
      this.stop()
    }
    this.node.setText('')
    if (!this.podName || !this.containerName) {
      return
    }
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
