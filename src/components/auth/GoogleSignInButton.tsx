import { GoogleGlyph } from './GoogleGlyph';

interface Props {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function GoogleSignInButton({ label, onClick, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center rounded-md cursor-pointer transition-all duration-150 active:scale-98 w-full h-12 mt-3 justify-center gap-2.5 bg-transparent text-tx-primary border border-border-strong hover:border-tx-muted hover:bg-white/5 font-primary text-[0.8125rem] font-semibold disabled:opacity-45 disabled:cursor-not-allowed"
    >
      <GoogleGlyph />
      {label}
    </button>
  );
}
