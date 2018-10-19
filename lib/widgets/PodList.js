const ComponentList = require('./ComponentList')
const PodListComponent = require('../components/PodListComponent')

class PodList extends ComponentList {
  constructor (options) {
    super([PodListComponent], options)
  }
}

module.exports = PodList
