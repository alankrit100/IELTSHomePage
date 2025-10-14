const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email, and password');
  }

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    data: {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id);
  res.json({
    success: true,
    data: {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    },
  });
});

exports.me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ success: true, data: { user } });
});
