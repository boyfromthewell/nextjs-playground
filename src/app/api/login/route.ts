import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, password } = body;
  console.log('id', id);
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (
    user &&
    (await bcrypt.compare(String(password), user.password as string))
  ) {
    const { password, ...info } = user;
    return NextResponse.json({ ...info }, { status: 200 });
  } else return NextResponse.json(null, { status: 400 });
}
