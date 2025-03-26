// adminRoutes.js
const express = require("express");


const makeAdmin = require("../controller/makeadmin");
const { verifyAdmin,  verifyToken } = require("../middlerwares/makinadmin");

const router = express.Router();

// This route is protected by the adminCheck middleware
router.put("/make-admin/:userId", verifyAdmin, makeAdmin);

module.exports = router;
