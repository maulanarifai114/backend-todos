const express = require('express')
const router = express.Router()
const { verifyAccess } = require('../middleware/verifyAccess')
const { createUser } = require('../controllers/admin/createUser')
const { getAllUsers } = require('../controllers/admin/getAllUsers')
const { confirmUsers } = require('../controllers/admin/confirmUser')
const { updateUsers } = require('../controllers/admin/updateUsers')
const { deleteUsers } = require('../controllers/admin/deleteUsers')

router
  .get('/', verifyAccess, getAllUsers)
  .post('/', verifyAccess, createUser)
  .patch('/confirm', verifyAccess, confirmUsers)
  .patch('/user', verifyAccess, updateUsers)
  .delete('/', verifyAccess, deleteUsers)
module.exports = router
