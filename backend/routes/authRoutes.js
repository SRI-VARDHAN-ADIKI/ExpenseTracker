const express = require('express');
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token will expire in 1 hour
  });
};


router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400); // Bad Request
    throw new Error('User already exists');
  }

 
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({ // 201 Created
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
}));


router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');


  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); 
    throw new Error('Invalid email or password');
  }
}));


module.exports = router;
