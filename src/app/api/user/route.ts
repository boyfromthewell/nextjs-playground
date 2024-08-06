import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, image, provider } = body;

  try {
    await prisma.user.create({
      data: {
        email,
        name,
        image,
        provider,
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
