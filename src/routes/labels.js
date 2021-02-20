const express = require('express')
const router = express.Router()
const { verifyAccess } = require('../middleware/verifyAccess')
const { createLabel } = require('../controllers/labels/createLabel')
const { getAllLabels } = require('../controllers/labels/getAllLabels')
const { updateLabels } = require('../controllers/labels/updateLabels')
const { deleteLabels } = require('../controllers/labels/deleteLabels')

router
  .post('/', verifyAccess, createLabel)
  .get('/', verifyAccess, getAllLabels)
  .patch('/', verifyAccess, updateLabels)
  .delete('/', verifyAccess, deleteLabels)
module.exports = router
