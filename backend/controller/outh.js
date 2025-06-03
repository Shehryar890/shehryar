const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    console.error("🚨 JWT_SECRET is missing in .env file!");
    return null;
  }
  return jwt.sign({ Id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "40d",  // Token expires in 40 days
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
      // If the user exists, generate token and set cookie
      const token = generateToken(existingUser);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
        sameSite: "Strict",
        maxAge: 40 * 24 * 60 * 60 * 1000, // 40 days for the cookie expiry
      });

      return res.redirect("http://localhost:5173");
    }

    // If new user, create a new record
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

    // Generate token and set it in the cookie
    const token = generateToken(user);
    if (!token) {
      return res.status(500).json({ error: "Token generation failed" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 40 * 24 * 60 * 60 * 1000, // 40 days for the cookie expiry
    });

    res.redirect("http://localhost:5173");

  } catch (error) {
    console.error("🚨 Server Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const googeLogin = async (req, res) => {
  const profile = req.user;

  if (!profile) {
    return res.status(400).json({ error: "Google authentication failed" });
  }

  // Check if user exists by email
  const existingUser = await User.findOne({ email: profile.emails[0].value });
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "User is not present",
    });
  }

  // Generate token for the existing user
  const token = generateToken(existingUser);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Check if the environment is production
    sameSite: "Strict",
    maxAge: 40 * 24 * 60 * 60 * 1000, // 40 days for the cookie expiry
  });

  res.redirect("http://localhost:5173");
};

module.exports = { googleSignup };
