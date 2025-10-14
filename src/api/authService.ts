import api from './apiClient';

export type User = { id: string; name: string; email: string };
export type AuthResponse = { success: boolean; data: { user: User; token: string } };

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password });
  return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
  return data;
}

export async function getMe(): Promise<{ success: boolean; data: { user: User } }> {
  const { data } = await api.get('/auth/me');
  return data;
}
