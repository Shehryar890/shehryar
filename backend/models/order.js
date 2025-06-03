const mongoose = require("mongoose")
 const  { CartItem }  =  require("./cartSchema")
 const  User  =  require("./user")

 const shippingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true, // You can make required based on your use-case
    trim: true
  },
  phoneNo: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  instructions: {
    type: String,
    default: ''
  }
});
       const OrderScehma = new mongoose.Schema({
                            
                          userId:{
                            type: mongoose.Types.ObjectId,

                            ref:"User",
unique:true,
                          },

                          cartItems :[CartItem.schema],
                          totalPrice:{
                            type:Number,
                            default:0
                          },
                          shippingAdress:shippingSchema,
                          isPaid:{
                            type:Boolean,
                            default:false
                          },
                        paymentMethod:{
                          type:String,
                          enum:["Cod","Online"],
                          default:"Cod"
                        },
                        status:{
                          type:String,
                          enum:["notPlaced" , "placed" , "processing" , "shipped","cancelled", "delivered"],
                          default:"notPlaced",
                        },
                        paymentStatus:{
                          type:String,
                          enum:["notpaid", "Paid" ,"refunded"],
                          default:"pending"
                        }

                          

                          

       }, {timestamps:true})


      const Order = mongoose.model("Order" , OrderScehma)


      module.exports = Order
        
