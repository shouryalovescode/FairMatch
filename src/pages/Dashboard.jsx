import { Link } from "react-router-dom";
import { FileSearch, BarChart3, Sparkles, Target, ListChecks, ShieldAlert, Briefcase, GraduationCap } from "lucide-react";
import { mockAnalysisResult } from "../data/mockData";
import ScoreCircle from "../components/ScoreCircle";

function Dashboard() {
  const preview = mockAnalysisResult;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-10 items-center pt-4">
        <div>
          <span className="chip bg-brand-50 text-brand-700 border border-brand-200 text-xs">
            <Sparkles size={13} />
            Explainable AI • NLP • Fairness-Aware
          </span>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink mt-5 leading-tight">
            FairMatch
          </h1>
          <p className="text-lg text-brand-700 font-medium mt-2">
            Explainable Resume Screening &amp; Job Matching
          </p>
          <p className="text-ink-soft mt-4 leading-relaxed max-w-lg">
            Analyze resumes against job requirements using NLP, TF-IDF similarity, skill
            matching and explainable scoring — built as a decision-support tool, not an
            autonomous hiring decision maker.
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <Link to="/analyze" className="btn-primary">
              <FileSearch size={17} />
              Analyze Resume
            </Link>
            <Link to="/evaluation" className="btn-secondary">
              <BarChart3 size={17} />
              View Analytics
            </Link>
          </div>
        </div>

        {/* Dashboard preview card */}
        <div className="surface-card p-6 bg-surface-soft">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-medium text-ink-soft">Sample Analysis Preview</p>
            <span className="text-xs text-brand-600 font-medium">Live demo data</span>
          </div>

          <div className="flex items-center gap-6">
            <ScoreCircle value={preview.matchScore} size={128} strokeWidth={9} />
            <div className="flex-1 grid grid-cols-2 gap-3">
              <PreviewStat icon={Target} label="Skill Match" value={`${preview.metrics.skillMatch}%`} />
              <PreviewStat icon={Briefcase} label="Experience" value={`${preview.metrics.experience}%`} />
              <PreviewStat icon={GraduationCap} label="Education" value={`${preview.metrics.education}%`} />
              <PreviewStat icon={ListChecks} label="Skills Matched" value={preview.matchedSkills.length} />
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-brand-100 flex items-center gap-2 text-sm text-ink-soft">
            <ShieldAlert size={15} className="text-brand-600" />
            Missing skills: {preview.missingSkills.join(", ")}
          </div>
        </div>
      </section>
    </div>
  );
}

function PreviewStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-white border border-brand-100 p-3">
      <div className="flex items-center gap-1.5 text-brand-600">
        <Icon size={14} />
        <span className="text-xs text-ink-soft">{label}</span>
      </div>
      <p className="font-display font-semibold text-ink mt-1">{value}</p>
    </div>
  );
}

export default Dashboard;
