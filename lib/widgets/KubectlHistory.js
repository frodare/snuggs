const ComponentBox = require('./ComponentBox')
const KubectlHistoryComponent = require('../components/KubectlHistoryComponent')

class KubectlHistory extends ComponentBox {
  constructor (options) {
    super([KubectlHistoryComponent], options)
  }
}

module.exports = KubectlHistory
