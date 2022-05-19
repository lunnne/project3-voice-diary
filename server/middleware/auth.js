const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User.model');

const AUTH_ERROR = { message: 'Authentication Error' };

const isAuth = async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      // Get token from header
      token = authHeader.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, config.jwt.secretKey);

      // Get user from the token
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json(AUTH_ERROR);
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
};

module.exports = isAuth;
