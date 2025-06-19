const express= require("express")

const router = express.Router(); 


           
const {addtoCart , getCart , deleteProduct ,deleteFromCart, clearCart} = require("../controller/cartlogic");

 router.post("/create" , addtoCart)

 router.get("/get/:userid" , getCart)

router.delete("/delete/:productId/:userid", deleteFromCart);

router.put("/clear", clearCart )
 router.patch("/remove" , deleteProduct)

 

module.exports  = router