'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const res = await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      toast.error('Identifiants invalides');
    } else {
      toast.success('Connexion réussie');
      router.push('/admin');
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-container/40 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md bg-white shadow-2xl">
        <div className="p-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-black">
              SB
            </div>
            <div>
              <div className="text-xl font-black text-primary tracking-tight">SKY BENIN</div>
              <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                Administration
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-primary mb-2">Connexion Admin</h1>
          <p className="text-slate-500 text-sm mb-8">
            Accédez à votre espace de gestion de contenu.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                Email
              </label>
              <input
                required
                name="email"
                type="email"
                defaultValue="admin@gmail.com"
                className="w-full border border-slate-200 focus:border-secondary transition-colors px-4 py-3 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                Mot de passe
              </label>
              <input
                required
                name="password"
                type="password"
                className="w-full border border-slate-200 focus:border-secondary transition-colors px-4 py-3 outline-none"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-secondary text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-primary transition-all disabled:opacity-50"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-secondary">
              ← Retour au site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
