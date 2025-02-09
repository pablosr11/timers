'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { Timer } from '@/types/timer';

type TimerContextType = {
  timers: Timer[];
  refreshTimers: (username: string) => Promise<void>;
};

const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ 
  children,
  initialTimers = [] 
}: { 
  children: React.ReactNode;
  initialTimers?: Timer[];
}) {
  const [timers, setTimers] = useState<Timer[]>(initialTimers);

  const refreshTimers = useCallback(async (username: string) => {
    const response = await fetch(`/api/timers?username=${username}`);
    const data = await response.json();
    setTimers(data);
  }, []);

  return (
    <TimerContext.Provider value={{ timers, refreshTimers }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimers() {
  const context = useContext(TimerContext);
  if (!context) throw new Error('useTimers must be used within a TimerProvider');
  return context;
} 