import { Check, X } from "lucide-react";

function SkillChip({ label, matched = true }) {
  return (
    <span className={matched ? "chip-matched" : "chip-missing"}>
      {matched ? <Check size={14} strokeWidth={2.5} /> : <X size={14} strokeWidth={2.5} />}
      {label}
    </span>
  );
}

export default SkillChip;
