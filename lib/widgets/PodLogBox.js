const { box, line } = require('blessed')
const { spawn } = require('child_process')
const emitter = require('../util/emitter')

// TODO: add toggle to stop auto scroll
// TODO: list all containers in pod and allow setting with numbers
// TODO: handle EOF when log times out
// TODO: allow copy paste
// TODO: emit kubect commands to log
// TODO: show loading icon

class PodLogBox extends box {
  constructor (options) {
    super(options)

    this.setPodName(options.podName)
    this.setContainerName(options.containerName)

    this.on('attach', () => {
      this.attached = true
      // this.screen.append(l)
      this.start()
    })

    this.on('detach', () => {
      this.attached = false
      this.stop()
    })

    // const lo = {
    //   orientation: 'horizontal',
    //   fg: 'blue',
    //   bg: 'blue',
    //   top: options.top,
    //   left: options.left,
    //   width: options.width
    // }

    // const l = new line(lo)
  }

  appendLogs (logs) {
    if (this.attached) {
      this.pushLine(logs)
      this.setScrollPerc(100)
      this.screen.render()
    }
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
    this.setText('')
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
  emitter.emit('kubectl', 'kubectl ' + args.join(' '))
  return spawn('kubectl', args)
}

module.exports = PodLogBox
