const dotenv = require('dotenv')
dotenv.config();


const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expiresInSec: process.env.JWT_EXPIRES_SEC
  },
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS,
  }
};

module.exports = config;