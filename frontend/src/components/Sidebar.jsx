import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileSearch,
  Users,
  BarChart3,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/analyze", label: "Resume Analysis", icon: FileSearch },
  { to: "/candidates", label: "Candidates", icon: Users },
  { to: "/evaluation", label: "Model Evaluation", icon: BarChart3 },
  { to: "/fairness", label: "Fairness", icon: ShieldCheck },
  { to: "/methodology", label: "Methodology", icon: Workflow },
];

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center font-display font-semibold text-sm">
          FM
        </div>
        <span className="font-display font-semibold text-ink text-lg">FairMatch</span>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-5 border-t border-brand-100">
        <p className="text-xs font-medium text-ink">Data Science Project</p>
        <p className="text-xs text-ink-soft">Academic Prototype</p>
      </div>
    </div>
  );
}

function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-brand-100">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-brand-900/20 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[80%] h-full bg-white shadow-soft">
            <button
              onClick={onClose}
              aria-label="Close navigation"
              className="absolute top-4 right-4 text-ink-soft hover:text-ink p-1.5 rounded-lg hover:bg-brand-50"
            >
              <X size={18} />
            </button>
            <SidebarContent onNavigate={onClose} />
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
