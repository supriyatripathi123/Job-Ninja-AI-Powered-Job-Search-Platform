const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const JWT_SECRET = 'yourSecretKey';

const otpStore = {}; // simple in-memory store

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  // Simulate email sending (in real projects use nodemailer or email API)
  console.log(`🔐 OTP for ${email}: ${otp}`);
  res.status(200).json({ msg: 'OTP sent' });
});

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, contact, otp } = req.body;

  // Validate OTP
  if (otpStore[email] !== otp) {
    return res.status(400).json({ msg: 'Invalid or expired OTP' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({ name, email, password, contact });
    await newUser.save();
    delete otpStore[email];
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
