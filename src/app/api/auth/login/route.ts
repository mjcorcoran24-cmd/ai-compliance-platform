import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // In a real app, use bcrypt to compare hashed passwords
    if (user && user.password === password) {
      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
