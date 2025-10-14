import { useEffect, useState } from 'react';
import { listProducts, type Product } from '../api/productService';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    listProducts().then((res) => setProducts(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p._id} className="border p-4 rounded">
          {p.image && <img src={p.image} alt={p.title} className="w-full h-48 object-cover mb-2" />}
          <h2 className="text-lg font-semibold">{p.title}</h2>
          <p className="text-sm text-gray-600">{p.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">{formatCurrency(p.price)}</span>
            <button
              className="bg-black text-white px-3 py-1"
              onClick={() => addItem({ productId: p._id, title: p.title, image: p.image, price: p.price, quantity: 1 })}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
