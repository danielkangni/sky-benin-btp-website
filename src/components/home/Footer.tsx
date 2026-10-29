'use client';

export default function Footer({
  about,
  copyright,
}: {
  about: string;
  copyright: string;
}) {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center text-white font-black">
                SB
              </div>
              <span className="text-2xl font-black tracking-tighter">SKY BENIN</span>
            </div>
            <p className="text-white/50 leading-relaxed mb-6">{about}</p>
            <div className="flex gap-4">
              {['link', 'link'].map((_, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all hover:scale-110"
                >
                  <span className="material-symbols-outlined text-sm">link</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-secondary">
              Expertises
            </h5>
            <ul className="space-y-3">
              {['Construction', 'Travaux Publics', 'Génie Civil', 'Rénovation'].map((l) => (
                <li key={l}>
                  <a
                    href="#services"
                    className="text-white/60 hover:text-white transition-all flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all group-hover:w-3" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-secondary">
              Société
            </h5>
            <ul className="space-y-3">
              {['À Propos', 'Réalisations', 'Sécurité & HSE', 'Carrières'].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-all flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all group-hover:w-3" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-secondary">
              Newsletter
            </h5>
            <p className="text-white/50 mb-6 text-sm">
              Abonnez-vous pour suivre l'évolution de nos chantiers phares.
            </p>
            <div className="flex border-b border-white/20 pb-2">
              <input
                type="email"
                placeholder="Votre Email"
                className="bg-transparent border-none p-0 w-full focus:ring-0 outline-none text-sm placeholder:text-white/30"
              />
              <button className="text-secondary hover:text-white transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs tracking-wider">{copyright}</p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-secondary transition-colors">
              Politique de Confidentialité
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Mentions Légales
            </a>
            <a href="/admin" className="hover:text-secondary transition-colors">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
