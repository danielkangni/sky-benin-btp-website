import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const Schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  status: z.string().min(1),
  imageUrl: z.string().min(1),
  featured: z.boolean().optional(),
  order: z.number().int().optional(),
});

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  const created = await prisma.project.create({ data: parsed.data });
  return NextResponse.json(created);
}
