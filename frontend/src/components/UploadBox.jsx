import { useRef, useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";

function formatBytes(bytes) {
  if (bytes === 0) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function UploadBox({ file, onFileSelect, onClear }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  function handleFiles(fileList) {
    const selected = fileList?.[0];
    if (!selected) return;
    const validTypes = [".pdf", ".docx"];
    const isValid = validTypes.some((ext) => selected.name.toLowerCase().endsWith(ext));
    if (!isValid) return;
    onFileSelect(selected);
  }

  return (
    <div>
      <label className="text-sm font-medium text-ink mb-2 block">Resume file</label>

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload resume, PDF or DOCX"
          className={`flex flex-col items-center justify-center text-center rounded-xl2 border-2 border-dashed p-10 cursor-pointer transition-colors duration-150 ${
            isDragging
              ? "border-brand-500 bg-brand-50"
              : "border-brand-200 bg-surface-soft hover:border-brand-400 hover:bg-brand-50"
          }`}
        >
          <div className="rounded-full bg-brand-100 p-3 text-brand-600">
            <UploadCloud size={24} />
          </div>
          <p className="mt-3 text-sm font-medium text-ink">
            Drag and drop your resume here
          </p>
          <p className="text-xs text-ink-soft mt-1">or click to browse · PDF or DOCX</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      ) : (
        <div className="rounded-xl2 border border-brand-200 bg-brand-50 p-4 flex items-center gap-3">
          <div className="rounded-lg bg-white p-2.5 text-brand-600 border border-brand-200">
            <FileText size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink truncate">{file.name}</p>
            <p className="text-xs text-ink-soft">{formatBytes(file.size)}</p>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-brand-700">
            <CheckCircle2 size={14} /> Uploaded
          </span>
          <button
            type="button"
            onClick={onClear}
            aria-label="Remove file"
            className="text-ink-soft hover:text-ink transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadBox;
