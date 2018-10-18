const { promisify } = require('util')
const cp = require('child_process')
const exec = promisify(cp.exec)
const { log } = require('./log')

const run = async cmd => {
  const s = 'kubectl ' + cmd
  log('{bold}RUN{/bold} ' + s)
  const { stdout } = await exec(s)
  return stdout
}

module.exports = run
