
module.exports = screen => {
  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0)
  })

  screen.key(['tab'], function (ch, key) {
    screen.focusNext()
  })
}
