import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

const Schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
  consent: z.literal(true),
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Trop de demandes, réessayez plus tard.' }, { status: 429 });
  }

  const body = await req.json();
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const { name, email, message } = parsed.data;
  await prisma.contactMessage.create({ data: { name, email, message } });

  return NextResponse.json({ ok: true });
}
