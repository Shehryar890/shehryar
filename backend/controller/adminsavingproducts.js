
require('dotenv').config(); 
const { CohereClientV2 } = require('cohere-ai');

const cloudinary = require("../config/cloudinaryconfig");


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
    return []; // Return an empty array on failure
  }
};

const createProduct = async (req, res) => {
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
        receivedData: req.body, // Debugging
      });
    }

       const numprice =  parseFloat(price)
       if(isNaN(numprice)){
        throw new Error("invalid number")
       };
      const numstock=  parseFloat(stock)
      if(isNaN(numstock)){
        throw new Error("invalide number")
       };

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map((file) => file.path); 
      console.log("Cloudinary Image URLs:", imageUrls);
    } else {
      console.log(" No files received");
    }
    // const checkcategory =      Array.isArray(category)?category:[category];
    // const checkingredients = Array.isArray(ingredients)?ingredients:[ingredients];
let numdiscount;
let discountedprice = null;

    if(discountoffer )



    {

      numdiscount = parseFloat(discountoffer)

      if( isNaN(numdiscount) || numdiscount < 0 || numdiscount >100)
      {
        
          return res.json({
            message:"please enter a disocunt within range"
          });
        }
      
      
                          
      
                              const disc  = parseFloat(numprice) * (numdiscount/100);
      
                               discountedprice = parseFloat(Math.round(numprice-disc).toFixed(2));
                              
      }
      else{
        discountedprice = numprice;
      }
       

     


  
  const productDetailsArray = [name, description, price, category, brand, skinType, ingredients];
    const embeddingString = productDetailsArray.flat().filter(Boolean).join(" ");
  const productembedding =  await  doEmbedding(embeddingString)


    



    

    const newProduct = await Product.create({
      name,
      description,
      price:numprice,
      category,
      brand,
      stock:numstock,
      discount :discountedprice ,
      skinType,
      discountoffer :numdiscount,
    ingredients,
    embeddedvalue:productembedding,
 
 
      images: imageUrls,
    });

    return res.status(201).json({
      message: "Product successfully stored",
      product: newProduct,
    });
  }


   catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};



        

module.exports = { createProduct };
