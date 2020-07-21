import React, { useEffect, useState } from 'react'
import blessed from 'blessed'
import { render } from 'react-blessed'
// import store from '../store'
// import { Provider, useDispatch } from 'react-redux'
import kubectlCmd from '../async/kubectlCmd'
import { useAsyncOp } from 'use-async-ops'
import * as names from '../async/names'

// import { useDispatch } from 'react-redux'
// import '../async'
// import * as actions from '../store/actions'

const podsProps = {
  top: '0',
  left: '0',
  height: '30%',
  width: '50%',
  label: 'Pods',
  focused: true
}

const historyProps = {
  top: '0',
  right: '0',
  height: '30%',
  width: '50%',
  label: 'Kubectl History'
}

const logsProps = {
  podName: 'arc-5dd6dd8b5b-bf4qb',
  containerName: 'arc',
  top: '30%',
  left: '0',
  height: '70%',
  label: 'Pod Logs'
}

const styleProps = {
  scrollable: true,
  keys: true,
  tags: true,
  mouse: true,
  scrollbar: {
    bg: 'blue',
    fg: 'white'
  },
  border: {
    type: 'line'
  },
  style: {
    selected: {
      bg: 'blue'
    },
    focus: {
      border: {
        type: 'line',
        fg: 'blue'
      }
    }
  }
}

let count = 0

const App = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(actions.getPods)
  // }, [dispatch])
  count++
  const { result, loading, error, call } = useAsyncOp({name: names.GET_PODS})


  const [pods, setPods] = useState('')

  useEffect(() => {
    //kubectlCmd('get pods -o json')().then(o => setPods(o))
    call()
  }, [])

  return (
    <>
      <box {...podsProps} {...styleProps}>{result || error}</box>
      <box {...historyProps} {...styleProps}>{count + '' + loading}</box>
      <box {...logsProps} {...styleProps}>{count}</box>
    </>
  )
}

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Snuggs - kubectl wrapper'
})

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))
screen.key(['tab'], () => screen.focusNext())
//screen.key(['r'], () => emitter.emit(eventCodes.LOAD_PODS))

render(<App />, screen)
