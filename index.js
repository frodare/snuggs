
const blessed = require('blessed')
const setupGlobalKeys = require('./lib/util/setupGlobalKeys')
const PodLogBox = require('./lib/widgets/PodLogBox')
const KubectlHistory = require('./lib/widgets/KubectlHistory')
const PodList = require('./lib/widgets/PodList')
const emitter = require('./lib/util/emitter')
const eventCodes = require('./lib/util/eventCodes')
require('./lib/util/podLoader')

// TODO create a events constant file
// TODO Pod Interaction box: logs or terminal
// TODO snuggs status next to pod in pod list for port forward or open terminal
// TODO edit config in EDITOR and apply it
// TODO quick edit for pod Image

var screen = blessed.screen({
  smartCSR: true
})
screen.title = 'Snuggs'

setupGlobalKeys(screen)

const pods = new PodList({
  top: '0',
  left: '0',
  height: '30%',
  width: '50%',
  label: 'Pods',
  focused: true
})

const history = new KubectlHistory({
  top: '0',
  right: '0',
  height: '30%',
  width: '50%',
  label: 'Kubectl History'
})

const logs = new PodLogBox({
  podName: 'arc-5dd6dd8b5b-bf4qb',
  containerName: 'arc',
  top: '30%',
  left: '0',
  height: '70%',
  label: 'Pod Logs'
})

emitter.emit(eventCodes.LOAD_PODS)

screen.append(history)
screen.append(pods)
screen.append(logs)
screen.render()
