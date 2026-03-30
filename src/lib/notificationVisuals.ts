import type { NotificationType } from '../types';

export const NOTIFICATION_TYPE_STYLES: Record<
  NotificationType,
  { bar: string; label: string }
> = {
  info: { bar: 'bg-accent', label: 'text-accent' },
  success: { bar: 'bg-emerald-500', label: 'text-emerald-400' },
  warning: { bar: 'bg-amber-400', label: 'text-amber-400' },
  danger: { bar: 'bg-rose-500', label: 'text-rose-400' },
};
