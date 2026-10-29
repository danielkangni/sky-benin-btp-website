import { prisma } from './prisma';

export async function getSiteContent() {
  const rows = await prisma.siteContent.findMany();
  return rows.reduce<Record<string, string>>((acc, r) => {
    acc[r.key] = r.value;
    return acc;
  }, {});
}

export async function getServices() {
  return prisma.service.findMany({ orderBy: { order: 'asc' } });
}

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { order: 'asc' } });
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
    take: 4,
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}
