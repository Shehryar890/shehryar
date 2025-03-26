// makeAdminController.js
const User = require("../models/user");

const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already an admin
    if (user.role === "admin") {
      return res.status(400).json({ message: "User is already an admin" });
    }

    // Promote user to admin
    user.role = "admin";
    await user.save();

    res.status(200).json({ message: `User with ID ${userId} is now an admin` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports ={ makeAdmin};
