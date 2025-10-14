import { createContext, useContext, useMemo, useState } from 'react';

export type CartItem = { productId: string; title: string; image?: string; price: number; quantity: number };

export type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totalCents: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const persist = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem('cart', JSON.stringify(next));
  };

  const addItem = (item: CartItem) => {
    const existing = items.find((i) => i.productId === item.productId);
    if (existing) {
      persist(items.map((i) => (i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i)));
    } else {
      persist([...items, item]);
    }
  };

  const removeItem = (productId: string) => persist(items.filter((i) => i.productId !== productId));

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(productId);
    persist(items.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  };

  const clear = () => persist([]);

  const totalCents = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const value = useMemo<CartContextType>(
    () => ({ items, addItem, removeItem, updateQuantity, clear, totalCents }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
