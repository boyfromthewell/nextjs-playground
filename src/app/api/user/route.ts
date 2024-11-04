import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, image, provider } = body;

  try {
    const existUser = await prisma.user.findFirst({
      where: {
        name,
        provider,
      },
    });

    if (existUser) {
      await prisma.user.update({
        where: {
          email: existUser.email,
          name: existUser.name,
          image: existUser.image,
        },
        data: {
          email,
          name,
          image,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          email,
          name,
          image,
          provider,
        },
      });
    }
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
