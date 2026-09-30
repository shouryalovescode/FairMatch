import { X } from "lucide-react";
import ScoreCircle from "./ScoreCircle";
import SkillChip from "./SkillChip";
import ProgressBar from "./ProgressBar";

function CandidateDetails({ candidate, onClose }) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div
        className="absolute inset-0 bg-brand-900/10 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-label={`${candidate.name} details`}
        className="relative w-full sm:max-w-md h-full bg-white border-l border-brand-200 shadow-soft overflow-y-auto animate-toast-in"
      >
        <div className="flex items-center justify-between p-5 border-b border-brand-100">
          <h2 className="font-display text-lg font-semibold text-ink">{candidate.name}</h2>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="text-ink-soft hover:text-ink p-1.5 rounded-lg hover:bg-brand-50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <ScoreCircle value={candidate.matchScore} size={140} strokeWidth={10} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ProgressBar label="Experience" value={candidate.experience} size="sm" />
            <ProgressBar label="Education" value={candidate.education} size="sm" />
            <ProgressBar label="Skill Match" value={candidate.skillMatch} size="sm" />
            <ProgressBar label="Projects" value={candidate.projects} size="sm" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink mb-2">Matched Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.matchedSkills.map((s) => (
                <SkillChip key={s} label={s} matched />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink mb-2">Missing Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.missingSkills.map((s) => (
                <SkillChip key={s} label={s} matched={false} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink mb-3">Score Breakdown</h3>
            <div className="space-y-3">
              {candidate.scoreBreakdown.map((item) => (
                <ProgressBar key={item.key} label={item.label} value={item.value} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
