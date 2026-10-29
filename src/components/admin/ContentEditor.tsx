'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ImageUpload from './ImageUpload';
import { Field, Input, Textarea, PrimaryButton } from './Field';

export type ContentField = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image';
  hint?: string;
};

export default function ContentEditor({
  fields,
  initial,
}: {
  fields: ContentField[];
  initial: Record<string, string>;
}) {
  const router = useRouter();
  const [data, setData] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const updates = fields.map((f) => ({ key: f.key, value: data[f.key] ?? '' }));
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });
      if (!res.ok) throw new Error();
      toast.success('Contenu mis à jour');
      router.refresh();
    } catch {
      toast.error('Erreur de sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="bg-white p-8 lg:p-10 border border-slate-100 space-y-6 max-w-3xl">
      {fields.map((f) => (
        <div key={f.key}>
          {f.type === 'image' ? (
            <ImageUpload
              label={f.label}
              value={data[f.key] ?? ''}
              onChange={(url) => setData({ ...data, [f.key]: url })}
            />
          ) : (
            <Field label={f.label}>
              {f.type === 'textarea' ? (
                <Textarea
                  rows={4}
                  value={data[f.key] ?? ''}
                  onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
                />
              ) : (
                <Input
                  value={data[f.key] ?? ''}
                  onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
                />
              )}
              {f.hint && <p className="text-xs text-slate-400 mt-2">{f.hint}</p>}
            </Field>
          )}
        </div>
      ))}

      <div className="pt-4 border-t border-slate-100">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </PrimaryButton>
      </div>
    </form>
  );
}
