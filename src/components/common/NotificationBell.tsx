// src/components/common/NotificationBell.tsx
import { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCheck, Trash2, Radio } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { NOTIFICATION_TYPE_STYLES } from '../../constants/notificationVisuals';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [enabling, setEnabling] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {
    notifications,
    markRead,
    markAllRead,
    clearAll,
    unreadCount,
    permissionGranted,
    swRegistered,
    requestPermission,
  } = useNotificationStore();
  const count = unreadCount();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleEnableDesktop = async () => {
    setEnabling(true);
    try {
      await requestPermission();
    } finally {
      setEnabling(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="relative p-1.5 rounded-md text-tx-secondary bg-transparent border-none cursor-pointer transition-all hover:text-tx-primary hover:bg-white/[0.06] ring-1 ring-transparent hover:ring-border-default/60"
        onClick={() => setOpen((o) => !o)}
        title="Notifications"
      >
        <Bell size={17} strokeWidth={1.5} />
        {count > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-[14px] h-[14px] px-0.5 flex items-center justify-center rounded-full bg-rose-500 text-[9px] font-tech font-bold text-white border-2 border-sidebar leading-none">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-10 z-[300] w-[min(100vw-1.5rem,300px)] overflow-hidden rounded-lg border border-border-default bg-[#0c0c0f]/95 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.55),0_0_0_1px_rgba(99,102,241,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] animate-[scale-in_0.2s_ease-out_both] origin-top-right"
          role="dialog"
          aria-label="Notifications"
        >
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border-subtle bg-gradient-to-r from-accent/[0.06] to-transparent">
            <div className="min-w-0">
              <p className="font-primary text-[0.8125rem] font-semibold text-tx-primary leading-tight">
                Alerts
              </p>
              <p className="font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-tx-dim mt-0.5">
                {count} unread · {swRegistered ? 'SW active' : 'SW pending'}
              </p>
            </div>
            <div className="flex items-center shrink-0 gap-0">
              {count > 0 && (
                <button
                  type="button"
                  className="p-1.5 rounded-md text-tx-dim bg-transparent border-none cursor-pointer hover:text-tx-primary hover:bg-white/[0.06]"
                  onClick={markAllRead}
                  title="Mark all read"
                >
                  <CheckCheck size={14} strokeWidth={1.5} />
                </button>
              )}
              <button
                type="button"
                className="p-1.5 rounded-md text-tx-dim bg-transparent border-none cursor-pointer hover:text-tx-primary hover:bg-white/[0.06]"
                onClick={clearAll}
                title="Clear all"
              >
                <Trash2 size={14} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                className="p-1.5 rounded-md text-tx-dim bg-transparent border-none cursor-pointer hover:text-tx-primary hover:bg-white/[0.06]"
                onClick={() => setOpen(false)}
                title="Close"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="max-h-[min(52vh,280px)] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 gap-1.5">
                <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center border border-border-default">
                  <Bell size={18} className="text-tx-dim" strokeWidth={1.5} />
                </div>
                <p className="font-primary text-[0.8125rem] text-tx-secondary text-center">
                  No alerts yet
                </p>
                <p className="font-tech text-[0.5625rem] text-tx-dim text-center uppercase tracking-[0.1em]">
                  Ward feed is quiet
                </p>
              </div>
            ) : (
              notifications.map((n) => {
                const styles = NOTIFICATION_TYPE_STYLES[n.type] ?? NOTIFICATION_TYPE_STYLES.info;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => markRead(n.id)}
                    className={`w-full text-left px-3 py-2.5 border-b border-border-subtle/80 outline-none cursor-pointer flex gap-2.5 items-stretch transition-colors last:border-b-0 ${
                      n.read ? 'bg-transparent hover:bg-white/[0.03]' : 'bg-accent/[0.04] hover:bg-accent/[0.08]'
                    }`}
                  >
                    <div className={`w-0.5 rounded-full shrink-0 self-stretch my-0.5 ${styles.bar}`} />
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2">
                        {!n.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                        )}
                        <p className="font-primary text-[0.8125rem] font-medium leading-snug text-tx-primary">
                          {n.title}
                        </p>
                      </div>
                      <p className="font-primary text-[0.75rem] text-tx-secondary mt-1 line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                      <p className={`font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.1em] mt-1.5 ${styles.label}`}>
                        {n.type} ·{' '}
                        {new Date(n.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="px-3 py-2 border-t border-border-subtle bg-card/50">
            <div className="flex items-start gap-2">
              <Radio
                size={14}
                className={permissionGranted ? 'text-emerald-400 shrink-0 mt-0.5' : 'text-tx-dim shrink-0 mt-0.5'}
                strokeWidth={1.5}
              />
              <div className="flex-1 min-w-0">
                <p className="font-primary text-[0.6875rem] font-medium text-tx-primary leading-snug">
                  Desktop alerts
                </p>
                <p className="font-tech text-[0.5625rem] text-tx-dim mt-0.5 leading-relaxed">
                  {permissionGranted
                    ? 'OS notifications enabled for critical signals.'
                    : 'Enable to mirror alerts outside the browser.'}
                </p>
                {!permissionGranted && (
                  <button
                    type="button"
                    disabled={enabling}
                    onClick={handleEnableDesktop}
                    className="mt-2 w-full py-1.5 rounded-md text-[0.6875rem] font-semibold font-primary bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 transition-colors disabled:opacity-50"
                  >
                    {enabling ? 'Requesting…' : 'Enable notifications'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
