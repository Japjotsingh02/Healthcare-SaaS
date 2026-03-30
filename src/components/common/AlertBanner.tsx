import type { ReactNode } from 'react';

interface Props {
  variant: 'danger' | 'success';
  children: ReactNode;
  className?: string;
}

const STYLES = {
  danger: 'bg-danger-dim text-[#fda4af] border border-danger/25',
  success: 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/20',
} as const;

export default function AlertBanner({ variant, children, className = '' }: Props) {
  return (
    <div
      className={`rounded-md p-4 mb-6 text-[0.8125rem] font-primary ${STYLES[variant]} ${className}`.trim()}
      role="alert"
    >
      {children}
    </div>
  );
}
