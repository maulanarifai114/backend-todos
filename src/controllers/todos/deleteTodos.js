const { response, reject } = require('../../helpers/helper')
const { deleteTodos } = require('../../models/todos')

exports.deleteTodos = (req, res) => {
  const id = req.body
  deleteTodos(id.join())
    .then(() => response(res, 'Success Delete Todos', 200, null))
    .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
}
