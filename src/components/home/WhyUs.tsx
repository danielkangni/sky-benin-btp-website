'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function WhyUs({
  title,
  subtitle,
  years,
  imageUrl,
}: {
  title: string;
  subtitle: string;
  years: string;
  imageUrl: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trig = (trigger: gsap.DOMTarget) => ({
        trigger,
        start: 'top 90%',
        toggleActions: 'play none none none' as const,
        once: true,
      });

      gsap.fromTo(
        '.why-text',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: trig(ref.current!) },
      );
      gsap.fromTo(
        '.why-img',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: trig(ref.current!) },
      );
      gsap.fromTo(
        '.why-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: trig('.why-list'),
        },
      );
      gsap.fromTo(
        '.why-badge',
        { scale: 0, rotation: -20, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          delay: 0.5,
          scrollTrigger: trig('.why-img'),
        },
      );
      ScrollTrigger.refresh();
    }, ref);
    return () => ctx.revert();
  }, []);

  const items = [
    {
      icon: 'location_on',
      title: 'Expertise Locale & Terrain',
      desc: 'Une connaissance approfondie des sols et des normes spécifiques du Bénin pour des fondations inébranlables.',
    },
    {
      icon: 'verified',
      title: 'Qualité Sans Compromis',
      desc: 'Utilisation de matériaux certifiés et respect rigoureux des standards de sécurité internationaux (ISO).',
    },
    {
      icon: 'schedule',
      title: 'Respect Absolu des Délais',
      desc: 'Planification optimisée et gestion de projet Agile pour garantir une livraison ponctuelle, à chaque fois.',
    },
  ];

  return (
    <section id="about" ref={ref} className="py-xl bg-primary overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-container/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-md lg:gap-lg items-center relative">
        <div className="why-text relative z-10">
          <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">
            Pourquoi Nous Choisir
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-8 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-white/70 mb-12 leading-relaxed">{subtitle}</p>

          <div className="why-list space-y-8">
            {items.map((it, i) => (
              <div key={i} className="why-item flex items-start gap-6 group cursor-default">
                <div className="w-14 h-14 rounded bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:scale-110 transition-all duration-500">
                  <span className="material-symbols-outlined text-secondary group-hover:text-white transition-colors">
                    {it.icon}
                  </span>
                </div>
                <div>
                  <h5 className="font-semibold text-white text-xl mb-2 group-hover:text-secondary transition-colors">
                    {it.title}
                  </h5>
                  <p className="text-white/60">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="why-img relative lg:pl-12">
          <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-sm group">
            <img
              src={imageUrl}
              alt="Construction Manager"
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1.5s]"
            />
            <div className="absolute inset-0 border-[20px] border-secondary/20 m-6 pointer-events-none transition-all duration-700 group-hover:border-secondary/40 group-hover:scale-95" />
          </div>

          <div className="why-badge absolute -bottom-8 -left-8 z-20 bg-secondary p-8 md:p-10 text-white shadow-2xl transition-transform duration-700 hover:scale-110 cursor-default">
            <div className="text-5xl md:text-6xl font-black mb-2">{years}</div>
            <div className="text-xs uppercase tracking-[0.2em] font-bold">
              Années d'Excellence
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
