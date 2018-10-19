const blessed = require('blessed')
const PodLogBox = require('../lib/widgets/PodLogBox')
const KubectlHistory = require('../lib/widgets/KubectlHistory')
const setupGlobalKeys = require('../lib/util/setupGlobalKeys')
const commonOptions = require('../lib/util/commonOptions')

var screen = blessed.screen({
  smartCSR: true
})
screen.title = 'my window title'

const logs = new PodLogBox(Object.assign(commonOptions(), {
  podName: 'dropbox-575fd68d5f-69mdc',
  containerName: 'dropbox',
  top: '30%',
  left: '0',
  height: '70%',
  label: 'Pod Logs'
}))

const history = new KubectlHistory(Object.assign(commonOptions(), {
  top: '0',
  left: '0',
  height: '30%',
  label: 'Kubectl History'
}))

screen.append(history)
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
