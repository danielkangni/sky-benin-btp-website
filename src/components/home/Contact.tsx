'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function Contact({
  address,
  phone,
  email,
  imageUrl,
}: {
  address: string;
  phone: string;
  email: string;
  imageUrl: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated submit — wire up to a real endpoint or email service
    setTimeout(() => {
      toast.success('Message envoyé ! Nous vous répondrons sous 24h.');
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 800);
  };

  return (
    <section id="contact" ref={ref} className="py-xl bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="contact-card bg-primary flex flex-col lg:flex-row shadow-2xl">
          <div className="lg:w-1/2 p-md md:p-lg lg:p-xl bg-white text-primary">
            <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">
              Contactez-nous
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 tracking-tight">
              Prêt à Lancer votre Projet ?
            </h2>
            <p className="text-slate-500 mb-10">
              Nos experts sont à votre disposition pour une étude personnalisée et un devis adapté à
              vos besoins spécifiques.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                required
                name="name"
                type="text"
                placeholder="Nom Complet"
                className="w-full border-b-2 border-slate-200 focus:border-secondary transition-all duration-300 py-4 bg-transparent outline-none font-medium placeholder:text-slate-300"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Adresse Email"
                className="w-full border-b-2 border-slate-200 focus:border-secondary transition-all duration-300 py-4 bg-transparent outline-none font-medium placeholder:text-slate-300"
              />
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Description du Projet"
                className="w-full border-b-2 border-slate-200 focus:border-secondary transition-all duration-300 py-4 bg-transparent outline-none font-medium placeholder:text-slate-300 resize-none"
              />
              <button
                disabled={submitting}
                type="submit"
                className="w-full bg-secondary text-white py-5 font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary transition-all duration-500 shadow-lg hover:shadow-2xl active:scale-[0.98] relative overflow-hidden group/btn disabled:opacity-50"
              >
                <span className="relative z-10">
                  {submitting ? 'Envoi…' : 'Envoyer la Demande'}
                </span>
              </button>
            </form>
          </div>

          <div className="lg:w-1/2 relative min-h-[500px] group overflow-hidden">
            <img
              src={imageUrl}
              alt="Map Overlay"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay grayscale group-hover:scale-110 transition-transform duration-[3s]"
            />
            <div className="absolute inset-0 bg-primary/30" />
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
              <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 shadow-2xl max-w-sm w-full border-t-4 border-secondary transition-transform duration-500 group-hover:-translate-y-2">
                <h4 className="text-2xl font-bold text-primary mb-6">Notre Siège</h4>
                <div className="space-y-6">
                  <div className="flex gap-4 group/item">
                    <span className="material-symbols-outlined text-secondary transition-transform group-hover/item:scale-125">
                      location_on
                    </span>
                    <p className="text-slate-700 whitespace-pre-line">{address}</p>
                  </div>
                  <div className="flex gap-4 items-center group/item">
                    <span className="material-symbols-outlined text-secondary transition-transform group-hover/item:scale-125">
                      phone
                    </span>
                    <p className="text-slate-700 font-bold">{phone}</p>
                  </div>
                  <div className="flex gap-4 items-center group/item">
                    <span className="material-symbols-outlined text-secondary transition-transform group-hover/item:scale-125">
                      mail
                    </span>
                    <p className="text-slate-700">{email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
