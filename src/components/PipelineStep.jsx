import { ArrowDown } from "lucide-react";

function PipelineStep({ step, index, total }) {
  return (
    <div className="flex flex-col items-center">
      <div className="surface-card px-5 py-3 bg-brand-50 border-brand-300 text-center min-w-[180px]">
        <p className="font-medium text-brand-800 text-sm">{step.title}</p>
      </div>
      {index < total - 1 && <ArrowDown size={18} className="text-brand-400 my-2" />}
    </div>
  );
}

export default PipelineStep;
