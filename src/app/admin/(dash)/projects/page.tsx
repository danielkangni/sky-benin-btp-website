import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import PageHeader from '@/components/admin/PageHeader';

export const dynamic = 'force-dynamic';

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <PageHeader
        eyebrow="Gestion"
        title="Projets"
        description="Ajoutez, modifiez ou supprimez les réalisations affichées sur le site."
        action={
          <Link
            href="/admin/projects/new"
            className="bg-secondary text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Nouveau projet
          </Link>
        }
      />

      {projects.length === 0 ? (
        <div className="bg-white p-12 text-center border border-slate-100">
          <span className="material-symbols-outlined text-6xl text-slate-300">apartment</span>
          <p className="text-slate-500 mt-4">Aucun projet pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/admin/projects/${p.id}`}
              className="bg-white border border-slate-100 hover:shadow-2xl transition-all group overflow-hidden"
            >
              <div className="aspect-video overflow-hidden bg-slate-100">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-secondary text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest">
                    {p.status}
                  </span>
                  {p.featured && (
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">
                      ★ À la une
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {p.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
