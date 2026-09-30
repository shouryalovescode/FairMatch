import { ArrowUpDown } from "lucide-react";
import ProgressBar from "./ProgressBar";

const columns = [
  { key: "matchScore", label: "Match Score" },
  { key: "skillMatch", label: "Skill Match" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
];

function CandidateTable({ candidates, sortKey, sortDir, onSort, onSelect, selectedId }) {
  return (
    <div className="surface-card overflow-x-auto">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-brand-100 text-left">
            <th className="px-5 py-3.5 font-medium text-ink-soft w-16">Rank</th>
            <th className="px-5 py-3.5 font-medium text-ink-soft">Candidate</th>
            {columns.map((col) => (
              <th key={col.key} className="px-5 py-3.5 font-medium text-ink-soft">
                <button
                  onClick={() => onSort(col.key)}
                  className="inline-flex items-center gap-1 hover:text-brand-700 transition-colors"
                >
                  {col.label}
                  <ArrowUpDown
                    size={13}
                    className={sortKey === col.key ? "text-brand-600" : "text-ink-soft/50"}
                  />
                </button>
              </th>
            ))}
            <th className="px-5 py-3.5 font-medium text-ink-soft">Projects</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, i) => (
            <tr
              key={c.id}
              onClick={() => onSelect(c)}
              className={`border-b border-brand-50 last:border-0 cursor-pointer transition-colors ${
                selectedId === c.id ? "bg-brand-50" : "hover:bg-brand-50/60"
              }`}
            >
              <td className="px-5 py-4 text-ink-soft font-medium">{i + 1}</td>
              <td className="px-5 py-4 font-medium text-ink">{c.name}</td>
              <td className="px-5 py-4 w-40">
                <ProgressBar value={c.matchScore} size="sm" />
              </td>
              <td className="px-5 py-4 w-40">
                <ProgressBar value={c.skillMatch} size="sm" />
              </td>
              <td className="px-5 py-4 w-40">
                <ProgressBar value={c.experience} size="sm" />
              </td>
              <td className="px-5 py-4 w-40">
                <ProgressBar value={c.education} size="sm" />
              </td>
              <td className="px-5 py-4 w-40">
                <ProgressBar value={c.projects} size="sm" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateTable;
