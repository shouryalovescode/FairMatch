import { useState } from "react";
import { FileSearch, Target, Percent, Briefcase, GraduationCap } from "lucide-react";
import UploadBox from "../components/UploadBox";
import MetricCard from "../components/MetricCard";
import ScoreCircle from "../components/ScoreCircle";
import SkillChip from "../components/SkillChip";
import ScoreBreakdown from "../components/ScoreBreakdown";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import { analyzeResume } from "../data/api";
import { useToast } from "../components/Toast";

function ResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [result, setResult] = useState(null);
  const { showToast } = useToast();

  const canAnalyze = file && jobDescription.trim().length > 0 && status !== "loading";

  async function handleAnalyze() {
    setStatus("loading");
    const data = await analyzeResume(file, jobDescription);
    setResult(data);
    setStatus("done");
    showToast("Resume analysis complete.");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Resume Analysis</h1>
        <p className="text-ink-soft mt-1">
          Upload a resume and paste a job description to generate an explainable match score.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="surface-card p-6">
          <UploadBox file={file} onFileSelect={setFile} onClear={() => setFile(null)} />
        </div>

        <div className="surface-card p-6 flex flex-col">
          <label htmlFor="jd" className="text-sm font-medium text-ink mb-2">
            Job description
          </label>
          <textarea
            id="jd"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="flex-1 min-h-[180px] w-full rounded-xl2 border border-brand-200 bg-surface-soft p-4 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent resize-none"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={handleAnalyze} disabled={!canAnalyze} className="btn-primary px-8">
          <FileSearch size={17} />
          Analyze Resume
        </button>
      </div>

      {status === "loading" && <LoadingState label="Analyzing resume against job description..." />}

      {status === "idle" && (
        <EmptyState
          icon={FileSearch}
          title="No analysis yet"
          description="Upload a resume and add a job description, then run an analysis to see the explainable match score."
        />
      )}

      {status === "done" && result && (
        <div className="space-y-8 pt-2">
          <div className="surface-card p-8 flex flex-col items-center bg-surface-soft">
            <ScoreCircle value={result.matchScore} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard icon={Target} label="Skill Match" value={`${result.metrics.skillMatch}%`} />
            <MetricCard icon={Percent} label="TF-IDF Similarity" value={`${result.metrics.tfidf}%`} />
            <MetricCard icon={Briefcase} label="Experience" value={`${result.metrics.experience}%`} />
            <MetricCard icon={GraduationCap} label="Education" value={`${result.metrics.education}%`} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="surface-card p-6">
              <h3 className="font-display text-lg font-semibold text-brand-800 mb-4">Matched Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills.map((s) => (
                  <SkillChip key={s} label={s} matched />
                ))}
              </div>
            </div>
            <div className="surface-card p-6">
              <h3 className="font-display text-lg font-semibold text-brand-800 mb-4">Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((s) => (
                  <SkillChip key={s} label={s} matched={false} />
                ))}
              </div>
            </div>
          </div>

          <ScoreBreakdown breakdown={result.scoreBreakdown} explanation={result.explanation} />
        </div>
      )}
    </div>
  );
}

export default ResumeAnalysis;
