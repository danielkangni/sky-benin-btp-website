import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { getProjects, getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Galerie Complète — Sky Benin BTP',
  description:
    "Découvrez l'ensemble de nos réalisations BTP au Bénin : construction, travaux publics, génie civil et rénovation.",
};

export default async function GaleriePage() {
  const [projects, content] = await Promise.all([getProjects(), getSiteContent()]);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-xl bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-lg">
            <div className="max-w-2xl">
              <Link
                href="/#projets"
                className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-4 hover:gap-3 transition-all"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Retour à l'accueil
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
                Galerie Complète de nos Réalisations
              </h1>
              <p className="text-on-surface-variant mt-4 text-base md:text-lg">
                {projects.length} projet{projects.length > 1 ? 's' : ''} livré
                {projects.length > 1 ? 's' : ''} à travers le Bénin.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group flex items-center gap-3 bg-secondary text-white px-6 py-3 md:px-8 md:py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              Demander un devis
              <span className="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="bg-white border border-outline-variant p-16 text-center">
              <span className="material-symbols-outlined text-6xl text-outline mb-4">
                photo_library
              </span>
              <p className="text-on-surface-variant">
                Aucun projet à afficher pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projets/${p.id}`}
                  className="relative group overflow-hidden bg-white shadow-xl block cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <span className="inline-block bg-secondary text-white text-[10px] px-4 py-1.5 font-bold uppercase tracking-widest mb-3">
                      {p.status}
                    </span>
                    <h2 className="text-white text-xl md:text-2xl font-bold mb-2">{p.title}</h2>
                    <p className="text-white/70 font-medium flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-secondary text-sm">
                        location_on
                      </span>
                      {p.location}
                    </p>
                  </div>

                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">arrow_outward</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer
        about={content['footer.about'] ?? ''}
        copyright={content['footer.copyright'] ?? ''}
      />
    </>
  );
}
