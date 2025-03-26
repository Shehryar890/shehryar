const cloudinary = require("../config/cloudinaryconfig");
     

const Product  = require("../models/product");
// Ensure correct model import

const createProduct = async (req, res) => {
  try {
    console.log("📂 Uploaded Files:", req.files);
    console.log("📩 Raw Request Body:", req.body);

    // 🚨 Check if `req.body` is empty
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log("🚨 `req.body` is EMPTY!");
      return res.status(400).json({
        status: "error",
        message: "Request body is empty. Check if you're sending form-data correctly.",
      });
    }

    // ✅ Extract form fields
    const { name, description, price, category, brand, stock, discount, skinType, ingredients } = req.body;

    console.log("📩 Parsed Request Body:", {
      name,
      description,
      price,
      category,
      brand,
      stock,
      discount,
      skinType,
      ingredients,
    });

    // 🚨 Validate required fields
    if (!name || !description || !price || !category || !brand || !stock) {
      console.log("❌ Missing required fields!");
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
        receivedData: req.body, // Debugging
      });
    }

    // 🚨 Validate numbers
    if (isNaN(price) || (discount && isNaN(discount))) {
      console.log("❌ Invalid number input!");
      return res.status(400).json({
        status: "error",
        message: "Price and discount should be numbers",
      });
    }

    // ✅ Process images from Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map((file) => file.path); // Cloudinary storage already provides the URL
      console.log("✅ Cloudinary Image URLs:", imageUrls);
    } else {
      console.log("⚠️ No files received");
    }

    // ✅ Create product in MongoDB
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      discount,
      skinType,
      ingredients,
      images: imageUrls,
    });

    return res.status(201).json({
      message: "Product successfully stored",
      product: newProduct,
    });

  } catch (err) {
    console.error("❌ Error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { createProduct };
