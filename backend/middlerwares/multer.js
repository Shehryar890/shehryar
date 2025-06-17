// middlewares/multer-config.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create a temporary upload folder if not exists
const tempDir = path.join(__dirname, "../temp_uploads");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Storage: Temporarily stores in `temp_uploads/` folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// File filter: Allow only image types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .png, .webp files are allowed"), false);
  }
};


const limits = {
 
  files: 10, 
};


const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
