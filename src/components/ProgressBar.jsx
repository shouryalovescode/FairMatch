function ProgressBar({ label, value, max = 100, suffix = "%", size = "md" }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const height = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-ink">{label}</span>
          <span className="text-sm font-semibold text-brand-700">
            {value}
            {suffix}
          </span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-brand-100 overflow-hidden`}>
        <div
          className={`${height} rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
