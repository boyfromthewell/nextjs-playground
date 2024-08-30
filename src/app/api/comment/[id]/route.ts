import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  if (!id || !action) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: {
        ...(action === 'like' && { like: { increment: 1 } }),
        ...(action === 'dislike' && { disLike: { increment: 1 } }),
      },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
