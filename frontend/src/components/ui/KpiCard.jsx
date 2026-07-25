// KpiCard — animated metric card inspired by Flowbite stats blocks
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function KpiCard({ icon: Icon, label, value, color, bgColor, trend, trendLabel, delay = 0 }) {
  const trendIcon = trend > 0
    ? <TrendingUp size={12} />
    : trend < 0
    ? <TrendingDown size={12} />
    : <Minus size={12} />;

  const trendClass = trend > 0
    ? 'text-emerald-600 bg-emerald-50'
    : trend < 0
    ? 'text-red-500 bg-red-50'
    : 'text-gray-500 bg-gray-50';

  return (
    <div
      className="kpi-card animate-fade-in-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: bgColor }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        {trend !== undefined && (
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${trendClass}`}>
            {trendIcon}
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      <p className="text-2xl font-bold text-gray-900 tabular-nums">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {trendLabel && (
        <p className="text-xs text-gray-400 mt-1">{trendLabel}</p>
      )}
    </div>
  );
}
