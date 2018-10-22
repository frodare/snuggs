const emitter = require('./emitter')
const eventCodes = require('./eventCodes')
const kubectlCmd = require('./kubectlCmd')

let details = []
let summary = []
let selectedPod = null
let selectedContainer = null

const loadSummary = async (ns) => {
  try {
    const result = await kubectlCmd('get pods -o wide')
    const pods = result.split(/\n/)
    pods.shift()
    summary = pods
    emitter.emit(eventCodes.LOADED_POD_SUMMARY, pods)
  } catch (err) {
    emitter.emit(eventCodes.ERROR, err)
  }
}

const loadDetails = async (ns) => {
  try {
    const json = await kubectlCmd('get pods -o json')
    details = JSON.parse(json).items
    emitter.emit(eventCodes.LOADED_POD_DETAILS, details)
  } catch (err) {
    emitter.emit(eventCodes.ERROR, err)
  }
}

emitter.on(eventCodes.LOAD_PODS, () => {
  loadSummary()
  loadDetails()
})

const hasPodName = name => pod => pod.metadata.name === name

emitter.on(eventCodes.SET_POD, podName => {
  if (!details || !details.length) return
  selectedPod = getSelectedPodFromName(podName)
  selectedContainer = getFirstContainerfromPod(selectedPod)
  emitter.emit(eventCodes.POD_UPDATED)
})

const getSelectedPodFromName = podName => {
  const filtered = details.filter(hasPodName(podName))
  return filtered.length ? filtered[0] : null
}

const getFirstContainerfromPod = pod => pod.spec.containers[0]

module.exports = {
  getDetails: () => details,
  getSummary: () => summary,
  getSelectedPod: () => selectedPod,
  getSelectedContainer: () => selectedContainer
}
