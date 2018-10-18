const contrib = require('blessed-contrib')
const getPods = require('./getPods')
const { setName } = require('./podDetails')

module.exports = screen => {
  var table = contrib.table(
    { keys: true,
      fg: 'white',
      selectedFg: 'white',
      selectedBg: 'blue',
      interactive: true,
      label: 'Pods',
      top: '60',
      width: '30%',
      height: '30%',
      border: { type: 'line', fg: 'cyan' },
      columnSpacing: 2, // in chars
      columnWidth: [24, 6, 20] /* in chars */ })

  // allow control the table with the keyboard
  table.focus()

  const parseNameFromRow = row => {
    const m = row.match(/([^\s]+)\s/)
    return (m && m[1]) || ''
  }
  const handleSelect = row => setName(parseNameFromRow(row.getText()))

  table.rows.on('select', handleSelect)

  const selectName = pod => pod.metadata.name
  const selectAge = pod => pod.metadata.creationTimestamp || '?'
  const selectStatus = pod => pod.status.conditions.filter(c => c.type === 'Ready')[0].status || ''

  const formatPodRow = pod => [
    selectName(pod),
    selectStatus(pod),
    selectAge(pod)
  ]

  const update = pods => {
    table.setData({
      headers: [
        'Name',
        'Ready',
        'Started'
      ],
      data: pods.map(formatPodRow)
    })
    screen.render()
  }

  getPods().then(update)

  return table
}
