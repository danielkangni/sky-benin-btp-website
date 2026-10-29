import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import PageHeader from '@/components/admin/PageHeader';

export const dynamic = 'force-dynamic';

export default async function ServicesAdminPage() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <PageHeader
        eyebrow="Gestion"
        title="Services"
        description="Définissez les expertises affichées en page d'accueil."
        action={
          <Link
            href="/admin/services/new"
            className="bg-secondary text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Nouveau service
          </Link>
        }
      />

      {services.length === 0 ? (
        <div className="bg-white p-12 text-center border border-slate-100">
          <span className="material-symbols-outlined text-6xl text-slate-300">engineering</span>
          <p className="text-slate-500 mt-4">Aucun service pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/admin/services/${s.id}`}
              className="bg-white p-8 border border-slate-100 hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 bg-primary group-hover:bg-secondary flex items-center justify-center text-white mb-6 transition-colors">
                <span className="material-symbols-outlined text-3xl">{s.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-3">{s.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
