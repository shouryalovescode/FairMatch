import {
  FileText,
  Type,
  ListTree,
  Sigma,
  Radar,
  Scale,
  ShieldCheck,
} from "lucide-react";
import PipelineStep from "../components/PipelineStep";
import { pipelineSteps, methodologyCards, scoreWeights } from "../data/mockData";

const cardIcons = {
  extraction: FileText,
  preprocessing: Type,
  skills: ListTree,
  tfidf: Sigma,
  cosine: Radar,
  weighting: Scale,
  guardrails: ShieldCheck,
};

function Methodology() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Methodology</h1>
        <p className="text-ink-soft mt-1">
          How FairMatch turns a resume and job description into an explainable score.
        </p>
      </div>

      <div className="surface-card p-8 bg-surface-soft flex flex-col items-center">
        {pipelineSteps.map((step, i) => (
          <PipelineStep key={step.key} step={step} index={i} total={pipelineSteps.length} />
        ))}
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Pipeline Stages</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {methodologyCards.map((card) => {
            const Icon = cardIcons[card.key];
            return (
              <div key={card.key} className="surface-card p-5">
                <div className="rounded-lg bg-brand-100 text-brand-700 p-2.5 w-fit">
                  <Icon size={18} />
                </div>
                <h3 className="font-medium text-ink mt-3">{card.title}</h3>
                <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="surface-card p-8 bg-brand-50 border-brand-200">
        <h2 className="font-display text-lg font-semibold text-brand-800 mb-5">
          Final Score Formula
        </h2>
        <div className="rounded-xl2 bg-white border border-brand-200 p-6 font-mono text-sm sm:text-base text-ink leading-8 overflow-x-auto">
          <p className="font-semibold text-brand-700 mb-1">Final Score =</p>
          {scoreWeights.map((w, i) => (
            <p key={w.key} className="pl-4">
              {w.weight.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")} × {w.label}
              {i < scoreWeights.length - 1 ? " +" : ""}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Methodology;
