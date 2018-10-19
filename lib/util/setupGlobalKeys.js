const emitter = require('./emitter')
const eventCodes = require('./eventCodes')

module.exports = screen => {
  screen.key(['escape', 'q', 'C-c'], () => process.exit(0))
  screen.key(['tab'], () => screen.focusNext())
  screen.key(['r'], () => emitter.emit(eventCodes.LOAD_PODS))
}
