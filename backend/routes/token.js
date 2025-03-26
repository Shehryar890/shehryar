   const express = require('express');
   const router = express.Router();

   const {tokenChecking} = require('../controller/tokenchecking')


      router.get('/checking' , tokenChecking );

      module.exports = router;