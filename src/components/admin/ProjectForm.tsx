'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ImageUpload from './ImageUpload';
import { Field, Input, Textarea, Select, PrimaryButton, SecondaryButton } from './Field';

type Project = {
  id?: string;
  title: string;
  description: string;
  location: string;
  status: string;
  imageUrl: string;
  featured: boolean;
  order: number;
};

const empty: Project = {
  title: '',
  description: '',
  location: '',
  status: 'En Cours',
  imageUrl: '',
  featured: true,
  order: 0,
};

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [data, setData] = useState<Project>(project ?? empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isEdit = !!project?.id;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isEdit ? `/api/projects/${project!.id}` : '/api/projects';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('save failed');
      toast.success(isEdit ? 'Projet mis à jour' : 'Projet créé');
      router.push('/admin/projects');
      router.refresh();
    } catch {
      toast.error('Erreur de sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm(`Supprimer le projet "${data.title}" ?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${project!.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Projet supprimé');
      router.push('/admin/projects');
      router.refresh();
    } catch {
      toast.error('Erreur de suppression');
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={save} className="bg-white p-8 lg:p-10 border border-slate-100 space-y-6 max-w-3xl">
      <Field label="Titre du projet">
        <Input
          required
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Sky Tower Business Center"
        />
      </Field>

      <Field label="Description">
        <Textarea
          required
          rows={4}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder="Description du projet…"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Lieu">
          <Input
            required
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            placeholder="Cotonou, Bénin"
          />
        </Field>

        <Field label="Statut">
          <Select
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
          >
            <option>En Cours</option>
            <option>Terminé</option>
            <option>Planifié</option>
            <option>Suspendu</option>
          </Select>
        </Field>
      </div>

      <ImageUpload
        label="Image du projet"
        value={data.imageUrl}
        onChange={(url) => setData({ ...data, imageUrl: url })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Ordre d'affichage">
          <Input
            type="number"
            value={data.order}
            onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })}
          />
        </Field>

        <Field label="Mettre à la une">
          <label className="flex items-center gap-3 mt-3">
            <input
              type="checkbox"
              checked={data.featured}
              onChange={(e) => setData({ ...data, featured: e.target.checked })}
              className="w-5 h-5 accent-secondary"
            />
            <span className="text-sm text-slate-600">
              Afficher dans la galerie principale
            </span>
          </label>
        </Field>
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? 'Enregistrement…' : isEdit ? 'Mettre à jour' : 'Créer le projet'}
        </PrimaryButton>
        <SecondaryButton type="button" onClick={() => router.push('/admin/projects')}>
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
