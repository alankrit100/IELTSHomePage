const jwt = require('jsonwebtoken');

function generateToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
  return jwt.sign({ id: userId }, secret, { expiresIn });
}

module.exports = generateToken;
