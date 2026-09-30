import { ShieldOff, ShieldCheck, ShieldAlert } from "lucide-react";
import { fairnessConfig } from "../data/mockData";

function Fairness() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Fairness &amp; Responsible AI
        </h1>
        <p className="text-ink-soft mt-1">
          FairMatch focuses scoring on job-relevant information.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="surface-card p-6">
          <div className="flex items-center gap-2 text-ink-soft">
            <ShieldOff size={18} className="text-brand-600" />
            <h2 className="font-display text-lg font-semibold text-ink">Excluded from Scoring</h2>
          </div>
          <ul className="mt-4 space-y-2.5">
            {fairnessConfig.excluded.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-ink rounded-lg bg-surface-soft border border-brand-100 px-3.5 py-2.5"
              >
                <ShieldOff size={14} className="text-ink-soft shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center gap-2 text-brand-700">
            <ShieldCheck size={18} />
            <h2 className="font-display text-lg font-semibold text-ink">Included in Scoring</h2>
          </div>
          <ul className="mt-4 space-y-2.5">
            {fairnessConfig.included.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-ink rounded-lg bg-brand-50 border border-brand-200 px-3.5 py-2.5"
              >
                <ShieldCheck size={14} className="text-brand-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="surface-card p-6 bg-brand-50 border-brand-200">
        <div className="flex items-center gap-2 text-brand-700 font-medium">
          <ShieldCheck size={17} />
          {fairnessConfig.guardrailTitle}
        </div>
        <p className="text-sm text-ink mt-2 leading-relaxed max-w-3xl">
          {fairnessConfig.guardrailText}
        </p>
      </div>

      <div className="rounded-xl2 border border-brand-200 bg-white p-5 flex items-start gap-3">
        <ShieldAlert size={18} className="text-brand-600 shrink-0 mt-0.5" />
        <p className="text-sm text-ink-soft leading-relaxed">{fairnessConfig.disclaimer}</p>
      </div>
    </div>
  );
}

export default Fairness;
