const { actionQuery } = require('../helpers/helper')

const todos = {
  createTodo: (data) => {
    return actionQuery('INSERT INTO todos SET ?', data)
  },
  getAllTodos: (id) => {
    return actionQuery(
      `
      SELECT todos.id, todos.completed, task, label, description, color FROM todos
      INNER JOIN labels ON labels.id = todos.label_id
      WHERE todos.user_id = ${id}`
    )
  },
  updateTodos: (data) => {
    return actionQuery(
      `
      INSERT INTO todos (id, label_id, task, completed)
      VALUES ${data}
      ON DUPLICATE KEY UPDATE 
      id = VALUES(id),
      label_id = VALUES(label_id),
      task = VALUES(task),
      completed = VALUES(completed)`
    )
  },
  deleteTodos: (id) => {
    return actionQuery(`DELETE FROM todos WHERE id IN (${id})`)
  },
}
module.exports = todos
