const Product = require("../models/product");
const Order = require("../models/order");
const { Cart } = require("../models/cartSchema");

const cashOndeliveryOrder = async (req, res) => {
  const { orderData } = req.body;
  const userId = req.user;

  try {

    if (!userId || !orderData?.cartid || !orderData?.shippingaddress) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

  
    const cartitems = await Cart.findOne({ userId });

    if (!cartitems) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }


    if (cartitems._id.toString() !== orderData.cartid) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized cart access",
      });
    }

    
    const newOrder = new Order({
      shippingaddress: orderData.shippingaddress,
      totalPrice: cartitems.totalPrice,
      userId,
      status: "pending",
      paymentStatus: "notpaid",
      isPaid: false,
      cartItems: cartitems.items,
      paymentMethod: orderData.paymentMethod,
    });


    await newOrder.save();
await Promise.all(
  cartitems.items.map(async (item) => {
    const product = await Product.findById(item.productId);
    if (!product) return;
    product.purchases = (product.purchases || 0) + 1;
    await product.save();
  })
);



    await Cart.findOneAndDelete({ userId });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating cash on delivery order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const getOrder = async (req,res)=>{
  const userId = req.user;
try{
                  if(!userId){
                    return res.status(404).json({
                      success:false,
                      message:"userid didnt exist"
                    })
                  }
                           
                  const orderexists = await Order.find({userId:userId}).populate("cartItems.productId")
                  if(orderexists.length === 0) {
                    return res.status(400).json({
                      success:false,
                      message:"There is no order"
                    })
                  }
 
                 
                       return res.status(200).json({
                        success:true,
                        message:"orders fetch successfully",
                        orders:orderexists
                       })

              
                         



   

                }
                catch(error){
                  console.log("error.message")
                  return res.status(500).json({
                    success:false,
                    message:"Internal server Error"
                  })
                }
}


