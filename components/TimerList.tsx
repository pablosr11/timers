'use client';

import { useEffect, useState } from 'react';
import { useTimers } from '@/contexts/TimerContext';
import { TimeDisplay } from './TimeDisplay';
import { DateDisplay } from './DateDisplay';
import { EditTimerDialog } from './EditTimerDialog';

interface Timer {
  id: string;
  startDate: string;
  description: string | null;
  username: string;
}

export function TimerList({ username }: { username: string }) {
  const { timers, refreshTimers } = useTimers();
  const [editingTimer, setEditingTimer] = useState<Timer | null>(null);

  useEffect(() => {
    refreshTimers(username);
  }, [username, refreshTimers]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this timer?')) return;
    
    try {
      await fetch(`/api/timers/${id}`, { method: 'DELETE' });
      refreshTimers(username);
    } catch (error) {
      console.error('Failed to delete timer:', error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {timers.map(timer => (
          <div 
            key={timer.id} 
            className="bg-gradient-to-br from-white via-blue-50/10 to-blue-100/20 
              rounded-2xl p-8 border border-blue-200/30
              transform transition-all duration-300 hover:scale-[1.03] 
              hover:shadow-[0_8px_30px_rgb(59,130,246,0.1)] 
              backdrop-blur-sm group relative"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setEditingTimer(timer)}
                className="text-blue-500 hover:text-blue-700 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(timer.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <div 
              className="text-sm font-medium text-blue-500/90 mb-4 uppercase tracking-wider
                group-hover:text-blue-600 transition-colors duration-300"
            >
              {timer.description || 'Untitled Timer'}
            </div>
            <TimeDisplay startDate={timer.startDate} />
            <div 
              className="text-xs text-blue-400/75 mt-6 flex items-center 
                group-hover:text-blue-500/75 transition-colors duration-300"
            >
              <svg 
                className="w-3 h-3 mr-1.5"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Started: <DateDisplay date={timer.startDate} />
            </div>
          </div>
        ))}
      </div>
      {editingTimer && (
        <EditTimerDialog
          timer={editingTimer}
          isOpen={true}
          onClose={() => setEditingTimer(null)}
        />
      )}
    </>
  );
} 