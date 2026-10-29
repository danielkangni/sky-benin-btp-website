'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function Services({ services }: { services: Service[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.svc-header',
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        },
      );
      gsap.fromTo(
        '.svc-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.svc-grid',
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        },
      );
      ScrollTrigger.refresh();
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={ref} className="py-xl bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-lg svc-header">
          <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">
            Nos Expertises
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mt-4 max-w-2xl mx-auto leading-tight tracking-tight">
            Solutions de Construction Intégrées &amp; Innovantes
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-6" />
        </div>

        <div className="svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {services.map((s) => (
            <div
              key={s.id}
              className="svc-card card-hover-effect bg-surface-bright p-8 md:p-10 border border-slate-100 group relative overflow-hidden flex flex-col"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

              <div className="w-20 h-20 flex items-center justify-center bg-white shadow-sm mb-8 group-hover:bg-primary transition-colors duration-500 relative z-10 flex-shrink-0">
                <span className="material-symbols-outlined !text-5xl text-secondary group-hover:text-white transition-all duration-500 group-hover:rotate-12 leading-none">
                  {s.icon}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300 relative z-10">
                {s.title}
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed relative z-10 flex-grow">
                {s.description}
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-primary font-bold uppercase text-xs tracking-widest hover:text-secondary transition-colors relative z-10 group/link mt-auto"
              >
                En savoir plus
                <span className="material-symbols-outlined !text-lg transition-transform duration-300 group-hover/link:translate-x-2 leading-none">
                  arrow_forward
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
