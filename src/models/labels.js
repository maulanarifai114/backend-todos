const { actionQuery } = require('../helpers/helper')

const todos = {
  createLabel: (data) => {
    return actionQuery('INSERT INTO labels SET ?', data)
  },
  getAllLabels: () => {
    return actionQuery('SELECT * FROM labels')
  },
  updateLabels: (data, id) => {
    return actionQuery(`UPDATE labels SET ? WHERE id = ${id}`, data)
  },
  deleteLabels: (id) => {
    return actionQuery(`DELETE FROM labels WHERE id IN (${id})`)
  },
}
module.exports = todos
