const { box } = require('blessed')
const { spawn } = require('child_process')

class PodLogBox extends box {
  constructor (options) {
    super(options)
    this.setPodName('counter')
    this.setContainerName('count')

    this.on('click', () => {
      this.start()
    })

    this.on('attach', () => {
      this.attached = true
      this.start()
    })

    this.on('detach', () => {
      this.attached = false
      this.stop()
    })
  }

  appendLogs (logs) {
    if (this.attached) {
      const stayAtBottom = this.getScrollPerc() === 100
      this.pushLine((logs + '').trim())
      if (stayAtBottom) this.setScrollPerc(100)
      this.screen.render()
    }
  }

  setPodName (pod) {
    this.podName = pod
  }

  setContainerName (container) {
    this.containerName = container
  }

  start () {
    if (this.logStream) {
      this.stop()
    }
    this.setText('')
    this.logStream = openLogStream(this.podName, this.containerName)
    this.logStream.stdout.on('data', data => this.appendLogs(data))
    this.logStream.stderr.on('data', data => this.appendLogs('{bold}' + data + '{/bold}'))
  }

  stop () {
    if (this.logStream) {
      this.logStream.kill()
      this.logStream = null
    }
  }
}

const openLogStream = (pod, container) => spawn('kubectl', ['logs', pod, container, '-f', '--tail=1000'])

module.exports = PodLogBox
