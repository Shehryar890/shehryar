const Product = require('../models/Product');

// Helper function to get sale products
exports.getSaleProducts = async (limit = 7) => {
  try {
    return await Product.find({ isSale: true, instock: true })
      .limit(limit)
      .sort({ price: 1 });  // Optional: Sorting by price or any other criteria
  } catch (error) {
    throw new Error("Error fetching sale products");
  }
};

// Helper function to get featured products
exports.getFeaturedProducts = async (limit = 6) => {
  try {
    return await Product.find({ isFeatured: true, instock: true })
      .limit(limit)
      .sort({ rating: -1 });  // Optional: Sorting by rating or any other criteria
  } catch (error) {
    throw new Error("Error fetching featured products");
  }
};

// Controller function for Sale products
exports.getSaleItems = async (req, res) => {
  try {
    const saleItems = await getSaleProducts(7);  // Limit of 7 sale items
    res.json(saleItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sale products" });
  }
};

// Controller function for Featured products
exports.getFeaturedItems = async (req, res) => {
  try {
    const featuredItems = await getFeaturedProducts(6);  // Limit of 6 featured items
    res.json(featuredItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching featured products" });
  }
};
