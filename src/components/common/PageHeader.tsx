import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  title: string;
  actions?: ReactNode;
}

export default function PageHeader({ eyebrow, title, actions }: Props) {
  return (
    <header className="animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both] mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <p className="font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-tx-dim mb-1.5">
          {eyebrow}
        </p>
        <h1 className="font-primary text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.03em] text-tx-primary">
          {title}
        </h1>
      </div>
      {actions}
    </header>
  );
}
