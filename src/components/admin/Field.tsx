export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-slate-200 focus:border-secondary px-4 py-3 outline-none transition-colors ${props.className ?? ''}`}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full border border-slate-200 focus:border-secondary px-4 py-3 outline-none transition-colors resize-y ${props.className ?? ''}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full border border-slate-200 focus:border-secondary px-4 py-3 outline-none transition-colors bg-white ${props.className ?? ''}`}
    />
  );
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-secondary text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all disabled:opacity-50 ${props.className ?? ''}`}
    />
  );
}

export function SecondaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`border-2 border-primary text-primary px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all disabled:opacity-50 ${props.className ?? ''}`}
    />
  );
}
