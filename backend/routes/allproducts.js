const express = require('express');
const router = express.Router();






const  {fetchAllProducts , 

    
    productDetailPage,
    categorysuggestion
   
 }   = require('../controller/allproducts');




router.get("/products" , fetchAllProducts );

router.get('/productdetails/:productId' , productDetailPage)
router.get('/similar/:productId' , categorysuggestion)
module.exports = router;