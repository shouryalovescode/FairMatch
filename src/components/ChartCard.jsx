function ChartCard({ title, subtitle, children }) {
  return (
    <div className="surface-card p-6">
      <h3 className="font-display text-lg font-semibold text-brand-800">{title}</h3>
      {subtitle && <p className="text-sm text-ink-soft mt-1">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default ChartCard;
