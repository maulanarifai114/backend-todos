const { response, reject } = require("../../helpers/helper")
const { getAllTodos } = require("../../models/todos")

exports.getAllTodo = (req, res) => {
  getAllTodos(req.id)
    .then((result) =>
      result.length === 0
        ? response(res, "Todos is empty", 200, null)
        : response(res, result, 200, null)
    )
    .catch((err) => reject(res, null, 500, { msg: "Database is error", err }))
}
