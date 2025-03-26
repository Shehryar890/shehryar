const express = require("express");
const router = express.Router();
const{ getFeaturedItems} = require('../controller/salefeatures');
const {getSaleItems} = require('../controller/salefeatures');


         router.get('/' , getFeaturedItems );
         router.get('/sale', getSaleItems);

         module.exports = router;