import { auth, signOut } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function LogoutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/admin/login' });
      }}
    >
      <button
        type="submit"
        className="w-full text-left flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-secondary/30 transition-colors"
      >
        <span className="material-symbols-outlined text-lg">logout</span>
        <span className="text-sm font-semibold">Déconnexion</span>
      </button>
    </form>
  );
}

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const links = [
    { href: '/admin', label: 'Tableau de bord', icon: 'dashboard' },
    { href: '/admin/projects', label: 'Projets', icon: 'apartment' },
    { href: '/admin/services', label: 'Services', icon: 'engineering' },
    { href: '/admin/hero', label: 'Section Hero', icon: 'image' },
    { href: '/admin/about', label: 'À Propos', icon: 'info' },
    { href: '/admin/contact', label: 'Contact', icon: 'mail' },
    { href: '/admin/footer', label: 'Pied de page', icon: 'foundation' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-primary text-white flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary flex items-center justify-center text-white font-black">
              SB
            </div>
            <div>
              <div className="text-sm font-black tracking-tight">SKY BENIN</div>
              <div className="text-[9px] font-bold text-secondary uppercase tracking-[0.2em]">
                Admin Panel
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 px-6 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">{l.icon}</span>
              <span className="text-sm font-semibold">{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 px-2 py-3">
          <div className="px-4 py-2 text-xs text-white/50">
            <div className="font-bold uppercase tracking-widest mb-1">Connecté</div>
            <div className="truncate">{session.user?.email}</div>
          </div>
          <LogoutButton />
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-secondary/30 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">open_in_new</span>
            <span className="text-sm font-semibold">Voir le site</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 lg:p-12">{children}</main>
    </div>
  );
}
