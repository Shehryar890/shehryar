const express = require('express')
const router = express.Router();
  const {userMessage} = require('../controller/contact')

  router.post('/', userMessage);

  module.exports = router;