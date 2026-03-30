// src/components/common/Sidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, BarChart3, LogOut,
  Activity, Settings,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/patients', icon: Users, label: 'Records' },
  { to: '/analytics', icon: BarChart3, label: 'Insights' },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const initials = user?.displayName
    ? user.displayName.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || 'DR';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="w-[216px] min-h-screen bg-sidebar border-r border-border-subtle flex flex-col fixed left-0 top-0 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.35)]">
      <div className="py-3.5 px-4 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-accent to-indigo-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Activity size={18} color="#fff" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p className="font-primary text-[0.9375rem] font-bold tracking-tight text-tx-primary leading-none">
              MediCore
            </p>
            <p className="font-tech text-[0.5625rem] font-semibold tracking-[0.18em] uppercase text-tx-dim mt-1">
              Clinical OS
            </p>
          </div>
        </div>
      </div>

      <div className="pt-3 px-4 pb-1">
        <p className="font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-tx-dim">
          Navigate
        </p>
      </div>

      <nav className="flex flex-col flex-1 gap-0.5 px-2.5">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex items-center gap-2.5 px-2.5 py-2 rounded-md font-primary text-[0.8125rem] font-medium no-underline transition-all duration-150 ${
                isActive
                  ? 'bg-accent-muted text-accent shadow-[inset_0_0_0_1px_rgba(99,102,241,0.2)]'
                  : 'text-tx-secondary hover:bg-white/[0.04] hover:text-tx-primary'
              }`
            }
          >
            <Icon size={17} strokeWidth={1.5} />
            <span className="flex-1">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="py-2.5 px-2.5 border-t border-border-subtle flex flex-col gap-2">
        <button
          type="button"
          className="p-1.5 rounded-md text-tx-dim bg-transparent transition-colors hover:text-tx-secondary hover:bg-white/[0.04] ml-0.5 self-start cursor-pointer border-none"
          title="Settings"
        >
          <Settings size={17} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2 p-2 bg-card/80 rounded-md border border-border-default/80 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-md bg-surface-muted flex items-center justify-center text-[0.625rem] font-semibold font-tech text-tx-primary shrink-0 border border-border-default">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-primary text-[0.8125rem] font-medium leading-tight text-tx-primary truncate">
              {user?.displayName || 'Dr. Sterling'}
            </p>
            <p className="font-tech text-[0.5625rem] uppercase tracking-[0.08em] text-tx-dim truncate mt-0.5">
              {user?.email ?? 'clinical@medicore.sys'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 rounded-md text-tx-dim bg-transparent transition-colors hover:text-tx-primary hover:bg-white/[0.06] shrink-0 cursor-pointer border-none"
            title="Sign out"
          >
            <LogOut size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </aside>
  );
}
