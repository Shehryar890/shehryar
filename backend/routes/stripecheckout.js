const  { setstripeCheckout  , webhookchecking}  = require( '../controller/stripecheckout');
const express = require("express")
 const router = express.Router()
 const bodyParser  = require("body-parser")




  router.post("/createcheckoutpage"  , setstripeCheckout)

  router.post("/webhook ", bodyParser.raw({type:'application/json'}) , webhookchecking )



  module.exports = router