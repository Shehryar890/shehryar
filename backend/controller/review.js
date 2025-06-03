


 const User = require("../models/user")
 const Product = require("../models/product")
const Review = require("../models/review")
const Order = require("../models/order")



const createReview = async (req, res) => {
  const { userId, productId, orderId, rating, reviewmessage } = req.body;

  try {
    if (!userId || !productId || !orderId || !rating || !reviewmessage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const orderExists = await Order.findOne({ _id: orderId });
    if (!orderExists || orderExists.status !== "delivered") {
      return res.status(400).json({
        success: false,
        message: "Order does not exist or is not delivered",
      });
    }

    const cartItems = orderExists.cartItems;
    let isExist = false;

    for (let item of cartItems) {
      if (item.productId.toString() === productId.toString()) {
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      return res.status(400).json({
        success: false,
        message: "Product is not in the order",
      });
    }

    const userAlreadyExists = await Review.findOne({ userId: userId, productId: productId });

    if (userAlreadyExists) {
      userAlreadyExists.rating = rating;
      userAlreadyExists.reviewmessage = reviewmessage;

      await userAlreadyExists.save();

      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
        review: userAlreadyExists,
      });
    } else {
      const review = {
        userId: userId,
        productId: productId,
        rating: rating,
        reviewmessage: reviewmessage,
      };

      const reviewObj = new Review(review);
      await reviewObj.save();

      const reviews = await Review.aggregate(
        
        {
       $match: { productId: productId },

        },
        {
          $group:{
            _id:"productId",
            sumofratings:{$sum:"rating"},
            totalReviews:{$sum:1},
          }

        }
      
      
    ),

      const sumofratings = reviews[0].sumofratings;
      const totalReviews = reviews[0].totalReviews


      const averageRating = totalReviews>0?parseFloat((sumofratings/totalReviews).toFixed(2)):0



      const isDone = await Product.findByIdAndUpdate(
        productId,
        {
          averageRating,
          totalReviews,
        },
        { new: true }
      );

      if (!isDone) {
        return res.status(400).json({
          success: false,
          message: "Product average rating and total reviews not updated",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Review created and product schema updated",
        review: reviewObj,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const deleteReview = async(req,res)=>{
  const  { reviewId}= req.body;
try{

   if(!reviewId){
    return res.status(404).json({
      success:false,
      message:"ReviewID is required"
    })
   }

               
        const deletedReview =   await Review.findOneAndDelete({_id:reviewId})

    if(!deletedReview){
          return res.status(400).json({

success:false,
message :"Review with this id didnt exist "

          })
        }
        return res.status(200).json({
          success:true,
          message:"successfully deleted this product"
        })

    


      }
      catch(error){
        return res.status(500).json({
          success:false,
          message:"internal server error"
        })
      }
        

}

const deleteOwnReview = async(req,res)=>{

 const {userid} = req.user;

 const {reviewId } = req.body;

try{

if(!reviewId){
  return res.status(400).json({
    success:false,
    message:"Review id is required"
  })
}

const reviewExisits = await Review.findOneAndDelete({userid:userid, _id:reviewId})

if(!reviewExisits){
  return res.status(400).json({
    success:false,
    message:"reviw with that reviewid and userid didnt exist"
  })
}

 return res.status(200).json({
  success:true,
  message:"Succefully deleted that product"
 })






}catch(error){
  console.log(error.message)

  return res.status(500).json({
    success:false,
    message:"Internal Server Errror"

  })
}


}

const getsomeReviews = async (req,res)=>{
 
    const {productId  } = req.params;

try{
    if(!productId |){
      return res.status(400).json({
        success:false,
        message:'productId is required'
      })
    }

    const productReviews = await Review.find({productId:productId }).populate("userId").limit(5).sort({createdAt:-1})


    if(productReviews.length ===0){
      return res.status(400).json({
        success:false
        ,
        message:"No review for this product"
      })
    }

    return res.status(200).json({
      success:true,
      message:"Reviews fetched Successfully",
      Reviews:productReviews
    })

  }catch(error){
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }


   

}

const getAllReviews = async (req,res)=>{

  const {productId} = req.params
try{
  if(!productId){
    return res.status(400).json({
      success:false,
      message:"ProductId is required"
    })
  }



  const productReviews = await Review.find({productId:productId }).sort({createdAt:-1})


  if(productReviews.length===0){
    return res.status(400).json({
      success:false,
      message:"There are no products for this"
    })
  }


  return res.status(200).json({
    success:true,
    message:"Reviews successfully fetched ",

    AllReviews:productReviews
  })

}
  catch(error){
    console.log(error.message)
    return res.status(200).json({
      success:true,
      message:`Internal Server Error ${error.message}`
    })
  }
}










module.exports = {
  createReview,
  deleteReview,
   deleteOwnReview,
   getAllReviews
}






 