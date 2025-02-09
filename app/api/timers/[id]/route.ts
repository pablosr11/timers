import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { startDate, description } = body;

  const timer = await prisma.timer.update({
    where: { id: params.id },
    data: {
      startDate: new Date(startDate),
      description,
    },
  });

  return NextResponse.json(timer);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.timer.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 204 });
} 