const blessed = require('blessed')
const cmd = require('./kubectlCmd')
const { log } = require('./log')

let box
let logsBox
let screen
let loader
let podName

const build = screenIn => {
  screen = screenIn

  box = blessed.box({
    top: '60',
    right: '0',
    label: 'Details',
    width: '70%',
    height: '90%',
    tags: true,
    scrollable: true,
    focused: true,
    keys: true,
    mouse: true,
    border: {
      type: 'line'
    },
    scrollbar: {
      bg: 'blue'
    }
  })

  logsBox = blessed.box({
    top: '60',
    right: '0',
    label: 'Logs',
    width: '70%',
    height: '90%',
    tags: true,
    scrollable: true,
    focused: true,
    keys: true,
    mouse: true,
    border: {
      type: 'line'
    },
    scrollbar: {
      bg: 'blue'
    }
  })

  const detailsButton = blessed.button({
    content: 'Details',
    top: 2,
    right: 8,
    shrink: true,
    style: {
      bg: 'blue',
      focus: {
        bg: 'red'
      },
      hover: {
        bg: 'red'
      }
    }
  })

  const logsButton = blessed.button({
    content: 'Logs',
    top: 2,
    right: 2,
    shrink: true,
    style: {
      bg: 'blue',
      focus: {
        bg: 'red'
      },
      hover: {
        bg: 'red'
      }
    }
  })

  loader = blessed.loading({
    top: '0',
    left: '0'
  })

  box.append(loader)
  screen.append(detailsButton)
  screen.append(logsButton)
  screen.append(box)
  screen.append(logsBox)

  logsBox.hide()

  logsButton.on('click', () => {
    box.hide()
    logsBox.show()
    screen.render()
    pullLogs(podName)
  })

  detailsButton.on('click', () => {
    logsBox.hide()
    box.show()
    screen.render()
  })

  return box
}

const pullLogs = name => {
  const spawn = require('child_process').spawn
  log('{bold}RUN{/bold} kubectl logs ' + name + ' count -f')
  const cmd = spawn('kubectl', ['logs', name, 'count', '-f'])
  cmd.stdout.on('data', function (data) {
    // logsBox.pushLine(data)
    logsBox.setText(data + '')
    logsBox.setScrollPerc(100)
    screen.render()
  })

  cmd.stderr.on('data', function (data) {
    // logsBox.pushLine(data)
    logsBox.setText(data + '')
    logsBox.setScrollPerc(100)
    screen.render()
  })

  cmd.on('exit', function (code) {
    log('logs for ' + name + ' closed')
  })
}

const setName = async name => {
  podName = name
  box.setText('')
  loader.load()
  const s = await cmd('describe pod ' + name)
  loader.stop()
  box.setText(s)
  screen.render()
}

module.exports = {
  build,
  setName
}
