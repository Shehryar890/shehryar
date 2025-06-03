

const User = require("../models/user");

   const jwt = require("jsonwebtoken")
    


           


   const tokenChecking = async (req, res) => {
  

    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    console.log("token" , token)


    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);

     

        if (!decoded) {
            return res.status(403).json({ message: "Unauthorized, token invalid" });
        }
        else{
          const user = await User.findById(decoded.Id);
          if (!user) {
            return res.status(403).json({ message: "Unauthorized, user not found" });
          }
          user.lastActiveDate = Date.now();
          await user.save();
          res.json({
            success:true,
            successMessage:"user data comes",
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
        
            image:user.image
           // Additional check for admin role (optional)
          })
        }

       
    } catch (err) {
        console.log("JWT Error:", err.message); // Debugging log
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};



  module.exports = {tokenChecking};