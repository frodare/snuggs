
const blessed = require('blessed')
const log = require('./log')
const createPodsTable = require('./podsTable')
const setupGlobalKeys = require('./setupGlobalKeys')
const podDetails = require('./podDetails')

var screen = blessed.screen({
  smartCSR: true
})
screen.title = 'my window title'

log.build(screen)
podDetails.build(screen)
setupGlobalKeys(screen)

screen.append(log.getBox())
screen.append(createPodsTable(screen))

screen.render()
