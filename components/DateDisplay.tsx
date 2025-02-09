'use client';

import { useEffect, useState } from 'react';

export function DateDisplay({ date }: { date: string }) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleDateString());
  }, [date]);

  // Don't render anything until client-side
  if (!formattedDate) return null;

  return <span>{formattedDate}</span>;
} 