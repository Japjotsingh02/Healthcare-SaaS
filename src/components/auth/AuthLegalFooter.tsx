export default function AuthLegalFooter() {
  return (
    <div className="mt-8 pt-6 border-t border-border-subtle">
      <p className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] flex items-center gap-2 text-tx-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
        System status: operational
      </p>
      <p className="mt-4 text-[0.6875rem] text-[#52525b] leading-relaxed font-primary">
        Protected by MediCore Clinical Protocol.{' '}
        <button type="button" className="bg-transparent border-none text-white cursor-pointer p-0 font-primary">
          Security policy
        </button>
      </p>
    </div>
  );
}
