const mongoose = require("mongoose");
       const Review = require("../models/review")

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   rating: { type: Number, required: true },
//   color: { type: String, required: true },
//   instock: { type: Boolean, default: true },
//   description: { type: String, required: true },
//   category: { type: String, required: true }, // Discriminator category
//   subcategory: { type: String, required: true },
//   brand: { type: String, required: true },
//   image: { type: String, required: true },
//   details: { type: String, required: true },
// }, 
// {
//   discriminatorKey: 'category',
//   timestamps: true,
// });

// // Add indexes to frequently queried fields for better performance
// productSchema.index({ category: 1 }); // Index for 'category'
// productSchema.index({ price: 1 }); // Index for 'price'
// productSchema.index({ rating: -1 }); // Index for 'rating' (descending order)
// productSchema.index({ brand: 1, price: 1 });
// productSchema.index({subcategory:1}) // Compound index on 'brand' and 'price'






               

               const productSchema  = new mongoose.Schema({


                name: { type: String,  },
                description: { type: String,  },
                price: { type: Number,  },
                category: [{ type: String,  }],
                brand: { type: String,  },
                images: [  String ],
                stock: { type: Number, default: 0 },
                sold: { type: Number, default: 0 },
                discountoffer:{
                  type:String,

                },

               
                averageRating: { type: Number, default: 0 },
totalReviws  :{
  type:Number,
  default:0
},


             
                ingredients: [{ type: String }],
                skinType: { type: String },
                discount: { type: Number, default: 0 },






                //
                views:{
                  type:Number,
                  default:0
                },
                purchase:{
                  type:Number,
                  default:0
                },
                addtoCartCount:{
                  type:Number,
                  default:0
                },



                embeddedvalue:{

  type:[Number] ,
  default:[]

}
              }, { timestamps: true });

              
              const Product = mongoose.models.Product || mongoose.model('Product', productSchema);


          module.exports = Product;





                        













   
