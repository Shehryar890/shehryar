const express= require("express")

const router = express.Router(); 


           
const {addtoCart} = require("../controller/cartlogic");

 router.post("/create" , addtoCart)

module.exports  = router