import { Loader2 } from "lucide-react";

function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-brand-600">
      <Loader2 className="animate-spin" size={28} strokeWidth={2} />
      <p className="text-sm font-medium text-ink-soft">{label}</p>
    </div>
  );
}

export default LoadingState;
