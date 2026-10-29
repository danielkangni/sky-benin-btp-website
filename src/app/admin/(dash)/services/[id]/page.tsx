import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/admin/PageHeader';
import ServiceForm from '@/components/admin/ServiceForm';

export const dynamic = 'force-dynamic';

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();
  return (
    <div>
      <PageHeader eyebrow="Édition" title={service.title} />
      <ServiceForm service={service} />
    </div>
  );
}
