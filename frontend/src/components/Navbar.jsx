import { Menu } from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-brand-100">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="lg:hidden text-ink-soft hover:text-ink p-1.5 rounded-lg hover:bg-brand-50"
          >
            <Menu size={20} />
          </button>
          <span className="font-display font-semibold text-ink hidden sm:inline">FairMatch</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden md:inline-flex chip-matched text-xs py-1">Explainable AI</span>
          <span className="hidden md:inline-flex chip bg-brand-50 text-brand-700 border border-brand-200 text-xs py-1">
            Data Science
          </span>
          <div
            className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold"
            title="FairMatch project"
          >
            FM
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
