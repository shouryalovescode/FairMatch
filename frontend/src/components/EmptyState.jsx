function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl2 border border-dashed border-brand-200 bg-surface-soft">
      {Icon && (
        <div className="rounded-full bg-brand-100 p-3 text-brand-600 mb-4">
          <Icon size={22} />
        </div>
      )}
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="text-sm text-ink-soft mt-1.5 max-w-sm">{description}</p>}
    </div>
  );
}

export default EmptyState;
