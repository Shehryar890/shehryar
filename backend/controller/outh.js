const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    console.error("🚨 JWT_SECRET is missing in .env file!");
    return null;
  }
  return jwt.sign({ Id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "40d",
  });
};

const googleSignup = async (req, res) => {
  try {
    console.log("🔍 Google Profile Data:", req.user); // Debugging

    const profile = req.user;
    if (!profile) {
      return res.status(400).json({ error: "Google authentication failed" });
    }

    const existingUser = await User.findOne({ email: profile.emails[0].value });
 
    if (existingUser) {

       

             const token = generateToken(existingUser)
 

             res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "Strict",
              maxAge: 8 * 60 * 60 * 1000, // 8 hours
            });
         
            return   res.redirect("http://localhost:5173");
            

            

             
    }

    const hashedpassword = await bcrypt.hash(profile.id, 10);
    const user = new User({
      userName: profile.name.givenName + " " + profile.name.familyName,
      googleId: profile.id,
      email: profile.emails[0].value,
      image: profile.photos[0].value,
      role: "user",
      password: hashedpassword,
    });

    await user.save();

    const token = generateToken(user);
    if (!token) {
      return res.status(500).json({ error: "Token generation failed" });
    }

    res.clearCookie("token");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    });

    res.redirect(`http://localhost:5173`);
  } catch (error) {
    console.error("🚨 Server Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { googleSignup };
