const express = require("express");
const router = express.Router();
const { verifyToken,  verifyShipping } = require("../middlewares/makingadmin");
const {  updateOrderStatus} = require("../controller/order");



// Route for shipping access
router.get("/dashboard", verifyToken, verifyShipping, (req, res) => {
  res.status(200).json({ message: "Welcome to the shipping dashboard" });
});

const { verifyToken, verifyShipping } = require('../middleware/admincheck');
const { updateOrderStatus } = require('../controller/order');
const upload = require('../middleware/multerMiddleware'); // Multer middleware to handle file upload

// Route to update order status
router.put(
  '/order/:orderId',
  verifyToken,
  verifyShipping,
  upload.single('riderImage'), // Middleware to handle image upload
  updateOrderStatus
);



module.exports = router;
