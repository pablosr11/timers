'use client';

import { useState, useEffect } from 'react';
import { useTimers } from '@/contexts/TimerContext';
import type { Timer } from '@/types/timer';

interface EditTimerDialogProps {
  timer: Timer;
  onClose: () => void;
  isOpen: boolean;
}

export function EditTimerDialog({ timer, onClose, isOpen }: EditTimerDialogProps) {
  const { refreshTimers } = useTimers();
  const [startDate, setStartDate] = useState(timer.startDate.split('T')[0]);
  const [description, setDescription] = useState(timer.description || '');

  useEffect(() => {
    setStartDate(timer.startDate.split('T')[0]);
    setDescription(timer.description || '');
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`/api/timers/${timer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, description }),
      });
      await refreshTimers(timer.username);
      onClose();
    } catch (error) {
      console.error('Failed to update timer:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-xl font-medium text-blue-900/80 mb-4">Edit Timer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-700/80 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border-blue-200/50 border px-4 py-2
                focus:border-blue-400 focus:ring-blue-200 transition-all duration-300 
                bg-white/60 hover:bg-white/80 text-blue-900/80"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700/80 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border-blue-200/50 border px-4 py-2
                focus:border-blue-400 focus:ring-blue-200 transition-all duration-300 
                bg-white/60 hover:bg-white/80 placeholder-blue-300"
              placeholder="e.g., Birthday"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 