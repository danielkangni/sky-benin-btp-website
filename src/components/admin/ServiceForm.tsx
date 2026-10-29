'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Field, Input, Textarea, Select, PrimaryButton, SecondaryButton } from './Field';

type Service = {
  id?: string;
  title: string;
  description: string;
  icon: string;
  order: number;
};

const empty: Service = { title: '', description: '', icon: 'architecture', order: 0 };

const ICONS = [
  'architecture',
  'engineering',
  'home_repair_service',
  'foundation',
  'apartment',
  'construction',
  'roofing',
  'precision_manufacturing',
  'design_services',
  'verified',
  'shield',
  'eco',
  'bolt',
  'water_drop',
];

export default function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const [data, setData] = useState<Service>(service ?? empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isEdit = !!service?.id;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isEdit ? `/api/services/${service!.id}` : '/api/services';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success(isEdit ? 'Service mis à jour' : 'Service créé');
      router.push('/admin/services');
      router.refresh();
    } catch {
      toast.error('Erreur de sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm(`Supprimer "${data.title}" ?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/services/${service!.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Supprimé');
      router.push('/admin/services');
      router.refresh();
    } catch {
      toast.error('Erreur');
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={save} className="bg-white p-8 lg:p-10 border border-slate-100 space-y-6 max-w-3xl">
      <Field label="Titre du service">
        <Input
          required
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </Field>

      <Field label="Description">
        <Textarea
          required
          rows={4}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </Field>

      <Field label="Icône (Material Symbols)">
        <Select value={data.icon} onChange={(e) => setData({ ...data, icon: e.target.value })}>
          {ICONS.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </Select>
        <div className="mt-3 flex items-center gap-3">
          <div className="w-12 h-12 bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">{data.icon}</span>
          </div>
          <span className="text-xs text-slate-500">Aperçu de l'icône</span>
        </div>
      </Field>

      <Field label="Ordre d'affichage">
        <Input
          type="number"
          value={data.order}
          onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })}
        />
      </Field>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? 'Enregistrement…' : isEdit ? 'Mettre à jour' : 'Créer le service'}
        </PrimaryButton>
        <SecondaryButton type="button" onClick={() => router.push('/admin/services')}>
          Annuler
        </SecondaryButton>
        {isEdit && (
          <button
            type="button"
            onClick={remove}
            disabled={deleting}
            className="ml-auto text-red-600 hover:text-red-800 px-6 py-3 font-bold uppercase tracking-widest text-xs disabled:opacity-50"
          >
            {deleting ? 'Suppression…' : 'Supprimer'}
          </button>
        )}
      </div>
    </form>
  );
}
