const { box } = require('blessed')
const emitter = require('../util/emitter')

class PodBox extends box {
  constructor (options) {
    super(options)

    this.setPodName(options.podName)
    this.setContainerName(options.containerName)

    this.on('attach', () => {
      this.start()
    })

    this.on('detach', () => {
      this.stop()
    })
  }

  start () {

  }

  stop () {

  }
}

module.exports = PodBox
