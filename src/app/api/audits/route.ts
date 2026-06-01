import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const audits = await prisma.audit.findMany({
      include: {
        framework: true,
        auditor: {
          select: { name: true, email: true }
        },
        _count: {
          select: { entries: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(audits);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch audits' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, frameworkId, auditorId } = await request.json();

    const audit = await prisma.audit.create({
      data: {
        name,
        frameworkId,
        auditorId,
      },
    });

    return NextResponse.json(audit);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create audit' }, { status: 500 });
  }
}
