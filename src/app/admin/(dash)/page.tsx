import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [projectCount, serviceCount] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
  ]);

  const cards = [
    {
      label: 'Projets',
      count: projectCount,
      href: '/admin/projects',
      icon: 'apartment',
      color: 'bg-secondary',
    },
    {
      label: 'Services',
      count: serviceCount,
      href: '/admin/services',
      icon: 'engineering',
      color: 'bg-primary',
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">
          Tableau de bord
        </span>
        <h1 className="text-4xl font-bold text-primary mt-2 tracking-tight">
          Bienvenue dans votre espace
        </h1>
        <p className="text-slate-500 mt-2">
          Gérez le contenu de votre site Sky Benin sans toucher au code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="bg-white p-8 border border-slate-100 hover:shadow-2xl transition-all group"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  {c.label}
                </div>
                <div className="text-5xl font-black text-primary group-hover:text-secondary transition-colors">
                  {c.count}
                </div>
              </div>
              <div className={`w-14 h-14 ${c.color} flex items-center justify-center text-white`}>
                <span className="material-symbols-outlined text-3xl">{c.icon}</span>
              </div>
            </div>
            <div className="mt-6 text-xs font-bold uppercase tracking-widest text-secondary group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              Gérer
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-primary text-white p-10">
        <h2 className="text-2xl font-bold mb-4">Modifier le contenu de la page d'accueil</h2>
        <p className="text-white/70 mb-8 max-w-xl">
          Personnalisez chaque section visible sur le site public depuis cet espace.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: '/admin/hero', label: 'Section Hero', icon: 'image' },
            { href: '/admin/about', label: 'À Propos / Pourquoi nous', icon: 'info' },
            { href: '/admin/contact', label: 'Coordonnées', icon: 'mail' },
            { href: '/admin/footer', label: 'Pied de page', icon: 'foundation' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 bg-white/5 hover:bg-secondary p-4 transition-colors"
            >
              <span className="material-symbols-outlined">{l.icon}</span>
              <span className="text-sm font-semibold">{l.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
