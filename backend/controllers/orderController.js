const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/Order');

exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id, status: 'paid' })
    .populate('items.product')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
});
