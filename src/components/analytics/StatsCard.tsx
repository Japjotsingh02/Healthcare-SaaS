import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
  index?: number;
}

export default function StatsCard({ title, value, trend, icon, index = 0 }: Props) {
  const isPos = trend > 0;

  return (
    <div
      className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[scale-in_0.22s_ease-out_both] flex flex-col min-h-[118px] relative overflow-hidden group hover:border-border-default/80 transition-colors"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.06),transparent_45%)] pointer-events-none transition-opacity" />
      <div className="flex items-start justify-between relative">
        <p className="font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-tx-dim max-w-[72%] leading-snug">
          {title}
        </p>
        <div className="text-tx-muted opacity-80">{icon}</div>
      </div>

      <div className="mt-2.5 font-tech font-medium tracking-tight text-[1.75rem] text-tx-primary leading-none tabular-nums relative">
        {value}
      </div>

      <div className="mt-auto pt-2.5 flex items-center justify-end gap-1">
        {isPos ? (
          <TrendingUp size={14} className="text-success-tx" strokeWidth={2} />
        ) : (
          <TrendingDown size={14} className="text-danger-tx" strokeWidth={2} />
        )}
        <span
          className={`font-tech font-semibold text-[0.8125rem] tabular-nums ${isPos ? 'text-success' : 'text-danger'}`}
        >
          {isPos ? '+' : '−'}
          {Math.abs(trend)}%
        </span>
        <span className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.08em] leading-relaxed text-tx-dim">
          vs prior
        </span>
      </div>
    </div>
  );
}
