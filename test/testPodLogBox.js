const blessed = require('blessed')
const PodLogBox = require('../lib/widgets/PodLogBox')
const KubectlHistory = require('../lib/widgets/KubectlHistory')
const PodList = require('../lib/widgets/PodList')
const setupGlobalKeys = require('../lib/util/setupGlobalKeys')
const commonOptions = require('../lib/util/commonOptions')

var screen = blessed.screen({
  smartCSR: true
})
screen.title = 'my window title'

const pods = new PodList(Object.assign(commonOptions(), {
  top: '0',
  left: '0',
  height: '30%',
  width: '50%',
  label: 'Pods'
}))

const history = new KubectlHistory(Object.assign(commonOptions(), {
  top: '0',
  right: '0',
  height: '30%',
  width: '50%',
  label: 'Kubectl History'
}))

const logs = new PodLogBox(Object.assign(commonOptions(), {
  podName: 'arc-5dd6dd8b5b-bf4qb',
  containerName: 'arc',
  top: '30%',
  left: '0',
  height: '70%',
  label: 'Pod Logs'
}))

screen.append(history)
screen.append(pods)
screen.append(logs)

screen.key(['d'], function (ch, key) {
  logs.detach()
  screen.render()
})

screen.key(['a'], function (ch, key) {
  screen.append(logs)
  screen.render()
})

setupGlobalKeys(screen)

screen.render()
