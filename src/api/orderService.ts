import api from './apiClient';
import type { Product } from './productService';

export type OrderItem = { product: Product; quantity: number; priceAtPurchase: number };
export type Order = { _id: string; items: OrderItem[]; amount: number; currency: string; createdAt: string };

export async function getMyOrders(): Promise<{ success: boolean; data: Order[] }> {
  const { data } = await api.get('/orders/my');
  return data;
}
