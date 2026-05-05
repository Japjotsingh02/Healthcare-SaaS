import { useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props extends ComponentProps<'input'> {
  label: string;
  labelRight?: ReactNode;
  helperText?: ReactNode;
  wrapClassName?: string;
  showToggle?: boolean;
}

export default function AuthTextField({
  label,
  labelRight,
  helperText,
  id,
  className = '',
  wrapClassName = 'mb-5',
  showToggle = false,
  type,
  ...rest
}: Props) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? label.replace(/\s+/g, '-').toLowerCase();
  const isPassword = type === 'password';
  const resolvedType = isPassword && showToggle ? (visible ? 'text' : 'password') : type;

  return (
    <div className={wrapClassName}>
      <div className={`flex items-center${labelRight ? ' justify-between' : ''}`}>
        <label htmlFor={inputId} className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] leading-relaxed block mb-2 text-[#8e8e93]">
          {label}
        </label>
        {labelRight}
      </div>
      <div className="relative">
        <input
          id={inputId}
          type={resolvedType}
          className={`w-full px-[14px] py-[11px] border border-border-default rounded-md text-tx-primary outline-none transition-all duration-150 focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.14)] h-12 bg-[#0c0c0e]${isPassword && showToggle ? 'pr-11' : ''} ${className}`.trim()}
          {...rest}
        />
        {isPassword && showToggle && (
          <button
            type="button"
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8e8e93] hover:text-tx-primary transition-colors duration-150 bg-transparent border-none cursor-pointer"
          >
            {visible ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
          </button>
        )}
      </div>
      {helperText}
    </div>
  );
}
