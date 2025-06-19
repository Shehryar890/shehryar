const mongoose = require('mongoose');


const appliedCouponSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon",
  },
  name: String,
  discountedValue: Number,
  type: String, // 'percentage' or 'fixed'
  discountApplied: Number, // actual amount discounted
//   code: {
//     type: String,
//     default: null,
//   },
});


 const cartItemSchema = new mongoose.Schema({



productId :{
    type: mongoose.Schema.Types.ObjectId,
    ref :'Product',
    required:true,
},
quantity:{
    type:Number,
    
    min:1
},
price:{
    type:Number,
    default:0
}

 })

 const cartScehma  = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
    },

    items:
        [
            cartItemSchema
        ],

        totalPrice:{
            type:Number,
            default:0,

        },

        status:{
            type:String ,
             enum:[
                "not placed"  , "Placed" , "pending"
             ],


             default:"not placed"

             
        },

         appliedCoupons: [appliedCouponSchema],

   

        

    


    

 },{timestamps:true})

 const CartItem = mongoose.model("cartItem" , cartItemSchema)


const Cart =  mongoose.model("Cart" , cartScehma) 





         module.exports=    {Cart
            ,
          CartItem
         }        
       