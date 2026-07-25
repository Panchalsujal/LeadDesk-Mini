// Badge — status pill. Inspired by ShadcnBlocks badge style
const STATUS_MAP = {
  NEW:       { cls: 'badge-new',       label: 'New' },
  CONTACTED: { cls: 'badge-contacted', label: 'Contacted' },
  CLOSED:    { cls: 'badge-closed',    label: 'Closed' },
  LOST:      { cls: 'badge-lost',      label: 'Lost' },
};

export default function Badge({ status, className = '' }) {
  const map = STATUS_MAP[status] || { cls: 'badge-indigo', label: status };
  return (
    <span className={`badge ${map.cls} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{
        background: 'currentColor',
        opacity: 0.7,
      }} />
      {map.label}
    </span>
  );
}
