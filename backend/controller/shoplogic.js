const Product = require('../models/product');

const getbyCategory = async (req, res) => {
  try {
    const { categoryName } = req.params; // categoryName is part of the URL params

    // Fetch products based on category name
    const products = await Product.find({ category: categoryName });

    // Send response with filtered products
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getbysubcategory = async (req, res) => {
  try {
    // Destructure categoryName and subcategory from the URL params (req.params)
    const { categoryName, subcategory } = req.params; // categoryName and subcategory are in req.params
    // Destructure the rest of the filters from query parameters (req.query)
    const {
      size,
      color,
      brand,
      material,
      price,
      rating,
      style,
      skinType,
      ingredients,
      inStock,
    } = req.query;

    // Initialize query object for MongoDB query
    let query = { category: categoryName }; // Start with categoryName in the query

    // If subcategory is provided, add it to the query
    if (subcategory) {
      query.subcategory = subcategory;
    }

    // Handle filters based on categoryName
    if (categoryName === 'Men') {
      if (size) {
        query.size = size;
      }

      if (color) {
        query.color = color;
      }

      if (brand) {
        query.brand = brand;
      }

      if (material) {
        query.material = material;
      }
    } else if (categoryName === 'Women') {
      if (size) {
        query.size = size;
      }

      if (color) {
        query.color = color;
      }

      if (brand) {
        query.brand = brand;
      }

      if (material) {
        query.material = material;
      }

      if (style) {
        query.style = style;
      }
    } else if (categoryName === 'Skincare') {
      if (brand) {
        query.brand = brand;
      }

      if (price) {
        const priceRange = price.split('-');
        query.price = { $gte: priceRange[0], $lte: priceRange[1] };
      }

      if (skinType) {
        query.skinType = skinType;
      }

      if (rating) {
        query.rating = { $gte: rating };
      }

      if (ingredients) {
        query.ingredients = { $in: ingredients.split(',') };
      }

      if (inStock) {
        query.inStock = inStock === 'true';
      }
    }

    // Additional filters common to all categories
    if (rating) {
      query.rating = { $gte: rating };
    }

    if (price) {
      const priceRange = price.split('-');
      query.price = { $gte: priceRange[0], $lte: priceRange[1] };
    }

    // Fetch products based on the query object
    const products = await Product.find(query);

    // Send response with filtered products
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const productdetail =async (req, res)=>{
  try{
    const{productId} = req.params;
    const product = await Product.findById(productId);
                  if(!product){
                    return res.status(404).json({message: 'Product not found'});
                  }
                  res.status(200).json(product);

  }
  catch(error){
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
}
const fetchPopupProducts = async (req, res) => {
  try {
    // Fetch 8 random products
    const products = await Product.aggregate([{ $sample: { size: 8 } }]);

    // Return the products in the response
    res.status(200).json({ products });
  } catch (err) {
    console.error('Error fetching popup products:', err);
    res.status(500).json({ message: 'Error fetching popup products' });
  }
};

module.exports = { getbyCategory, getbysubcategory , productdetail , fetchPopupProducts};
