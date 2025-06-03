  

  const express = require('express');
  const bodyParser = require("body-parser")
 
const { cashOndeliveryOrder ,  }  = require( '../controller/order');
const authenticate  = require( '../middlerwares/auth');


    const router= express.Router();
 
                router.post("/createcod" , authenticate , cashOndeliveryOrder)


             

    
    module.exports = router;