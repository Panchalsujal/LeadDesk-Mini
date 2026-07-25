// StatusDropdown — clean white dropdown with indigo active state
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const STATUSES = [
  { value: 'NEW',       label: 'New',       cls: 'badge-new' },
  { value: 'CONTACTED', label: 'Contacted', cls: 'badge-contacted' },
  { value: 'CLOSED',    label: 'Closed',    cls: 'badge-closed' },
];

export default function StatusDropdown({ leadId, currentStatus, onUpdateStatus }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  const current = STATUSES.find((s) => s.value === currentStatus) || STATUSES[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = async (status) => {
    if (status === currentStatus) { setOpen(false); return; }
    setLoading(true);
    setOpen(false);
    await onUpdateStatus(leadId, status);
    setLoading(false);
  };

  return (
    <div ref={ref} className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((p) => !p)}
        disabled={loading}
        className={`badge ${current.cls} cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {loading ? (
          <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
        )}
        {current.label}
        <ChevronDown size={11} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 mt-1.5 w-36 card py-1 animate-scale-in">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => handleSelect(s.value)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              <span className={`badge ${s.cls} text-xs`}>{s.label}</span>
              {s.value === currentStatus && <Check size={13} className="text-indigo-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
