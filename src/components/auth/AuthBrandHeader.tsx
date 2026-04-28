import { Activity } from 'lucide-react';

export default function AuthBrandHeader() {
  return (
    <div className="flex items-center gap-3.5 mb-8">
      <div className="w-11 h-11 rounded-md bg-gradient-to-br from-accent to-indigo-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
        <Activity size={18} color="#fff" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-primary text-[1.125rem] font-bold text-white tracking-[-0.02em] leading-tight">
          MediCore
        </p>
        <p className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-tx-muted mt-1">
          Clinical access gateway
        </p>
      </div>
    </div>
  );
}
