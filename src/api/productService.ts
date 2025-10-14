import api from './apiClient';

export type Product = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  price: number; // cents
  tags?: string[];
};

export async function listProducts(params?: { q?: string; limit?: number; page?: number }): Promise<{ success: boolean; data: Product[]; total: number }> {
  const { data } = await api.get('/products', { params });
  return data;
}

export async function getProduct(id: string): Promise<{ success: boolean; data: Product }> {
  const { data } = await api.get(`/products/${id}`);
  return data;
}
