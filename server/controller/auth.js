const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const config = require('../config/config');

const saltRounds = 12;

exports.signup = async (req, res) => {
    const { username, password, email } = req.body;
  
    if (!username || !password || !email) {
      res.status(400).json({ message: 'Please fill in all Fields' });
      return;
    }
  
    if (password.length < 6) {
      res.status(400).json({ message: 'Password should be At least 6 characters' });
      return;
    }
  
    const found = await User.findOne({ username });
    if (found) {
      return res.status(409).json({ message: `${username} already exists` });
    }
  
    const hashed = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      username,
      email,
      password: hashed,
    });
  
    if (user) {
      res.status(201).json({ _id: user.id, username: user.username, email: user.email, token: generateJwtToken(user._id) });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }

// put id in payload
function generateJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: '30d' });
  }

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid user or password' });
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid user or password' });
    }
  
    res.status(201).json({ _id: user.id, username: user.username, email: user.email, token: generateJwtToken(user._id) });
  }

exports.me = async (req, res, next) => {
    const {_id, username, email} = await User.findById(req.user.id) 
    res.status(200).json({ id:_id, username, email});
  }