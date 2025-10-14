import api from './apiClient';

export type CartItemPayload = { productId: string; quantity: number };

export async function createCheckoutSession(items: CartItemPayload[], success_url?: string, cancel_url?: string): Promise<{ success: boolean; url: string; id: string }> {
  const { data } = await api.post('/payments/create-checkout-session', {
    items,
    success_url,
    cancel_url,
  });
  return data;
}
