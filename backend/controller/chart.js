const Product = require('../models/product');

// Helper function to get products by category and availability
const getProductsByCategory = async (category, page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;
    return await Product.find({ category, instock: true })
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 }); // Optional: You can change this sorting
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

// Controller function for Men products
const getMenProducts = async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const products = await getProductsByCategory("Men", page);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Men products" });
  }
};

// Controller function for Women products
const getWomenProducts = async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const products = await getProductsByCategory("Women", page);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Women products" });
  }
};

// Controller function for Skincare products
const getSkincareProducts = async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const products = await getProductsByCategory("Skincare", page);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Skincare products" });
  }
};
module.exports ={
    getMenProducts,
    getWomenProducts,
    getSkincareProducts
}