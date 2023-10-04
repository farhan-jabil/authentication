const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User"); // Import the User model

// Route : for user information http://localhost:5000/api/auth/getusers
router.post("/getusers", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Status: "Internal server error" });
  }
});

module.exports = router;
