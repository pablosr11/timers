import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const timers = await prisma.timer.findMany({
    where: { username: username.toLowerCase() },
    orderBy: { startDate: 'desc' },
  });

  return NextResponse.json(timers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { username, startDate, description } = body;

  if (!username || !startDate) {
    return NextResponse.json({ error: 'Username and start date are required' }, { status: 400 });
  }

  const timer = await prisma.timer.create({
    data: {
      username: username.toLowerCase(),
      startDate: new Date(startDate),
      description,
    },
  });

  return NextResponse.json(timer);
} 