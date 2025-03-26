const cloudinary = require("../config/cloudinaryconfig");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "product_images",
    format: file.mimetype.split("/")[1], // Auto-detect file type
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  }),
});

const upload = multer({ storage });

module.exports = upload;
