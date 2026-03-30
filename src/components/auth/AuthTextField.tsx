import type { ComponentProps } from 'react';
import { authInputClass, authLabelClass } from '../../lib/authUi';

interface Props extends ComponentProps<'input'> {
  label: string;
  /** Classes for the outer wrapper (default `mb-5`). */
  wrapClassName?: string;
}

export default function AuthTextField({ label, id, className = '', wrapClassName = 'mb-5', ...rest }: Props) {
  const inputId = id ?? label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className={wrapClassName}>
      <label htmlFor={inputId} className={authLabelClass}>
        {label}
      </label>
      <input id={inputId} className={`${authInputClass} ${className}`.trim()} {...rest} />
    </div>
  );
}
