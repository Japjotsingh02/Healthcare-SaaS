import type { PatientStatus } from '../../types';

const MAP: Record<PatientStatus, { cls: string }> = {
  Stable:     { cls: 'bg-success-dim text-success-tx border-success/25' },
  Critical:   { cls: 'bg-danger-dim text-danger-tx border-danger/25' },
  Recovering: { cls: 'bg-warn-bg text-warning border-warning/20' },
  Discharged: { cls: 'bg-surface-muted text-tx-secondary border-border-default' },
};

interface Props {
  status: PatientStatus;
}

export default function StatusBadge({ status }: Props) {
  const { cls } = MAP[status] ?? MAP.Stable;
  return (
    <span className={`inline-flex items-center gap-1.5 font-tech text-[0.625rem] font-semibold tracking-[0.08em] uppercase py-1 px-2.5 rounded-full border ${cls}`}>
      {status}
    </span>
  );
}
