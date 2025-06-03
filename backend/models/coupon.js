


   const mongoose  = require("mongoose")
                            

    const couponSchema = new mongoose.Schema({
          code:{
            type:String, 
            unique:true,
 


          } ,         
        type:{
         type:String,
         enum:["percentage" , "flat"]
        },

        
        discountedValue:{
            type:Number,
             default :0,
             min:0,   


        },

   
expiresAt:{
type:Date,

default : ()=>{
const d = new Date();
(d.setDate(d.getDate()+7));
return d
}
},
isActive:{
type:Boolean,
default:false
}
,

maxperuser:{
type:Number,
default :1
},


usedBy:{
  type:[mongoose.Types.ObjectId],
  ref:"User",
  default:[],
},


maxUses:{
    type:Number,
    default:1
},


 

   applicableCategory:{
   type:[String],
   default:[],

   },
   isFirstLogin :{


              type:Boolean,
              default:false



   },


   isShippingDiscount:{
    type:Boolean,
    default:false
   },

     mincartValue:{
      type:Number,
      default:0
     }
,


name:{
  type:String,


},


isWelcomeback:{
  type:Boolean,
  defaut:false
}

   


            
            

            
 
            




    },{timestamps:true})

    const Coupon = mongoose.model("Coupon " , couponSchema)


    module.exports =
      Coupon
    