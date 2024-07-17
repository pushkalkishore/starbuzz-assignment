// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from your frontend domain
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Signup route
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  User.create(username, email, password, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(201).json({ message: "User created" });
  });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const user = results[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (!match) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    });
  });
});

module.exports = router;
