'use client';

import { useEffect, useState } from 'react';

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="aspect-[3/4] overflow-hidden bg-slate-100 block group cursor-pointer"
          >
            <img
              src={src}
              alt={`${title} — photo ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Retour"
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-white flex items-center gap-2 font-bold uppercase tracking-widest text-xs cursor-pointer z-10"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
            Retour
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
                }}
                aria-label="Photo précédente"
                className="absolute left-2 md:left-8 text-white/70 hover:text-white cursor-pointer z-10"
              >
                <span className="material-symbols-outlined text-4xl">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
                }}
                aria-label="Photo suivante"
                className="absolute right-2 md:right-8 text-white/70 hover:text-white cursor-pointer z-10"
              >
                <span className="material-symbols-outlined text-4xl">chevron_right</span>
              </button>
            </>
          )}

          <img
            src={images[openIndex]}
            alt={`${title} — photo ${openIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[85vh] object-contain"
          />

          <span className="absolute bottom-4 md:bottom-8 text-white/60 text-xs font-bold uppercase tracking-widest">
            {openIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
