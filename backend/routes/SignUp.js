const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "JabiLisAgoodBoy";

// Validation middleware
const validateSignUp = [
  body("name", "Name must be atleast 5 characters long").isLength({ min: 5 }),
  body("username", "Username must be at least 3 characters long").isLength({
    min: 3,
  }),
  body("email", "Invalid email address").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
];

// Route : POST method for signup "http://localhost:5000/api/signup"
router.post("/signup", validateSignUp, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username is already taken" });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    let user = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

    res.send({ msg: "Signup successfully", details: user, token: authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred in signup");
  }
});

module.exports = router;
