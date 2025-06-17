const express= require("express")

const router = express.Router(); 


           
const {addtoCart , getCart , deleteProduct , clearCart} = require("../controller/cartlogic");

 router.post("/create" , addtoCart)

 router.get("/get/:userid" , getCart)

 router.delete("/remove/:productId" , deleteProduct)
router.put("/clear", clearCart )
 router.patch("/remove" , deleteProduct)

 

module.exports  = router