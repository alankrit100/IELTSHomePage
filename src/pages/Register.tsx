import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (e: any) {
      setError(e?.response?.data?.error?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600">{error}</p>}
        <button className="bg-black text-white px-4 py-2" type="submit">Create account</button>
      </form>
      <p className="mt-4">Already have an account? <Link to="/login" className="underline">Login</Link></p>
    </div>
  );
}
