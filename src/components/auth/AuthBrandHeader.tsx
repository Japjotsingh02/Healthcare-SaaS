import BrandMark from '../common/BrandMark';

export default function AuthBrandHeader() {
  return (
    <div className="flex items-center gap-3.5 mb-8">
      <div className="shrink-0 rounded-md overflow-hidden shadow-[0_0_24px_rgba(99,102,241,0.14)] ring-1 ring-white/10">
        <BrandMark className="block h-11 w-11" width={44} height={44} />
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
