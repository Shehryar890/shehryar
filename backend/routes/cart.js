const express = require('express');
const router = express.Router();
const { getcartItems, addPost, deleteCart } = require('../controller/cartlogic');

// Route to get all cart items for a specific user
router.get('/:userId', getcartItems);

// Route to add an item to the cart (or update quantity)
router.post('/post', addPost);

// Route to delete an item from the cart
router.delete('/:userId/:productId', deleteCart);

module.exports = router;
