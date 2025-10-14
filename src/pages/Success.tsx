import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Payment Successful 🎉</h1>
      <p className="mb-4">Your stickers are now available in your library.</p>
      <Link to="/library" className="underline">Go to Library</Link>
    </div>
  );
}
