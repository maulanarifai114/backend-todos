const express = require('express')
const router = express.Router()
const { verifyAccess } = require('../middleware/verifyAccess')
const { createTodo } = require('../controllers/todos/createTodo')
const { getAllTodo } = require('../controllers/todos/getAllTodos')
const { updateTodos } = require('../controllers/todos/updateTodos')
const { deleteTodos } = require('../controllers/todos/deleteTodos')

router
  .post('/', verifyAccess, createTodo)
  .get('/', verifyAccess, getAllTodo)
  .patch('/', verifyAccess, updateTodos)
  .delete('/', verifyAccess, deleteTodos)
module.exports = router
