const express = require("express")
const router = express.Router();
const { createCoupon  }  = require( "../controller/coupon");
const { updateCoupon}= require( "../controller/coupon");


 router.post("/create" , createCoupon)
 router.patch("/update" , updateCoupon)


 module.exports = router;