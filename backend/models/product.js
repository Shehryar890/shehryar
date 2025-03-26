const mongoose = require("mongoose");
       

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


                name: { type: String, required: true },
                description: { type: String, required: true },
                price: { type: Number, required: true },
                category: { type: String, required: true },
                brand: { type: String, required: true },
                images: [{ type: String }],
                stock: { type: Number, required: true, default: 0 },
                sold: { type: Number, default: 0 },
                rating: { type: Number, default: 0 },
                reviews: [
                  {
                    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                    rating: { type: Number, required: true },
                    comment: { type: String },
                  },
                ],
                ingredients: [{ type: String }],
                skinType: { type: String },
                discount: { type: Number, default: 0 },
              }, { timestamps: true });

              
              const Product = mongoose.models.Product || mongoose.model('Product', productSchema);


          module.exports = Product;





                        













   
