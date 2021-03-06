const { actionQuery } = require('../helpers/helper')

const todos = {
  getAllUsers: (id) => {
    return actionQuery(`SELECT * FROM users WHERE id != ${id}`)
  },
  updateUsers: (data, id) => {
    return actionQuery(`UPDATE users SET ? WHERE id = ${id}`, data)
  },
  confirmUsers: (id) => {
    return actionQuery(`UPDATE users SET confirmed = 1 WHERE id IN (${id})`)
  },
  deleteUsers: (id) => {
    return actionQuery(`DELETE FROM users WHERE id IN (${id})`)
  },
}
module.exports = todos
