import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { createCheckoutSession } from '../api/paymentService';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalCents, clear } = useCart();

  const checkout = async () => {
    try {
      const payload = items.map((i) => ({ productId: i.productId, quantity: i.quantity }));
      const { url } = await createCheckoutSession(
        payload,
        window.location.origin + '/success',
        window.location.origin + '/cart'
      );
      window.location.href = url;
    } catch (e: any) {
      alert(e?.response?.data?.error?.message || 'Checkout failed');
    }
  };

  if (items.length === 0) return <div className="p-6">Your cart is empty.</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between border p-3 rounded">
            <div className="flex items-center gap-3">
              {item.image && <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />}
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-600">{formatCurrency(item.price)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                className="w-16 border p-1"
              />
              <button className="underline" onClick={() => removeItem(item.productId)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="text-xl font-semibold">Total: {formatCurrency(totalCents)}</div>
        <div className="space-x-2">
          <button className="px-4 py-2 border" onClick={clear}>Clear</button>
          <button className="px-4 py-2 bg-black text-white" onClick={checkout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
