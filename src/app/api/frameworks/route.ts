import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const frameworks = await prisma.framework.findMany();
    return NextResponse.json(frameworks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch frameworks' }, { status: 500 });
  }
}
