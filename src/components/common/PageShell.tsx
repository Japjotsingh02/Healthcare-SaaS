import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PageShell({ children, className = '' }: Props) {
  return (
    <div className={`flex-1 px-4 py-4 sm:px-5 max-w-[1580px] w-full mx-auto ${className}`.trim()}>
      {children}
    </div>
  );
}
