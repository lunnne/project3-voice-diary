const express = require('express');
const router = express.Router();
const validate = require('../middleware/validator.js');
const { body } = require('express-validator');
const isAuth = require('../middleware/auth.js');
const authController = require('../controller/auth');

const validateCredential = [
  body('username').trim().notEmpty().withMessage('username should be at least 5 characters'),
  body('password').trim().isLength({ min: 5 }).withMessage('password should be at least 5 characters'),
  validate,
];

const validateSignup = [...validateCredential, body('email').isEmail().normalizeEmail().withMessage('invalid email'), validate];

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

router.get('/me', isAuth, authController.me);

module.exports = router;
