'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#services', label: 'Services' },
    { href: '#projets', label: 'Projets' },
    { href: '#about', label: 'À Propos' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'h-20 shadow-xl bg-white/95' : 'h-24 bg-white/90'
      } backdrop-blur-md border-b border-slate-100 flex items-center`}
    >
      <nav className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-black text-xl group-hover:bg-secondary transition-colors duration-500">
            SB
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-primary tracking-tighter leading-none">
              SKY BENIN
            </span>
            <span className="text-[10px] font-bold text-secondary tracking-[0.2em] uppercase">
              Construction
            </span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-slate-600 font-semibold text-sm uppercase tracking-widest hover:text-primary transition-colors group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-block relative overflow-hidden bg-secondary text-white px-6 py-3 font-bold text-xs uppercase tracking-widest group transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Demander un devis</span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          <a
            href="/admin/login"
            title="Espace administrateur"
            aria-label="Espace administrateur"
            className="hidden md:flex w-11 h-11 items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </a>

          <button
            className="lg:hidden text-primary"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {open ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl">
          <div className="flex flex-col px-6 py-6 gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-primary font-semibold uppercase tracking-widest text-sm py-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-secondary text-white px-6 py-3 font-bold text-xs uppercase tracking-widest text-center"
            >
              Demander un devis
            </a>
            <a
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="border-2 border-primary text-primary px-6 py-3 font-bold text-xs uppercase tracking-widest text-center inline-flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              Espace Admin
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
