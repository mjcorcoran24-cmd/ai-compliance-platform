import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { auditId, controlId, status, comments, evidence } = await request.json();

    const entry = await prisma.auditEntry.upsert({
      where: {
        auditId_controlId: {
          auditId,
          controlId,
        },
      },
      update: {
        status,
        comments,
      },
      create: {
        auditId,
        controlId,
        status,
        comments,
      },
    });

    if (evidence) {
      await prisma.evidence.create({
        data: {
          auditEntryId: entry.id,
          content: evidence.content,
          type: evidence.type,
        },
      });
    }

    return NextResponse.json(entry);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update audit entry' }, { status: 500 });
  }
}
