import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import ProjectGallery from '@/components/ProjectGallery';
import { getProjectById, getProjects, getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: 'Projet introuvable — Sky Benin BTP' };
  return {
    title: `${project.title} — Sky Benin BTP`,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, allProjects, content] = await Promise.all([
    getProjectById(id),
    getProjects(),
    getSiteContent(),
  ]);

  if (!project) notFound();

  const others = allProjects.filter((p) => p.id !== project.id).slice(0, 3);
  let gallery: string[] = [];
  try {
    gallery = JSON.parse(project.gallery);
  } catch {
    gallery = [];
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-white min-h-screen">
        <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-primary">
          <img
            src={project.imageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50"
          />
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-end pb-12">
            <Link
              href="/galerie"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold uppercase tracking-[0.3em] text-xs mb-6 hover:gap-3 transition-all w-fit"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Retour à la galerie
            </Link>
            <span className="inline-block bg-secondary text-white text-[10px] px-4 py-1.5 font-bold uppercase tracking-widest mb-4 w-fit">
              {project.status}
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">
              {project.title}
            </h1>
            <p className="text-white/80 font-medium flex items-center gap-2 mt-4 text-base">
              <span className="material-symbols-outlined text-secondary">location_on</span>
              {project.location}
            </p>
          </div>
        </section>

        <section className="py-lg">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">
              À propos du projet
            </span>
            <div className="mt-6 text-on-surface text-base md:text-lg leading-relaxed whitespace-pre-line">
              {project.description}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-outline-variant">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Localisation
                </span>
                <p className="text-primary font-bold mt-2">{project.location}</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Statut
                </span>
                <p className="text-primary font-bold mt-2">{project.status}</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Année
                </span>
                <p className="text-primary font-bold mt-2">
                  {new Date(project.createdAt).getFullYear()}
                </p>
              </div>
            </div>

            {gallery.length > 0 && (
              <div className="mt-12 pt-12 border-t border-outline-variant">
                <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">
                  Photos du chantier
                </span>
                <ProjectGallery images={gallery} title={project.title} />
              </div>
            )}

            <div className="mt-12 bg-primary text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Un projet similaire en tête ?
                </h3>
                <p className="text-white/70">
                  Discutons de votre cahier des charges et obtenez un devis sur mesure.
                </p>
              </div>
              <Link
                href="/#contact"
                className="group flex items-center gap-3 bg-secondary text-white px-6 py-3 md:px-8 md:py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-primary transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer w-fit"
              >
                Nous contacter
                <span className="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="py-lg bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-end justify-between mb-md gap-6 flex-wrap">
                <div>
                  <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">
                    Autres réalisations
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-primary mt-3 tracking-tight">
                    Découvrez nos autres projets
                  </h2>
                </div>
                <Link
                  href="/galerie"
                  className="group flex items-center gap-3 border-2 border-primary text-primary px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  Voir tout
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {others.map((p) => (
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
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block bg-secondary text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest mb-2">
                        {p.status}
                      </span>
                      <h3 className="text-white text-lg font-bold">{p.title}</h3>
                      <p className="text-white/70 text-sm mt-1">{p.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer
        about={content['footer.about'] ?? ''}
        copyright={content['footer.copyright'] ?? ''}
      />
    </>
  );
}
