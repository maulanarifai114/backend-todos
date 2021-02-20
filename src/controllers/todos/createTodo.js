const { response, reject } = require('../../helpers/helper')
const { createTodo } = require('../../models/todos')

exports.createTodo = (req, res) => {
  const userId = req.id
  const { labelId, task } = req.body
  createTodo({ user_id: userId, label_id: labelId, task })
    .then((result) => {
      result.affectedRows >= 1
        ? response(res, 'Success Create Todo', 201, null)
        : reject(res, null, 400, 'Failed Create Todo')
    })
    .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
}
