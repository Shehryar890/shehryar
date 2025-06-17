
require('dotenv').config(); 
const { CohereClientV2 } = require('cohere-ai');

const cloudinary = require("../config/cloudinaryconfig");

const fs = require("fs");


const axios = require("axios")
const Product  = require("../models/product");





const GOOGLEEMBEDDINGSECRET = process.env.GOOGLEEMBEDDINGSECRET
const GOOGLE_EMBEDDING_URL = `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${GOOGLEEMBEDDINGSECRET}`;

const doEmbedding = async (productDetailsText) => {
  try {
    const response = await axios.post(
      GOOGLE_EMBEDDING_URL,
      {
        model: "models/embedding-001",
        content: {
          parts: [
            { text: productDetailsText }
          ]
        }
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (
      response.data &&
      response.data.embedding &&
      response.data.embedding.values
    ) {
      return response.data.embedding.values; // This is the float array (vector)
    } else {
      throw new Error("Embeddings not found in response");
    }
  } catch (error) {
    console.error("Error fetching Google embeddings:", error.response?.data || error.message);
    return []; 
  }
};

const createProduct = async (req, res) => {
  console.log(JSON.stringify(req.files, null, 2));
  console.log(JSON.stringify(req.body, null, 2));

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log(" `req.body` is EMPTY!");
      return res.status(400).json({
        status: "error",
        message: "Request body is empty. Check if you're sending form-data correctly.",
      });
    }

    const { name, description, price, category, brand, stock, discountoffer, skinType, ingredients } = req.body;

    if (!name || !description || !price || !category || !brand || !stock) {
      console.log(" Missing required fields!");
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
        receivedData: req.body, 
      });
    }

    const numprice = parseFloat(price);
    if (isNaN(numprice)) {
      throw new Error("invalid number");
    }
    const numstock = parseFloat(stock);
    if (isNaN(numstock)) {
      throw new Error("invalid number");
    }

   
let imageUrls
    if (req.files && req.files.length > 0) {
     const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "product_images",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      })
    );


    const uploadResults = await Promise.all(uploadPromises);


    imageUrls  = uploadResults.map((result) => result.secure_url);
      console.log("Cloudinary Image URLs:", imageUrls);
    } else {
      return res.status(400).json({
        message: "Files are missing",
      });
    }
   
    let numdiscount;
    let discountedprice = null;

    if (discountoffer) {
      numdiscount = parseFloat(discountoffer);

      if (isNaN(numdiscount) || numdiscount < 0 || numdiscount > 100) {
        return res.json({
          message: "please enter a discount within range",
        });
      }

      const disc = parseFloat(numprice) * (numdiscount / 100);
      discountedprice = parseFloat(Math.round(numprice - disc).toFixed(2));
    } else {
      discountedprice = numprice;
    }

    const productDetailsArray = [name, description, price, category, brand, skinType, ingredients];
    const embeddingString = productDetailsArray.flat().filter(Boolean).join(" ");
    const productembedding = await doEmbedding(embeddingString);

    const newProduct = await Product.create({
      name,
      description,
      price: numprice,
      category,
      brand,
      stock: numstock,
      discount: discountedprice,
      skinType,
      discountoffer: numdiscount,
      ingredients,
      embeddedvalue: productembedding,
      images: imageUrls,
    });

    return res.status(201).json({
      message: "Product successfully stored",
      product: newProduct,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};




        

module.exports = { createProduct };
