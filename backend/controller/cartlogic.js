
const User = require("../models/user")
const {Cart} = require("../models/cartSchema")
const Product = require("../models/product")
const  Coupon = require("../models/coupon")
const mongoose = require("mongoose")


                   function calculatePrice (items){
                                                     
                                  return           parseFloat( items.reduce((accumulator , item)=>{
                              


                                              return accumulator +item.price 
                                             },0) )   
                       }


                   async    function checkandapplycoupon (totalPrice , userid){
                   
                    
                    const coupons = await Coupon.find({
                      isActive:true,
                    
  maxUses: { $gt: 0 },
  usedBy: { $ne: userid },
  $or: [
    { isFirstLogin: true },
    { isShippingDiscount: true },
    { isWelcomeback:true }
  ]

                    })
                    console.log(coupons)
                    const user  = await User.findOne({
                      _id:
                        userid
                      
                    })
                    console.log(user)
                    const currentDate = new Date();
                    const twoMonthsAgo = new Date(currentDate);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

let totalDiscount= 0;
                              coupons.forEach((coupon)=>{
                                let discount = 0;


                                if(coupon.isFirstLogin && user.hasLoggedIn === false ){
                                  if(coupon.type ==="percentage"){

                                           discount =    (  totalPrice *(coupon.discountedValue)/100)
                                           totalDiscount +=parseFloat(discount.toFixed(2))
                                  
                                          
                                        }
                                          else{
                                            discount = totalPrice - coupon.discountedValue
                                          }

                                }
                                if(coupon.isShippingDiscount && coupon.mincartValue <totalPrice){
                                  if(coupon.type ==="percentage"){

                                    discount =    (  totalPrice *(coupon.discountedValue)/100)
                                    totalDiscount +=parseFloat(discount.toFixed(2))
                         
                                  
                                  }
                                   else{
                                     discount = totalPrice - coupon.discountedValue
                                     totalDiscount +=parseFloat(discount.toFixed(2))
                               

                                   }
                                       
                                }
                                if(coupon.isWelcomeback && user.lastActiveDate <=twoMonthsAgo ){

                                       

                                  if(coupon.type ==="percentage"){

                                    discount =    (  totalPrice *(coupon.discountedValue)/100)
                                    totalDiscount +=parseFloat(discount.toFixed(2))
                                 
                                  
                                  }
                                   else{
                                     discount = totalPrice - coupon.discountedValue
                                   totalDiscount +=parseFloat(discount.toFixed(2))

                                   }



                                }


                            
                              })

                                       const getprice =  totalPrice-totalDiscount;

                                  const finalPrice =      Math.max(0 , getprice)
                                  return finalPrice
                              
                       }
                          
          const addtoCart = async (req,res)=>{
const session = await mongoose.startSession()


                       const {userID , productID} = req.body;

                       const productexists = await  Product.findById(productID)
                       const discountedPrice =productexists.discount || productexists.price
let totalPrice = 0;

                       try{

                        session.startTransaction()
                      


                        const user = await  Cart.findOne({userId:userID}).populate("items.productId").session(session);

                            if(user){ 
                              
                               const existingItem = await user.items.find(item=>
                            item.productId.equals(productID)
                               )

                                     if(existingItem){

                                      existingItem.quantity+=1;
                                      existingItem.price = discountedPrice* existingItem.quantity
                                      totalPrice = calculatePrice(user.items);
                                      if (isNaN(totalPrice)) {
                                          totalPrice = 0; // Fallback if totalPrice is NaN
                                      }
                       
await user.save({session});


                                     }
else{

                       user.items.push({
                        productId: productID,
                        quantity:1,
                        price:discountedPrice*1
                       })
                       await user.populate("items.productId")

                       totalPrice = calculatePrice(user.items);
                       if (isNaN(totalPrice)) {
                           totalPrice = 0; // Fallback if totalPrice is NaN
                       }

                      
                       await user.save({session});
                      
                      
}




user.totalPrice = totalPrice;
await user.save({session});

    
  
                            }
                            else{

                          const cart = new Cart({
                          userId:userID,

                        items:[
                           {
                              productId:productID,
                              quantity:1,
                              price:discountedPrice*1
                           }
                        ]
                            
                          })
                          await cart.save({session});
                          await cart.populate("items.productId");
                          cart.totalPrice = calculatePrice(cart.items);
                          if (isNaN(cart.totalPrice)) {
                            totalPrice = 0; // Fallback if totalPrice is NaN
                          }

                          await cart.save({session});
                          



                            }


                           
                            const userincart = await Cart.findOne({userId:userID}).session(session);
                            if(userincart){
                                                 const finalpriceafter = userincart.totalPrice
                                                 const userid = userincart.userId    
                               userincart.totalPrice = await  checkandapplycoupon(finalpriceafter,userid)
                               await userincart.save({session})

                               

                            }
                            await session.commitTransaction();
                            session.endSession();

                            return res.json({
                              success:true,
                              message:"successfully done"
                            })

                                      
                                            
                        
                        
                      } catch (error) {
                        session.abortTransaction()
                        session.endSession()
                          console.log(error.message);
                          return res.status(500).json({ success: false, message: "Internal Server Error" });
                      }








          }



                      const validateandapplyCoupon =async (req,res)=>{
                        const{usercode , userId} = req.body;


                         const coupon = await Coupon.findOne({
                          isActive:true,
                          usedBy:{$ne:userId},
                          maxUses:{$gt:0},
                          code :usercode,
                          


                         })
                         const user = await Cart.findOne({userId:userId})
                                const totalcart =   user.totalPrice;

                                let discount = 0;

                                let aftercodecoupon = 0
const date = new Date()
                          

                          if(coupon && coupon.expiresAt >date){
                            if(coupon.type ==="percentage"){
                              discount = totalcart *(coupon.discountedValue/100)
aftercodecoupon +=discount
                            }
                            else{
                              discount = totalcart-coupon.discountedValue
                              aftercodecoupon+=discount
                            }
                            
                              const finalPrice = totalcart-aftercodecoupon;
                              
                              user.totalPrice = finalPrice

                              coupon.usedBy.push(userId)
                              coupon.maxUses -1;
                              await coupon.save()
                              await user.save()
                             

                          }

                          else{

                            return res.json({
                              success:false,
                              message:"your code is invalid"
                            })
                          }
                      }

          const getCart = async (req,res)=>{
            const {userid}=req.body;

               const usercart = await Cart.findOne({userId:userid}).populate("items.productId")


               if(!usercart){
                return res.json({
                  success:false,
                  message:"Your cart is empty"
                })
               }else{
                const items = usercart.items.map((item) => {
                  return {
                      name: item.productId?.name,            
                      price: item.price,                    
                      images: item.productId?.images[0],   
                      quantity: item.quantity,             
                  };
              });
                const total = usercart.totalPrice
                const userid = usercart.userId
                

                return res.json({
                total,
                userid,
                  items,
                  
                })
                
               }
          }
                      

                   const deleteProduct = async (req,res)=>{

                                          
                             const {userid , productID} = req.body;
                             const session= await mongoose.startSession()
try{
  session.startTransaction()
let totalprice = 0;
const productexists = await  Product.findById(productID).session(session)
                       const discountedPrice =productexists.discount || productexists.price
                             const user = await Cart.findOne({
                              userId:userid
                             })
if(!user){
  session.abortTransaction()
return res.json({
  success:false,
  message:"user not found"

})
}
else{


const exisitingitem  = await user.items.find(item=>item.productId.equals(productID))

if(exisitingitem.quantity<=1){
                
                         
 const cartitmes = user.items.filter(item=>item.productId != productID)

             user.items = cartitmes
            totalprice = calculatePrice(user.items)

          


            user.totalPrice = totalprice;

            await user.save({session})
          }
          else{

            exisitingitem.quantity -=1;
            exisitingitem.price = discountedPrice*exisitingitem.quantity;

            totalprice = calculatePrice(user.items)
            user.totalPrice = totalprice

            await user.save({session})
            
          }
          const userincart = await Cart.findOne({userId:userid})
          if(userincart){
                               const finalpriceafter = userincart.totalPrice
                               const userid = userincart.userId    
             userincart.totalPrice = await  checkandapplycoupon(finalpriceafter,userid)
             await userincart.save({session})
}
session.commitTransaction()
           return res.json({
            success:true,
            message:"product removed successfully"
           })
          
    
                         
}


                          







}catch(error){
  session.abortTransaction()
  console.log(error.message)
}finally{
  session.endSession()
}


                   }

 
  module.exports= {
    addtoCart,
    deleteProduct,
    getCart,
validateandapplyCoupon,

  }