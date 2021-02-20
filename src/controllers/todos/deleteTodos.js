const { response, reject } = require('../../helpers/helper')
const { deleteTodos } = require('../../models/todos')

exports.deleteTodos = (req, res) => {
  deleteTodos(req.body.join())
    .then((result) =>
      result.affectedRows >= 1
        ? response(res, 'Success Delete Todos', 200, null)
        : reject(res, null, 400, 'Failed Delete Todos')
    )
    .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
}