const updateOrderStatus = async (req, res) => {
  try {
    const { status, userId, orderId } = req.body;

    if (!status || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order doesn't exist",
      });
    }

    if (order.status === status) {
      return res.status(400).json({
        success: false,
        message: "Order already has this status",
      });
    }

    
    if (status === "delivered" && order.status !=="delivered") {
    await Promise.all(order.cartItems.map(async (item) => {
  const product = await Product.findById(item.productId);
  if (product) {
    product.stock -= item.quantity;
    product.purchase = (product.purchase || 0) + 1;
    if (product.stock < 0) throw new Error(`${product.name} is out of stock`);
    await product.save();
  }
}));
    }
    if(status ==="cancelled" && order.status !=="cancelled"){
   await Promise.all(order.cartItems.map(async (item) => {
  const product = await Product.findById(item.productId);
  if (product) {
    product.stock += item.quantity;
    product.purchase = (product.purchase || 0) - 1;
   
    await product.save();
  }
}));
    }

   
    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const getordersforAdmin = async(req,res)=>{
  try{
  const orders = await Order.find({}).sort({createdAt:-1})
  
  if(orders.length ===0){
    return res.json({
      success:false,

      message:"there are no orders"
    })
  }
   return res.status(200).json({
    success:true,
    message:"orders fetched successfully",
    orders:orders
   })
  }
catch(error){
  console.log(error)
  res.status(500).json({
    success:false,
    message:"intertnal server Error"
  })
}
}
 




    const totalSales = async (req, res) => {
      const range = req.query.range ? parseInt(req.query.range) : 7; 
  
      const now = new Date();
  
    
      const rangePreviousDays = new Date(Date.now() - range * 24 * 60 * 60 * 1000); 
  
      try {
         
          const orders = await Order.find({
              createdAt: {
                  $gte: rangePreviousDays,
                  $lte: now,
              }
          });
  const totalOrders = orders.length
         
          const totalPrice = orders.reduce((acc, item) => acc + item.totalPrice, 0);
          const averageOrdervalue = totalPrice/totalOrders
  
          return res.json({
              success: true,
              message: "SUCCESSFUL THING",
              orders,
              totalSales: totalPrice,
              totalOrders:totalOrders,
              averageOrdervalue:averageOrdervalue
          });
      } catch (error) {
          console.error(error);
          return res.status(500).json({
              success: false,
              message: "Failed to calculate total sales",
          });
      }
  };

  const salesgrowthoverWeek =async (req,res)=>{
    const range = 28;

    const now = new Date()
    const sevendays = new Date(Date.now()-range * 24*60*60*1000)

    const weeklyGrowth = await Order.aggregate([
      {
        $match:{
          createdAt:{$gte:sevendays}
        },

      },
   {   $group:{
        _id:{
year:{$isoWeekYear :"$createdAt"},
week: { $isoWeek: "$createdAt" }

        },
        totalSales: { $sum: "$totalPrice" }
      },
  
  },
  {
    $sort:{
      "_id": -1}
    
  }
,
{
  $limit:4
},



  
    
])
const sorted = weeklyGrowth.reverse()

const weekllabels= sorted.map((item , index , arr)=>{
 
          const week  = index+1;
          return{
            week:`Week :${week}`,
            totalSales :item.totalSales
          }
          

})
  

 const salesgrowth=  weekllabels.map((item , index, weekllabels) =>{
              if(index===0){
                return {
                  ...item ,
                  growth:0
                }
              }

              const lastWeekSales = weekllabels[index-1].totalSales;
              const thisweekSales = item.totalSales


              const growth = ((thisweekSales - lastWeekSales)/lastWeekSales)*100;
              return {
                ...item,
                growth:parseFloat(growth.toFixed(2))
              }

  })

  return res.status(200).json({
    success:true,
    message:"sale growth fetched successfully",
    salesgrowth:salesgrowth
  })


  }
 const deleteOrder = async(req,res)=>{
  const {orderId} = req.body;
   if(!orderId){
    return res.status(400).json({
      success:false,
      message:"orderId not present"
    })
   }
        await Order.findOneAndDelete({_id:orderId})
        return res.json({
          success:true,
          message:"order deleted succesfully"
        })

 }

 const salesGrowthOverMonths = async (req, res) => {
  try {
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1); // 12 months back

    const monthlyGrowth = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          totalSales: { $sum: "$totalPrice" }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    // Build labels like "Month: 1", "Month: 2", etc.
    const monthLabels = monthlyGrowth.map((item, index, arr) => {
      return {
        month: `Month: ${index + 1}`,
        totalSales: item.totalSales
      };
    });

    // Calculate growth percentage
    const salesGrowth = monthLabels.map((item, index, arr) => {
      if (index === 0) {
        return {
          ...item,
          growth: 0
        };
      }

      const lastMonthSales = arr[index - 1].totalSales;
      const thisMonthSales = item.totalSales;

      const growth = ((thisMonthSales - lastMonthSales) / lastMonthSales) * 100;

      return {
        ...item,
        growth: parseFloat(growth.toFixed(2))
      };
    });

    return res.status(200).json({
      success: true,
      message: "Monthly sales growth fetched successfully",
      salesGrowth: salesGrowth
    });
  } catch (error) {
    console.error("Error in monthly sales growth API:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

  const mostsoldProducts = async(req,res)=>{
    const now = new Date();
  
    
    const rangePreviousDays = new Date(Date.now() - 7* 24 * 60 * 60 * 1000); 

               
             const products = await Order.aggregate([
              {
                $match:{
                createdAt:{  $gte:rangePreviousDays,
                  $lte:now
                }
                },
              },
              {
                $unwind:"cartItems"
              },
              {
                group:{
                  _id:"cartItems.productId",
                  totalQuantitySold:{$sum:"$cartItems.quantity"},
                totalSaled:{$sum:"$cartItems.price"}


                }
              },
               {
    $sort: { totalQuantitySold: -1 } 
  },


  {
    $lookup: {
      from: "products", 
      localField: "_id", 
      foreignField: "_id", 
      as: "productDetails" 
    }
  },

  {
    $limit: 5
  } 
              
             ])

             if(!products){
              return res.status(400).json({
                success:true,
                message:"there is no product like this"
              })
             }

             return res.status(200).json({
              success:true,
              message:"most sold products fetched successfully",

              products:products
             })
    }

module.exports = {
  cashOndeliveryOrder,
  getOrder,
  deleteOrder,
  mostsoldProducts,
  salesGrowthOverMonths,
  salesgrowthoverWeek,
  totalSales,
  getordersforAdmin
};
