require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set');
  await mongoose.connect(uri);

  const products = [
    {
      title: 'Smiley Sticker',
      description: 'Happy smiley face',
      image: 'https://picsum.photos/seed/smiley/400',
      price: 199,
      tags: ['fun', 'yellow'],
    },
    {
      title: 'Rocket Sticker',
      description: 'To the moon!',
      image: 'https://picsum.photos/seed/rocket/400',
      price: 299,
      tags: ['space'],
    },
    {
      title: 'Cat GIF Sticker',
      description: 'Cute cat gif',
      image: 'https://picsum.photos/seed/cat/400',
      price: 249,
      tags: ['cats', 'gif'],
    },
    {
      title: 'Coder Sticker',
      description: 'Write code, drink coffee',
      image: 'https://picsum.photos/seed/code/400',
      price: 299,
      tags: ['dev'],
    },
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded products:', products.length);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
