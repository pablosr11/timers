import { TimerList } from '@/components/TimerList';
import { AddTimerForm } from '@/components/AddTimerForm';
import { TimerProvider } from '@/contexts/TimerContext';
import { prisma } from '@/lib/db';

// Add dynamic metadata
export async function generateMetadata({ params }: { params: { username: string } }) {
  return {
    title: `${params.username}'s Timers`,
    description: 'Track time elapsed since important dates'
  };
}

async function getInitialTimers(username: string) {
  const timers = await prisma.timer.findMany({
    where: { username: username.toLowerCase() },
    orderBy: { startDate: 'desc' },
  });
  
  return timers.map(timer => ({
    ...timer,
    startDate: timer.startDate.toISOString(),
    username: timer.username,
    description: timer.description
  }));
}

export default async function UserProfile({ params }: { params: { username: string } }) {
  // Add caching headers
  const headers = {
    'Cache-Control': 'public, s-maxage=1, stale-while-revalidate=59'
  };

  const initialTimers = await getInitialTimers(params.username);

  return (
    <TimerProvider initialTimers={initialTimers}>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-6 sm:p-8 md:p-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-light text-blue-900/90 tracking-wide">
              {params.username}'s Timers
            </h1>
            <a 
              href="/" 
              className="text-blue-500 hover:text-blue-700 flex items-center transition-all duration-300 hover:-translate-x-1"
            >
              <svg 
                className="w-4 h-4 mr-1.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </a>
          </div>
          
          <AddTimerForm username={params.username} />
          <TimerList username={params.username} />
        </div>
      </main>
    </TimerProvider>
  );
} 