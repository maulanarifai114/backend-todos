const { response, reject } = require('../../helpers/helper')
const { updateTodos } = require('../../models/todos')

exports.updateTodos = (req, res) => {
  let data = ''
  req.body.forEach((item) => {
    let items = `(${item.id}, ${item.label_id}, '${item.task}', ${item.completed}),`
    data += items
  })
  updateTodos(data.slice(0, data.length - 1))
    .then((result) =>
      result.affectedRows >= 1
        ? response(res, 'Success Update Todos', 200, null)
        : reject(res, null, 400, 'Failed Update Todos')
    )
    .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
}
