'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  imageUrl: string;
}

export default function Projects({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.proj-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proj-header',
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>('.proj-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true,
            },
          },
        );
        const img = card.querySelector('.proj-img');
        if (img) {
          gsap.to(img, {
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
            yPercent: -10,
            ease: 'none',
          });
        }
      });
      ScrollTrigger.refresh();
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projets" ref={ref} className="py-xl bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="proj-header flex flex-col md:flex-row justify-between items-start md:items-end mb-lg gap-8">
          <div className="max-w-xl">
            <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">
              Notre Portefeuille
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mt-4 leading-tight tracking-tight">
              Projets Phares &amp; Réalisations Iconiques au Bénin
            </h2>
          </div>
          <a
            href="/galerie"
            className="group flex items-center gap-3 border-2 border-primary text-primary px-6 py-3 md:px-8 md:py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Galerie Complète
            <span className="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform">
              grid_view
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((p) => (
            <div
              key={p.id}
              className="proj-card relative group overflow-hidden bg-white shadow-xl"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="proj-img w-full h-[110%] object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <span className="inline-block bg-secondary text-white text-[10px] px-4 py-1.5 font-bold uppercase tracking-widest mb-4">
                  {p.status}
                </span>
                <h4 className="text-white text-2xl md:text-3xl font-bold mb-2">{p.title}</h4>
                <p className="text-white/70 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    location_on
                  </span>
                  {p.location}
                </p>
              </div>

              <a
                href={`/projets/${p.id}`}
                aria-label={`En savoir plus sur ${p.title}`}
                className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors">
                  <span className="material-symbols-outlined">open_in_new</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
