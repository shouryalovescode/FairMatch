import { useEffect, useState } from "react";
import { FileStack, Target, ScanEye, Repeat, FlaskConical } from "lucide-react";
import MetricCard from "../components/MetricCard";
import ChartCard from "../components/ChartCard";
import ProgressBar from "../components/ProgressBar";
import LoadingState from "../components/LoadingState";
import { getEvaluation } from "../data/api";

function Evaluation() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getEvaluation().then(setData);
  }, []);

  if (!data) return <LoadingState label="Loading evaluation results..." />;

  const maxCount = Math.max(...data.scoreDistribution.map((d) => d.count));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Model Evaluation</h1>
        <p className="text-ink-soft mt-1">
          Evaluate consistency and behavior of the resume matching system.
        </p>
        <span className="chip bg-brand-50 text-brand-700 border border-brand-200 text-xs mt-3">
          <FlaskConical size={13} />
          Demonstration / synthetic evaluation
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={FileStack} label="Test Resumes" value={data.metrics.testResumes} />
        <MetricCard icon={Target} label="Average Match" value={`${data.metrics.averageMatch}%`} />
        <MetricCard icon={ScanEye} label="Skill Detection" value={`${data.metrics.skillDetection}%`} />
        <MetricCard icon={Repeat} label="Consistency" value={`${data.metrics.consistency}%`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard
          title="Candidate Score Distribution"
          subtitle="Number of synthetic test resumes per match score range"
        >
          <div className="flex items-end justify-between gap-3 h-48">
            {data.scoreDistribution.map((d) => (
              <div key={d.bucket} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-brand-600 to-brand-400 transition-all duration-500"
                    style={{ height: `${(d.count / maxCount) * 100}%`, minHeight: d.count ? "4px" : "0px" }}
                    title={`${d.count} resumes`}
                  />
                </div>
                <span className="text-xs text-ink-soft text-center">{d.bucket}</span>
                <span className="text-xs font-medium text-brand-700">{d.count}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Skill Detection Performance"
          subtitle="Detection rate for common skills across test resumes"
        >
          <div className="space-y-4">
            {data.skillDetectionPerformance.map((s) => (
              <ProgressBar key={s.skill} label={s.skill} value={s.detection} size="sm" />
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="surface-card p-6 bg-surface-soft">
        <h3 className="font-display text-lg font-semibold text-brand-800">Evaluation Summary</h3>
        <p className="text-sm text-ink-soft mt-2 leading-relaxed max-w-3xl">{data.summary}</p>
      </div>
    </div>
  );
}

export default Evaluation;
