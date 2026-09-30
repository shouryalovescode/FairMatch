function MetricCard({ icon: Icon, label, value, hint, tone = "default" }) {
  const toneClasses =
    tone === "accent"
      ? "bg-brand-50 border-brand-200"
      : "bg-white border-brand-100";

  return (
    <div className={`surface-card ${toneClasses} p-5 hover:shadow-soft transition-shadow duration-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-soft font-medium">{label}</p>
          <p className="mt-1.5 text-2xl font-display font-semibold text-brand-800">{value}</p>
          {hint && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
        </div>
        {Icon && (
          <div className="rounded-lg bg-brand-100 p-2.5 text-brand-700">
            <Icon size={20} strokeWidth={2} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MetricCard;
