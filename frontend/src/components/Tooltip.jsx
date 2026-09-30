import { useState } from "react";

function Tooltip({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-md bg-brand-800 text-white text-xs px-2.5 py-1.5 shadow-soft"
        >
          {label}
        </span>
      )}
    </span>
  );
}

export default Tooltip;
