'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  badge: string;
  title: string;
  subtitle: string;
  cta1: string;
  cta2: string;
  imageUrl: string;
}

export default function Hero({ badge, title, subtitle, cta1, cta2, imageUrl }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8 })
        .from('.hero-title-word', { y: 80, opacity: 0, duration: 1, stagger: 0.08 }, '-=0.4')
        .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-cta', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.5')
        .from('.hero-scroll', { y: -20, opacity: 0, duration: 0.6 }, '-=0.3');

      // Parallax
      const onScroll = () => {
        if (!bgRef.current) return;
        const y = window.scrollY;
        if (y < window.innerHeight) {
          bgRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.05)`;
        }
      };
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, ref);
    return () => ctx.revert();
  }, []);

  // Split title into words for stagger
  const words = title.split(' ');

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex items-center pt-24"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src={imageUrl}
          alt="Construction"
          className="w-full h-[120%] object-cover absolute top-0 left-0"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-transparent" />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <div className="hero-badge inline-flex items-center gap-3 bg-secondary/10 backdrop-blur-sm border border-secondary/30 px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary text-xs font-bold uppercase tracking-widest">
              {badge}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="hero-title-word inline-block mr-3">{w}</span>
              </span>
            ))}
          </h1>

          <p className="hero-subtitle text-lg md:text-xl text-white/80 mb-12 max-w-xl leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 md:gap-6">
            <a
              href="#projets"
              className="hero-cta group relative px-8 md:px-10 py-4 md:py-5 bg-secondary text-white font-bold text-xs uppercase tracking-widest overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">{cta1}</span>
              <div className="absolute inset-0 bg-white/15 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </a>
            <a
              href="#services"
              className="hero-cta group px-8 md:px-10 py-4 md:py-5 border-2 border-white/40 text-white font-bold text-xs uppercase tracking-widest hover:border-white transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
            >
              {cta2}
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/60">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
