const Product = require('../models/product');
const Review = require('../models/review');

// Save a new review
const saveReview = async (req, res) => {
  const { productId, rating, message } = req.body;

  try {
  
    const newReview = new Review({
      productId,
      userId: req.user.id, 
      rating,
      message,
    });
    await newReview.save();

    const reviews = await Review.find({ productId });

    // Calculate the average rating
    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    // Update the product with the new average rating
    await Product.findByIdAndUpdate(productId, { rating: averageRating });

    res.status(201).json({ message: 'Review saved successfully', review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const getReviews = async (req, res) => {
  try {
    const productId = req.params.id;

    const allReviews = await Review.find({ productId }).populate('userId', 'name email');

    res.status(200).json(allReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

                

module.exports = {
  saveReview,
  getReviews,
};




