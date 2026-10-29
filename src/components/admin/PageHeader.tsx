export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">
            {eyebrow}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2 tracking-tight">{title}</h1>
        {description && <p className="text-slate-500 mt-2">{description}</p>}
      </div>
      {action}
    </div>
  );
}
