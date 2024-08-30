import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { videoId, userId, content } = body;

  try {
    let video = await prisma.video.findUnique({
      where: { videoId },
    });

    if (!video) {
      await prisma.video.create({
        data: { videoId },
      });
    }

    const newComment = await prisma.comment.create({
      data: {
        video: {
          connect: { videoId },
        },
        userId,
        content,
      },
    });
    return NextResponse.json(newComment, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const videoId = url.searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'videoId is required' }, { status: 400 });
  }

  try {
    const comments = await prisma.video.findUnique({
      where: { videoId },
      include: { comments: true },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
