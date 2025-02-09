'use client';

import { useEffect, useState } from 'react';
import { calculateTimeDifference } from '@/utils/timeCalculator';

export function TimeDisplay({ startDate }: { startDate: string }) {
  const [elapsed, setElapsed] = useState<string>('');

  useEffect(() => {
    // Initial calculation
    setElapsed(calculateTimeDifference(startDate));

    // Update every second
    const interval = setInterval(() => {
      setElapsed(calculateTimeDifference(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  // Show nothing until client-side calculation is done
  if (!elapsed) return null;

  return (
    <div 
      className="font-mono text-2xl md:text-3xl text-blue-900/80 font-light tracking-tight
        group-hover:text-blue-800 transition-colors duration-300"
    >
      {elapsed}
    </div>
  );
} 