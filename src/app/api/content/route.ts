import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const Schema = z.object({
  updates: z.array(z.object({ key: z.string().min(1), value: z.string() })),
});

export async function GET() {
  return NextResponse.json(await prisma.siteContent.findMany());
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

  await prisma.$transaction(
    parsed.data.updates.map((u) =>
      prisma.siteContent.upsert({
        where: { key: u.key },
        update: { value: u.value },
        create: { key: u.key, value: u.value },
      }),
    ),
  );
  return NextResponse.json({ ok: true });
}
