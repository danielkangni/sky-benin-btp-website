import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

export default function LegalPageShell({
  title,
  footerAbout,
  footerCopyright,
  children,
}: {
  title: string;
  footerAbout: string;
  footerCopyright: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-bold uppercase tracking-[0.3em] text-xs mb-10"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Retour à l&apos;accueil
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-8">{title}</h1>

          <div className="bg-amber-50 border border-amber-300 text-amber-900 text-sm px-5 py-4 mb-10">
            <strong>Brouillon — document non finalisé.</strong> Ce texte est un gabarit à
            compléter avec les informations réelles de Sky Benin BTP et à faire valider par un
            juriste avant publication. Ne pas considérer comme engageant tant que les champs
            entre crochets n&apos;ont pas été remplis.
          </div>

          <div className="prose prose-slate max-w-none text-on-surface leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </main>
      <Footer about={footerAbout} copyright={footerCopyright} />
    </>
  );
}
