app.get('/api/products', async (req, res) => {
    const { category, subcategory, size, color, brand, material, style, manufacturer, ingredients, price } = req.query;
  
    // Start with an empty query object
    let queryObj = {};
  
    // Check the category and apply the relevant filters
    if (category) {
      // Apply category to the query object
      queryObj.category = category;
    }
  
    // Check subcategory, always included in query (regardless of category)
    if (subcategory) {
      queryObj.subcategory = subcategory;
    }
  
    // Conditional filters based on category
    if (category === 'skincare') {
      // For Skincare, you might have 'manufacturer' and 'ingredients'
      if (manufacturer) {
        queryObj.manufacturer = manufacturer; // Filter by manufacturer
      }
      if (ingredients) {
        queryObj.ingredients = ingredients; // Filter by ingredients
      }
    } else if (category === 'men') {
      // For Men, you might have 'size' and 'brand'
      if (size) {
        queryObj.size = size; // Filter by size
      }
      if (brand) {
        queryObj.brand = brand; // Filter by brand
      }
    } else if (category === 'women') {
      // For Women, you might have 'material' and 'style'
      if (material) {
        queryObj.material = material; // Filter by material
      }
      if (style) {
        queryObj.style = style; // Filter by style
      }
    }
  
    // Handle the price filter dynamically (generic across categories)
    if (price) {
      if (price === 'lessThan50') {
        queryObj.price = { $lt: 50 }; // Filter products with price less than $50
      } else if (price === '50to100') {
        queryObj.price = { $gte: 50, $lte: 100 }; // Filter products in the range $50 - $100
      } else if (price === 'moreThan100') {
        queryObj.price = { $gt: 100 }; // Filter products with price greater than $100
      }
    }
  
    try {
      // Fetch products from the database using the query object
      const products = await Product.find(queryObj);
      res.json(products); // Return the filtered products
    } catch (err) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  });
  
  