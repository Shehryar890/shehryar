const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: String,
    required: true, // Email address of the user placing the order
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  liveLocation: {
    type: String,
    required: false, // Optional for real-time tracking
  },
  riderImage: {
    type: String,
    required: false, // Path to the uploaded rider image
  },
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming riders are part of the User model
    required: false,
  },
  reviewLinkSent: {
    type: Boolean,
    default: false, // Tracks whether the review email has been sent
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to automatically update timestamps
orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
