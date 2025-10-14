const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/Product');

exports.listProducts = asyncHandler(async (req, res) => {
  const { q = '', limit = 20, page = 1 } = req.query;
  const numericLimit = Math.min(parseInt(limit, 10) || 20, 100);
  const numericPage = Math.max(parseInt(page, 10) || 1, 1);

  const filter = q
    ? { title: { $regex: q, $options: 'i' } }
    : {};

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((numericPage - 1) * numericLimit)
      .limit(numericLimit),
    Product.countDocuments(filter),
  ]);

  res.json({ success: true, data: items, total });
});

exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});
