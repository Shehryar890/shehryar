const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to verify JWT Token and extract the user and role
const verifyToken = async (req, res, next) => {
  // Extract token from cookies or Authorization header
  const token = req.cookies.jwt || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing" });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request

    // Proceed to the next middleware to check role
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin role required" });
  }
  next();
};

// Middleware to verify if the user is a shipping company
const verifyShipping = (req, res, next) => {
  if (req.user.role !== "shipping") {
    return res.status(403).json({ message: "Access denied, shipping role required" });
  }
  next();
};
const verifyBlogging = (req, res, next) => {
  if (req.user.role!== "blogger") {
    return res.status(403).json({ message: "Access denied, blogging role required" });
  }
  next();
}
  
module.exports = {
  verifyToken,
  verifyAdmin,
  verifyShipping,
  verifyBlogging,
};
