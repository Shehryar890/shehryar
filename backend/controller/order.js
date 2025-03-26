
const Order = require('../models/order');
const nodemailer = require('nodemailer');

// Setup for sending emails (same as before)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send email notifications
const sendOrderEmail = async (email, orderDetails) => {
  const message = {
    from: process.env.EMAIL,
    to: email,
    subject: 'New Order Placed',
    text: `New order details: ${JSON.stringify(orderDetails)}`,
  };

  await transporter.sendMail(message);
};

// Create new order (with live update for shipping and admin dashboards)
const createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice, deliveryAddress, liveLocation } = req.body;

    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      deliveryAddress,
      liveLocation,
    });

    await newOrder.save();

    // Notify clients about the new order
    io.emit('newOrder', newOrder); // Broadcast to all connected clients

    // Send email to admin and shipping company
    const shippingCompanyEmail = process.env.SHIPPING_EMAIL;
    const adminEmail = process.env.ADMIN_EMAIL;

    await sendOrderEmail(shippingCompanyEmail, newOrder);
    await sendOrderEmail(adminEmail, newOrder);

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status (with live update for dashboard)
const updateOrderStatus = async (req, res) => {
  try {
    const { status, riderId } = req.body; // `orderId` comes from `req.params`

    // Check if `riderImage` is provided in the request
    if (!req.file) {
      return res.status(400).json({ message: 'Rider image is required.' });
    }

    const riderImagePath = `/uploads/${req.file.filename}`; // Path for the saved image

    // Retrieve the order ID from route parameters
    const { orderId } = req.params;

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Update order status and save riderImage only if the status is `delivered`
    order.status = status;
    if (status === 'delivered') {
      order.riderImage = riderImagePath; // Save image path to the order
      order.riderId = riderId;
    }

    await order.save();

    // Notify connected clients about the updated status
    io.emit('orderStatusUpdated', order);

    // Send email notifications (if applicable)
    const adminEmail = process.env.ADMIN_EMAIL;
    const shippingCompanyEmail = process.env.SHIPPING_COMPANY_EMAIL;

    await sendOrderEmail(adminEmail, order);
    await sendOrderEmail(shippingCompanyEmail, order);

    // Respond with the updated order details
    res.status(200).json({ message: 'Order status updated successfully.', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};


// Get all orders for a specific user (order history)
const getUserOrderHistory = async (req, res) => {
  try {
    // Extract userId from the JWT token (from req.user if using authentication middleware)
    const userId = req.user.id;  // assuming you have JWT middleware to set req.user

    const orders = await Order.find({ userId })
                              .populate('userId' ,'name email')
                              .populate('products.productId');
    
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific order by orderId for a user (order details)
const getUserOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Extract userId from the JWT token (from req.user if using authentication middleware)
    const userId = req.user.id;

    const order = await Order.findOne({ _id: orderId, userId })
                             .populate('userId')
                             .populate('products.productId'  , 'name category image description instock details rating');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found or unauthorized access' });
    }
    
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getUserOrderHistory,  // For order history
  getUserOrderById,     // For order details
};



























