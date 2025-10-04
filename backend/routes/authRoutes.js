const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { protect } = require('../middleware/authMiddleware.js');
const User = require('../models/User.js');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// POST /api/auth/register
router.post('/register', asyncHandler(async (req, res) => {
    // (Register code is the same, no changes here)
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({ name, email, password });
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));

// POST /api/auth/login
router.post('/login', asyncHandler(async (req, res) => {
    // (Login code is the same, no changes here)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            profilePhotoUrl: user.profilePhotoUrl,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
}));

// --- NEW PROFILE UPDATE ROUTE START ---
// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put(
  '/profile',
  protect, // This is our security guard
  asyncHandler(async (req, res) => {
    // The 'protect' middleware gives us the user in req.user
    const user = await User.findById(req.user.id);

    if (user) {
      // Update the fields if they are provided in the request body
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.profilePhotoUrl = req.body.profilePhotoUrl || user.profilePhotoUrl;

      // We won't update the password here, that should be a separate, more secure process.

      const updatedUser = await user.save();

      // Send back the updated user data (including a new token if you want, but it's not essential here)
      res.json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePhotoUrl: updatedUser.profilePhotoUrl,
        token: generateToken(updatedUser._id), // Send a refreshed token
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  })
);
// --- NEW PROFILE UPDATE ROUTE END ---


module.exports = router;