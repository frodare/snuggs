const { promisify } = require('util')
const cp = require('child_process')
const exec = promisify(cp.exec)
const emitter = require('../util/emitter')
const eventCodes = require('../util/eventCodes')

const run = async cmd => {
  const s = 'kubectl ' + cmd
  emitter.emit(eventCodes.KUBECTL, s)
  const { stdout } = await exec(s)
  return stdout
}

module.exports = run
