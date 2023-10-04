const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "JabiLisAgoodBoy";

// Validation middleware
const validateLogin = [
  body("username", "Username cannot be blank").exists(),
  body("password", "Password cannot be blank").exists(),
];

// Route : POST method for login "http://localhost:5000/api/login"
router.post("/login", validateLogin, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract username and password from the request body
    const { username, password } = req.body;

    // Check if the user exists in your database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const data = {
      id: user.id, // Assuming _id is the unique identifier for users
    };

    // Generate a JWT token
    const authtoken = jwt.sign(data, JWT_SECRET);

    // Return the token to the client
    res.json({ msg: "Login Successfully", authtoken: authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred in signup");
  }
});

module.exports = router;
