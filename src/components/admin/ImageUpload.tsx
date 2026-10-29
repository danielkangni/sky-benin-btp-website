'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ImageUpload({
  value,
  onChange,
  label = 'Image',
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error('Image trop volumineuse (max 8 Mo)');
      return;
    }
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('upload failed');
      const data = await res.json();
      onChange(data.url);
      toast.success('Image téléversée');
    } catch {
      toast.error("Échec de l'upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
        {label}
      </label>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-48 aspect-video bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-4xl text-slate-300">image</span>
          )}
        </div>
        <div className="flex-1 space-y-3">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL de l'image (https://… ou /uploads/…)"
            className="w-full border border-slate-200 focus:border-secondary px-4 py-3 outline-none transition-colors"
          />
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-primary text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-colors inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-base">upload</span>
              {uploading ? 'Upload…' : 'Téléverser'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
                disabled={uploading}
              />
            </label>
            <span className="text-xs text-slate-400">JPG, PNG, WebP — 8 Mo max</span>
          </div>
        </div>
      </div>
    </div>
  );
}
