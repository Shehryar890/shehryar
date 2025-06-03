


const Product  =  require("../models/product")
const mongoose = require("mongoose");
const { deleteProduct } = require("./adminproduct");
  const fetchAllProducts =async (req, res)=>{
                                         
                         
try{
       const limit = 10;
       const {pageNumber, category , brand,priceRange} = req.query;






       const page = parseInt(pageNumber) ||1;
const skip = (page-1)*limit;




                                    let filterQuery ={};
                                    if(category){
                                        filterQuery.category = category
                                    }
                                    if(brand){
                                        filterQuery.brand = brand
                                    }
if(priceRange){
                        
                      const range =   priceRange.split("-");

                        const min = Number(range[0]);
                        const max = Number(range[1]);

                    
                        

                        filterQuery.price = {
                            $gte:min , $lte:max
                        }





}
                      

       const  totalItems = await Product.countDocuments(filterQuery)

       const totalPages = Math.ceil(totalItems/limit);


       if(page>totalPages){
        return res.status(400).json({
            message:"Page not found"
        })
       }

       const productoncurrentPage = await Product.find(filterQuery).skip(skip).limit(limit);



        const startIndex = skip+1;
        const endIndex = Math.min(skip+limit, totalItems )

       const hasNex = page<totalPages;
       const hasprev =  page>1;


       
     

       const isFirspage = page==1;
       const isLastPage = page==totalPages;

         const lastpageItems = totalItems%limit == 0?limit:totalItems%limit;



        const sendingobject ={
        totalItems,
            totalPages,
            productoncurrentPage,
            startIndex,
            endIndex,
          hasNex,
           hasprev,
       
            isLastPage,
            isFirspage,
           
            lastpageItems

        }



                      return res.status(200).json({
                        message:"Products sent succesfully" ,  data:sendingobject
                      })

       
                      

                  
                    }
                    catch(error){
                        
                            console.log(error.message)
                        
                    }
     

  }



    const updateproduct =async (req,res)=>{
try{
const Id = req.params.id.trim();
console.log(req.params.id);
                 const {name,description,price,category,brand,stock,discountoffer,skinType,ingredients,} = req.body;


               


   const product  = await Product.findById(Id)
                                if(!product){
                                    return res.status(400).json({
                                        message:"Product didnt exist "
                                    })
                                }
                                else{
                          //  const checkcategory =      Array.isArray(category)?category:[category];
                          //  const checkingredients = Array.isArray(ingredients)?ingredients:{ingredients};

        
                           let imagesArray = [];
                           if(req.files && req.files.length>0){
                            imagesArray = req.files.map(file=>file.path);

                           }
                          

                           
                           product.images = imagesArray
if(name){
                           product.name = name;
}

                      if(description)     product.description = description;
                      if(price)     product.price = parseFloat(price);
                     if(category)      product.category = category;
                      if(brand)     product.brand = brand;
                        if(stock)   product.stock = parseFloat(stock);
 product.ingredients =ingredients;
product.skinType = skinType;

let discountendPrice =  product.price;

                   if(discountoffer)
{
                        const realPrice = parseFloat(product.price);

                        const disc  = Math.round(realPrice * parseFloat(discountoffer/100));

                        discountendPrice = realPrice-disc;

                     
}

product.discount = discountendPrice;








                     

await product.save();


return res.status(200).json({
    message:"Product updated Succesfully" , product
})
                           
                        }
                                            
                            
                        }

                        catch(error){
                            console.log(error.message)
                        }
                                 













                      }

// const deleteProduct = async (req, res) => {
//   try {
//     const { productId } = req.params; 

//  if(!productId){
//   return res.status(400).json({
//     success: true,
//     message:"Product id is required"
//   })
//  }
//     const deletedProduct = await Product.findByIdAndDelete(productId);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



const productDetailPage = async (req, res) => {
  const { productId } = req.params;

  try {
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product with this ID does not exist"
      });
    }

    // Increment view count
    product.views = (product.views || 0) + 1;
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Successfully fetched the product details",
      product
    });

  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

    // const mostsoldProducts = async(req,res)=>{
               
    //          const products = await Order.aggregate([
    //           {
    //             $match: {
    //               createdAt: {
    //                 $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7), 
    //                 $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate()) 
    //               }
    //             }
    //           },
              
    //           {
    //             $unwind: "$cartItems"
    //           },
            
    //           {
    //             $group: {
    //               _id: "$cartItems.productId",
    //               totalQuantitySold: { $sum: "$cartItems.quantity" }, 
    //               totalSales: { $sum: "$cartItems.totalPrice" } 
    //             }
    //           },
            
    //           {
    //             $sort: { totalQuantitySold: -1 } 
             
    //           },
            
    //           {
    //             $lookup: {
    //               from: "Product",
    //               localField: "_id", 
    //               foreignField: "_id", 
    //               as: "productDetails" 
    //             }
    //           },
            
    //           {
    //             $limit: 5
    //           }
    //          ])

    //          if(products.length === 0){
    //           return res.status(400).json({
    //             success:false,
    //             message:"No sold product this weeks"
    //           })

    //          }
    //          return res.status(200).json({
    //           success:true,
    //           message:"most sold products fetched successfully",
    //           products:products
    //          })
    // }


  module.exports= {
    fetchAllProducts,
    updateproduct,
    deleteProduct

  }