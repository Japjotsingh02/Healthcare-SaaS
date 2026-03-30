import type { ReactNode } from 'react';

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#121214] border border-border-default rounded-[12px] py-8 px-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.55)] animate-[fade-in_0.22s_ease-out_both]">
      {children}
    </div>
  );
}
