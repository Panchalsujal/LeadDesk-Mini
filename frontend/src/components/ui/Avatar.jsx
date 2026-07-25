// Avatar — initials-based with consistent colour per name
const COLORS = [
  ['#ede9fe', '#6d28d9'],
  ['#dbeafe', '#1d4ed8'],
  ['#dcfce7', '#166534'],
  ['#fef3c7', '#92400e'],
  ['#fee2e2', '#991b1b'],
  ['#f0fdf4', '#15803d'],
  ['#fdf4ff', '#a21caf'],
  ['#fff7ed', '#c2410c'],
];

function getColors(name = '') {
  const idx = (name.charCodeAt(0) || 0) % COLORS.length;
  return COLORS[idx];
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function Avatar({ name = '', size = 'md', className = '' }) {
  const [bg, text] = getColors(name);
  const initials = getInitials(name) || '?';

  const sizeMap = {
    sm:   'w-7 h-7 text-xs',
    md:   'w-9 h-9 text-sm',
    lg:   'w-11 h-11 text-base',
    xl:   'w-14 h-14 text-lg',
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold shrink-0 ${sizeMap[size] || sizeMap.md} ${className}`}
      style={{ background: bg, color: text }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
