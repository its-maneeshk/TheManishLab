const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (without hashing password)
    const user = await User.create({
      name,
      email,
      password, // Saving plain text password (NOT RECOMMENDED in real apps!)
    });

    if (user) {
      res.status(201).json({ message: 'User registered successfully!' });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
  }
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    // Compare plain text password (NO bcrypt)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful!',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  return res.status(200).json({ message: 'Logout successful' });
});


module.exports = router;
