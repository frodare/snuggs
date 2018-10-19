const ComponentBox = require('./ComponentBox')
const PodLogComponent = require('../components/PodLogComponent')

class PodLogBox extends ComponentBox {
  constructor (options) {
    super([PodLogComponent], options)
  }
}

module.exports = PodLogBox
