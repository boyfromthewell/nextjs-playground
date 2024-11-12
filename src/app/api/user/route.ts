import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, image, provider, id, password } = body;

  if (provider === 'general') {
    try {
      const existUser = await prisma.user.findFirst({
        where: {
          id: String(id),
        },
      });
      if (existUser) {
        return NextResponse.json(
          { message: '이미 존재하는 유저' },
          { status: 400 },
        );
      } else {
        await prisma.user.create({
          data: {
            name,
            provider: 'general',
            id,
            password: await bcrypt.hash(password, 10),
          },
        });
        return NextResponse.json({}, { status: 200 });
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    try {
      const existUser = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (existUser) {
        await prisma.user.update({
          where: {
            id: existUser.id,
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
            id,
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
}
