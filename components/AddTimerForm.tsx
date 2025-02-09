'use client';

import { useState } from 'react';
import { useTimers } from '@/contexts/TimerContext';

export function AddTimerForm({ username }: { username: string }) {
  const { refreshTimers } = useTimers();
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) return;

    try {
      await fetch('/api/timers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, startDate, description }),
      });
      await refreshTimers(username);
      setStartDate('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add timer:', error);
    }
  };

  return (
    <form 
      className="bg-white/40 backdrop-blur-sm rounded-2xl border border-blue-200/30 
        p-8 space-y-6 max-w-xl mx-auto shadow-[0_4px_20px_rgb(59,130,246,0.05)]"
      onSubmit={handleSubmit}
    >
      <div>
        <label 
          className="block text-sm font-medium text-blue-700/80 mb-2 tracking-wide"
        >
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full rounded-xl border-blue-200/50 border px-4 py-3
            focus:border-blue-400 focus:ring-blue-200 transition-all duration-300 
            bg-white/60 hover:bg-white/80 text-blue-900/80"
        />
      </div>
      
      <div>
        <label 
          className="block text-sm font-medium text-blue-700/80 mb-2 tracking-wide"
        >
          Description (optional)
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border-blue-200/50 border px-4 py-3
            focus:border-blue-400 focus:ring-blue-200 transition-all duration-300 
            bg-white/60 hover:bg-white/80 placeholder-blue-300"
          placeholder="e.g., Birthday"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white 
          px-8 py-3 rounded-xl font-medium tracking-wide
          transition-all duration-300 hover:from-blue-600 hover:to-blue-700
          hover:shadow-[0_4px_20px_rgb(59,130,246,0.2)]
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Add Timer
      </button>
    </form>
  );
} 