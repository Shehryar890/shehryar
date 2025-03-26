require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// ✅ Check if .env variables exist
if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("❌ Missing Cloudinary ENV Variables! Check your .env file.");
  process.exit(1);
}

// ✅ Correct Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("✅ Cloudinary Config Loaded Successfully!");

module.exports = cloudinary;
