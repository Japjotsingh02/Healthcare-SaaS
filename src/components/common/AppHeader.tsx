import { useLocation } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import { useAuthStore } from '../../store/authStore';
import { routeTitleForPath } from '../../lib/routes';

export default function AppHeader() {
  const { pathname } = useLocation();
  const { user } = useAuthStore();
  const title = routeTitleForPath(pathname);
  const initials = user?.displayName
    ? user.displayName.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? 'MC';

  return (
    <header className="h-11 shrink-0 flex items-center justify-between px-5 border-b border-border-subtle bg-root/90 backdrop-blur-md relative z-40">
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent pointer-events-none"
        aria-hidden
      />
      <div className="flex items-baseline gap-3 min-w-0">
        <h1 className="font-primary text-[0.8125rem] font-semibold text-tx-primary tracking-tight truncate">
          {title}
        </h1>
        <span className="hidden sm:inline font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-tx-dim">
          · live
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        <NotificationBell />
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-surface-muted to-card border border-border-default flex items-center justify-center text-[0.625rem] font-semibold font-tech text-tx-primary ml-1 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
          title={user?.displayName ?? user?.email ?? 'Account'}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
