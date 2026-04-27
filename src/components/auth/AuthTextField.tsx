import { useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { authInputClass, authLabelClass } from '../../constants/authUi';

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
        <label htmlFor={inputId} className={authLabelClass}>
          {label}
        </label>
        {labelRight}
      </div>
      <div className="relative">
        <input
          id={inputId}
          type={resolvedType}
          className={`${authInputClass} ${isPassword && showToggle ? 'pr-11' : ''} ${className}`.trim()}
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
