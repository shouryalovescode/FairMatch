import { useEffect, useMemo, useState } from "react";
import CandidateTable from "../components/CandidateTable";
import CandidateDetails from "../components/CandidateDetails";
import LoadingState from "../components/LoadingState";
import { getCandidates } from "../data/api";

function Candidates() {
  const [candidates, setCandidates] = useState(null);
  const [sortKey, setSortKey] = useState("matchScore");
  const [sortDir, setSortDir] = useState("desc");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getCandidates().then(setCandidates);
  }, []);

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = useMemo(() => {
    if (!candidates) return [];
    const list = [...candidates].sort((a, b) => a[sortKey] - b[sortKey]);
    return sortDir === "desc" ? list.reverse() : list;
  }, [candidates, sortKey, sortDir]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Candidate Comparison</h1>
        <p className="text-ink-soft mt-1">
          Compare candidates using the same explainable scoring framework.
        </p>
      </div>

      {!candidates ? (
        <LoadingState label="Loading candidates..." />
      ) : (
        <CandidateTable
          candidates={sorted}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
          onSelect={setSelected}
          selectedId={selected?.id}
        />
      )}

      <CandidateDetails candidate={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default Candidates;
