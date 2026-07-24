// StatusDropdown component — custom glassmorphism floating dropdown with fixed positioning
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Loader2, Check } from 'lucide-react';

const STATUSES = [
  { key: 'NEW', label: 'NEW', badgeClass: 'badge-new' },
  { key: 'CONTACTED', label: 'CONTACTED', badgeClass: 'badge-contacted' },
  { key: 'CLOSED', label: 'CLOSED', badgeClass: 'badge-closed' },
];

export default function StatusDropdown({ leadId, currentStatus, onUpdateStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const portalRef = useRef(null);

  const activeStatusObj = STATUSES.find((s) => s.key === currentStatus) || STATUSES[0];

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (updating) return;

    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 6,
        left: rect.left,
      });
    }
    setIsOpen((prev) => !prev);
  };

  const handleSelect = async (e, newStatus) => {
    e.preventDefault();
    e.stopPropagation();
    if (newStatus === currentStatus || updating) {
      setIsOpen(false);
      return;
    }

    setUpdating(true);
    setIsOpen(false);
    await onUpdateStatus(leadId, newStatus);
    setUpdating(false);
  };

  // Close dropdown on outside click or window scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event) {
      // Don't close if clicking inside trigger button OR portal dropdown
      if (
        (buttonRef.current && buttonRef.current.contains(event.target)) ||
        (portalRef.current && portalRef.current.contains(event.target))
      ) {
        return;
      }
      setIsOpen(false);
    }

    function handleScrollResize() {
      setIsOpen(false);
    }

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('scroll', handleScrollResize, true);
    window.addEventListener('resize', handleScrollResize);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('scroll', handleScrollResize, true);
      window.removeEventListener('resize', handleScrollResize);
    };
  }, [isOpen]);

  return (
    <div className="inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        disabled={updating}
        className={`${activeStatusObj.badgeClass} inline-flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 hover:brightness-110 focus:outline-none`}
        title="Click to update status"
      >
        {updating ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          <span>{activeStatusObj.label}</span>
        )}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={portalRef}
            className="fixed z-[9999] w-40 rounded-xl p-1.5 shadow-2xl animate-fade-in-up"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              background: '#181b20',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.2)',
              backdropFilter: 'blur(16px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-400/80">
              Select Status
            </div>
            <div className="flex flex-col gap-1 mt-0.5">
              {STATUSES.map(({ key, label, badgeClass }) => {
                const isSelected = currentStatus === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={(e) => handleSelect(e, key)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className={badgeClass}>{label}</span>
                    {isSelected && <Check size={14} className="text-purple-400" />}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
