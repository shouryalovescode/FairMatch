import { Sparkles } from "lucide-react";
import ProgressBar from "./ProgressBar";

function ScoreBreakdown({ breakdown, explanation }) {
  return (
    <div className="surface-card p-6">
      <h3 className="font-display text-lg font-semibold text-brand-800">
        Explainable Score Breakdown
      </h3>
      <p className="text-sm text-ink-soft mt-1">
        How each signal contributes to the overall match score.
      </p>

      <div className="mt-5 space-y-4">
        {breakdown.map((item) => (
          <ProgressBar key={item.key} label={item.label} value={item.value} size="sm" />
        ))}
      </div>

      {explanation && (
        <div className="mt-6 rounded-lg bg-brand-50 border border-brand-200 p-4">
          <div className="flex items-center gap-2 text-brand-700 font-medium text-sm">
            <Sparkles size={16} />
            Why this score?
          </div>
          <p className="text-sm text-ink mt-1.5 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
}

export default ScoreBreakdown;
