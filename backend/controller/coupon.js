const Coupon  = require( "../models/coupon")
 const createCoupon = async(req , res)=>{
try{
 const {coupon} = req.body

if(!coupon){
    return res.status(400).json({
        success:false,
        messge:"error coupon cant be empty"
    })
}

if(!coupon.code){
  return res.json({
    success:false,
    message:"code is required "
  })
}
            
 const couponObj = new Coupon(coupon)

        await couponObj.save();

        return res.json({
            succes:true,
            message:"Coupon created Succesfully"
        })


}
catch(error){
    console.log(error.message)
}








 }

 const updateCoupon = async (req, res) => {
    const { coupon } = req.body;
    const { id } = req.params; 
  
    try {
    
      const existingCoupon = await Coupon.findOne({ _id: id });
  
      if (existingCoupon) {
       
        if (coupon.code !== undefined) existingCoupon.code = coupon.code;
        if (coupon.type !== undefined) existingCoupon.type = coupon.type;
        if (coupon.discountedValue !== undefined) existingCoupon.discountedValue = coupon.discountedValue;
        if (coupon.expiresAt !== undefined) existingCoupon.expiresAt = coupon.expiresAt;
        if (coupon.isActive !== undefined) existingCoupon.isActive = coupon.isActive;
        if (coupon.maxperuser !== undefined) existingCoupon.maxperuser = coupon.maxperuser;
        if (coupon.maxUses !== undefined) existingCoupon.maxUses = coupon.maxUses;
        if (coupon.isAutomatic !== undefined) existingCoupon.isAutomatic = coupon.isAutomatic;
        if (coupon.applicableCategory !== undefined) existingCoupon.applicableCategory = coupon.applicableCategory;
        if (coupon.isFirstLogin !== undefined) existingCoupon.isFirstLogin = coupon.isFirstLogin;
        if (coupon.isShippingDiscount !== undefined) existingCoupon.isShippingDiscount = coupon.isShippingDiscount;
        if (coupon.mincartValue !== undefined) existingCoupon.mincartValue = coupon.mincartValue;
        if (coupon.name !== undefined) existingCoupon.name = coupon.name;
  
        // Save the updated coupon to the database
        await existingCoupon.save();
  
        return res.json({
          success: true,
          message: "Coupon updated successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "The coupon doesn't exist",
        });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }








































  };


  const getcoupon = async (req,res)=>{
          
                         
    const coupons = await Coupon.find({})

    if(!coupons){
     return res.json({
       success:false,
       message:"No coupons here"
     })
    }
    else{


     return res.status(200).json({
       success:true,
       message:"Coupens comes" , coupons
     })
    }

}
const deletecoupon = async(req,res)=>{
  const {id} = req.params;

try{
    const istrue = await Coupon.findOneAndDelete({_id:id})

    if(istrue){
      return res.status(200).json({
        succes:true,
        message:"Item deleted succesfully",




      }

      )
    }
    else{
      return res.status(400).json({
        success:false,
        message:"item not found"
      })
    }
  }
  catch(error){
    console.log(error.message)
  }
}
  module.exports={
    createCoupon,
    updateCoupon ,
    deletecoupon,
    getcoupon,
 
  }
  




//Alternate approach for updating things///
//   const updateCoupon = async (req, res) => {
//     const { coupon } = req.body;
//     const { id } = req.params;
  
//     try {
//       // Use findByIdAndUpdate to update the coupon
//       const updatedCoupon = await Coupon.findByIdAndUpdate(
//         id, 
//         { $set: coupon },  // Only update fields in the coupon object that are passed in the request
//         { new: true } // Return the updated document
//       );
  
//       if (updatedCoupon) {
//         return res.json({
//           success: true,
//           message: "Coupon updated successfully",
//           updatedCoupon,
//         });
//       } else {
//         return res.status(404).json({
//           success: false,
//           message: "The coupon doesn't exist",
//         });
//       }
//     } catch (error) {
//       console.error(error.message);
//       return res.status(500).json({
//         success: false,
//         message: "Something went wrong, please try again later.",
//       });
//     }
//   };
  