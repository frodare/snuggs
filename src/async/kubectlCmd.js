const { promisify } = require('util')
const cp = require('child_process')
const exec = promisify(cp.exec)

const run = cmd => async params => {
  //console.log('start')
  const s = 'kubectl ' + cmd + (params ? ' ' + params : '')
  // emitter.emit(eventCodes.KUBECTL, s)
  //console.log(s)
  const { stdout } = await exec(s)
  //console.log(stdout)
  return stdout
}

module.exports = run
