const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/Product');
const Order = require('../models/Order');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');

exports.createCheckoutSession = asyncHandler(async (req, res) => {
  const { items, success_url, cancel_url } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('No items provided');
  }

  const productIds = items.map((i) => i.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  const productMap = new Map(products.map((p) => [String(p._id), p]));

  const line_items = items.map(({ productId, quantity }) => {
    const p = productMap.get(productId);
    if (!p) {
      throw new Error('Invalid product');
    }
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: p.title,
          images: p.image ? [p.image] : [],
        },
        unit_amount: p.price,
      },
      quantity: quantity || 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items,
    success_url: success_url || `${process.env.CLIENT_URL}/success`,
    cancel_url: cancel_url || `${process.env.CLIENT_URL}/cart`,
    metadata: {
      userId: String(req.user._id),
      items: JSON.stringify(items),
    },
  });

  res.json({ success: true, url: session.url, id: session.id });
});

exports.handleStripeWebhook = async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    if (!endpointSecret) {
      // In dev without webhook secret, accept event blindly (not recommended for prod)
      event = req.body; // when using express.raw, body is a Buffer
      if (Buffer.isBuffer(event)) {
        event = JSON.parse(event.toString('utf8'));
      }
    } else {
      const sig = req.headers['stripe-signature'];
      event = require('stripe')(process.env.STRIPE_SECRET_KEY).webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );
    }
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const userId = session.metadata && session.metadata.userId;
      const items = session.metadata && session.metadata.items ? JSON.parse(session.metadata.items) : [];

      // Avoid duplicate orders for the same session
      const existing = await Order.findOne({ stripeSessionId: session.id });
      if (!existing) {
        // Map items to order format; re-fetch to get priceAtPurchase
        const productIds = items.map((i) => i.productId);
        const products = await Product.find({ _id: { $in: productIds } });
        const productMap = new Map(products.map((p) => [String(p._id), p]));

        const orderItems = items.map(({ productId, quantity }) => {
          const p = productMap.get(productId);
          return {
            product: productId,
            quantity: quantity || 1,
            priceAtPurchase: p ? p.price : 0,
          };
        });

        const amount = orderItems.reduce((sum, i) => sum + i.priceAtPurchase * i.quantity, 0);

        await Order.create({
          user: userId,
          items: orderItems,
          amount,
          currency: 'usd',
          stripeSessionId: session.id,
          status: 'paid',
        });
      }
    } catch (e) {
      console.error('Failed to create order from webhook', e);
      // Return 200 to acknowledge receipt; log the error for investigation
    }
  }

  res.status(200).json({ received: true });
};
