const kubectlCmd = require('./lib/util/kubectlCmd')

const getPods = async (ns) => {
  const json = await kubectlCmd('get pods -o json')
  const out = JSON.parse(json)
  return out.items
}

module.exports = getPods
