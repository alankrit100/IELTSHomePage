import { useEffect, useState } from 'react';
import { getMyOrders, type Order } from '../api/orderService';
import { formatCurrency } from '../utils/formatCurrency';

export default function Library() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Library</h1>
      {orders.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded">
              <div className="mb-2 text-sm text-gray-600">
                Order {order._id} • {new Date(order.createdAt).toLocaleString()} • {formatCurrency(order.amount)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.items.map((i, idx) => (
                  <div key={idx} className="border p-3 rounded">
                    {i.product?.image && <img src={i.product.image} alt={i.product.title} className="w-full h-32 object-cover mb-2" />}
                    <div className="font-medium">{i.product?.title || 'Sticker'}</div>
                    <div className="text-sm text-gray-600">Qty {i.quantity}</div>
                    <a href={i.product?.image} target="_blank" rel="noreferrer" className="underline text-sm mt-1 inline-block">Download</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
