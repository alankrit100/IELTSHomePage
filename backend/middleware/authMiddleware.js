const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    if (!token) {
      res.status(401);
      return res.json({ success: false, error: { message: 'Not authorized, no token', code: 'UNAUTHORIZED' } });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not set');
    }

    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401);
      return res.json({ success: false, error: { message: 'Not authorized, user not found', code: 'UNAUTHORIZED' } });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: { message: 'Not authorized, token failed', code: 'UNAUTHORIZED' } });
  }
}

module.exports = { protect };
