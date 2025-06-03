// const Product = require("../models/Product");

// // Create Product Controller
// // const createProduct = async (req, res) => {
// //   try {
// //     const { name, price, rating, color, description, category, subcategory, brand, image, details } = req.body;

// //     // Validate the required fields
// //     if (!name || !price || !rating || !color || !description || !category || !subcategory || !brand || !image || !details) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     // Create a new product
// //     const newProduct = new Product({
// //       name,
// //       price,
// //       rating,
// //       color,
// //       description,
// //       category,
// //       subcategory,
// //       brand,
// //       image,
// //       details
// //     });

// //     // Save the product to the database
// //     await newProduct.save();
// //     res.status(201).json({ message: "Product created successfully", product: newProduct });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // Edit Product Controller
// // const editProduct = async (req, res) => {
// //   try {
// //     const { productId } = req.params; // Get product ID from URL
// //     const { name, price, rating, color, description, category, subcategory, brand, image, details } = req.body;

// //     // Find product by ID and update
// //     const updatedProduct = await Product.findByIdAndUpdate(
// //       productId,
// //       { name, price, rating, color, description, category, subcategory, brand, image, details },
// //       { new: true } // This ensures the updated product is returned
// //     );

// //     if (!updatedProduct) {
// //       return res.status(404).json({ message: "Product not found" });
// //     }

// //     res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // Delete Product Controller
// const deleteProduct = async (req, res) => {
//   try {
//     const { productId } = req.params; // Get product ID from URL

//     // Find the product and remove it
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

// module.exports = {
//   createProduct,
//   editProduct,
//   deleteProduct
// };
