// Unified Authentication Middleware
const authenticate = (req, res, next) => {
    const token = req.cookies.jwt || req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next(); // Continue to the next middleware or route handler
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
  module.exports = authenticate;
  