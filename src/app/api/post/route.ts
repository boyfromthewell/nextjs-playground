import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const res = await prisma.post.create({
    data: { content: '포스트 내용' },
  });
  return NextResponse.json('ok');
}
