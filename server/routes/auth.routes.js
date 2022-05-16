const express = require('express');
const router = express.Router();
const validate = require('../middleware/validator.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body } = require('express-validator');
const User = require('../models/User.model');
const isAuth = require('../middleware/auth.js');
const config = require('../config/config');

const saltRounds = 12

const validateCredential = [
  body('username').trim().notEmpty().withMessage('username should be at least 5 characters'),
  body('password').trim().isLength({ min: 5 }).withMessage('password should be at least 5 characters'),
  validate,
];

const validateSignup = [...validateCredential, body('email').isEmail().normalizeEmail().withMessage('invalid email'), validate];

router.post('/signup', validateSignup, async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).json({ message: 'Please fill in all fields' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ message: 'Password should be at least 6 characters' });
    return;
  }

  const found = await User.findOne({ username });
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  const hashed = await bcrypt.hash(password, saltRounds);
  const userId = await User.create({
    username,
    email,
    password: hashed,
  });

  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
});

router.post('/login', validateCredential, async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(user.Id);
  res.status(201).json({ token, username });
});

router.get('/me', isAuth, async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
});

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}

module.exports = router;
