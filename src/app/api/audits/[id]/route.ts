import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const audit = await prisma.audit.findUnique({
      where: { id },
      include: {
        framework: {
          include: {
            controls: {
              orderBy: { code: 'asc' },
            },
          },
        },
        entries: {
          include: {
            evidence: true,
          },
        },
      },
    });

    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    return NextResponse.json(audit);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch audit' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    const audit = await prisma.audit.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(audit);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update audit' }, { status: 500 });
  }
}
