const express = require('express');
const router = express.Router();
const labels = require('./labels');
const todos = require('./todos');
const auth = require('./auth');
const admin = require('./admin');

router
  .use('/labels', labels)
  .use('/todos', todos)
  .use('/auth', auth)
  .use('/admin', admin);

module.exports = router;
