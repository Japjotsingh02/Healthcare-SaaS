import type { RechartsTooltipContentProps } from '../../types';

export default function RechartsTooltip({ active, payload, label }: RechartsTooltipContentProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card-hover rounded-lg border border-border-default px-3 py-2.5 text-[0.75rem] shadow-lg shadow-black/20">
      {label != null && label !== '' && (
        <p className="font-tech text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-tx-secondary mb-1.5">
          {label}
        </p>
      )}
      {payload.map((p) => (
        <div key={String(p.name)} className="flex items-center gap-2 mb-0.5 last:mb-0">
          {p.color != null && (
            <div className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ background: p.color }} />
          )}
          <span className="font-primary text-[0.8125rem] text-tx-secondary capitalize">{p.name}:</span>
          <span className="font-tech font-medium tabular-nums text-tx-primary">{p.value}</span>
        </div>
      ))}
    </div>
  );
}
