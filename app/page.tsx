'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.match(/^[a-zA-Z0-9_-]+$/)) {
      setError('Username can only contain letters, numbers, underscores and dashes');
      return;
    }
    router.push(`/${username.toLowerCase()}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-light text-blue-900/90 text-center mb-8">
          Time Tracker
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full rounded-xl border-blue-200/50 border px-4 py-3
              focus:border-blue-400 focus:ring-blue-200 transition-all duration-300 
              bg-white/60 hover:bg-white/80"
          />
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white 
              px-8 py-3 rounded-xl font-medium tracking-wide
              transition-all duration-300 hover:from-blue-600 hover:to-blue-700
              hover:shadow-[0_4px_20px_rgb(59,130,246,0.2)]"
          >
            Go to Timer Page
          </button>
        </form>
      </div>
    </main>
  );
} 