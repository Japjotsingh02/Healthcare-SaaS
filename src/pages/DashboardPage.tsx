import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Activity, Heart, Building2, Sparkles } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { usePatientStore } from '../store/patientStore';
import { useNotificationStore } from '../store/notificationStore';
import StatsCard from '../components/analytics/StatsCard';
import PageShell from '../components/common/PageShell';
import PageHeader from '../components/common/PageHeader';
import RechartsTooltip from '../components/charts/RechartsTooltip';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { CHART_DATA, SYSTEM_ACTIVITY } from '../utils/mockData';
import { countByStatus, wardOccupancyPercent } from '../utils/patientMetrics';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { patients, fetchPatients } = usePatientStore();

  useEffect(() => {
    fetchPatients().then(() => {
      const { patients: loaded } = usePatientStore.getState();
      const { notifications, sendLocalNotification: send } = useNotificationStore.getState();
      const alreadyAlerted = notifications.some((n) => n.type === 'danger');
      if (alreadyAlerted) return;

      const critical = loaded.filter((p) => p.status === 'Critical');
      if (critical.length > 0) {
        critical.forEach((p, i) => {
          setTimeout(() => {
            send(
              '⚠ Critical vitals threshold',
              `${p.name} · ${p.condition} — immediate review required.`,
              `critical-load-${p.id}`,
              'danger'
            );
          }, 600 + i * 800);
        });
      } else {
        setTimeout(() => {
          send(
            'Telemetry nominal',
            'All primary ward nodes online · sync latency 14ms.',
            'telemetry-boot',
            'success'
          );
        }, 1200);
      }
    });
  }, [fetchPatients]);

  const critical = countByStatus(patients, 'Critical');
  const stable = countByStatus(patients, 'Stable');
  const recovering = countByStatus(patients, 'Recovering');
  const occupancyPct = wardOccupancyPercent(patients.length, 48);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Dr. Sterling · General ward"
        title="Overview"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        <StatsCard title="Total Patients" value={patients.length} trend={3.2} icon={<Users size={20} strokeWidth={1.5} />} index={0} />
        <StatsCard title="Critical Cases" value={critical} trend={-1.5} icon={<Activity size={20} strokeWidth={1.5} />} index={1} />
        <StatsCard title="Recovering" value={recovering} trend={5.4} icon={<Heart size={20} strokeWidth={1.5} />} index={2} />
        <StatsCard title="Occupancy" value={`${occupancyPct}%`} trend={2.1} icon={<Building2 size={20} strokeWidth={1.5} />} index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,1fr)] gap-3 mb-3">
        <div className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both] min-h-[320px]" style={{ animationDelay: '120ms' }}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-tx-muted">Patient Volume Dynamics</h2>
              <p className="font-primary text-[0.8125rem] text-tx-secondary mt-1.5">Rolling admissions vs discharges</p>
            </div>
            <span className="font-tech font-medium tabular-nums text-[0.625rem] text-tx-dim tracking-[0.14em]">30-DAY WINDOW</span>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-line)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-chart-line)" stopOpacity={0} />
                  </linearGradient>
                  <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <XAxis dataKey="name" stroke="var(--color-tx-dim)" fontSize={10} tickLine={false} axisLine={false} tickMargin={12} fontFamily="var(--font-tech)" />
                <YAxis stroke="var(--color-tx-dim)" fontSize={10} tickLine={false} axisLine={false} tickMargin={8} fontFamily="var(--font-tech)" />
                <Tooltip content={<RechartsTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)' }} />
                <Area
                  type="monotone"
                  dataKey="admissions"
                  name="admissions"
                  stroke="var(--color-chart-line)"
                  strokeWidth={2.5}
                  fill="url(#volGrad)"
                  filter="url(#lineGlow)"
                  dot={false}
                  activeDot={{ r: 4, fill: 'var(--color-chart-line)', stroke: 'var(--color-card)' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both] flex flex-col min-h-[320px]" style={{ animationDelay: '180ms' }}>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-tx-muted">System Activity</h2>
            <span className="font-tech font-medium tabular-nums text-[0.625rem] text-tx-dim">LIVE</span>
          </div>
          <ActivityFeed items={SYSTEM_ACTIVITY} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div
          className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both] hover:bg-card-hover hover:border-border-default cursor-default transition-all"
          style={{ animationDelay: '220ms' }}
          onClick={() => navigate('/analytics')}
          role="presentation"
        >
          <p className="font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-accent">Clinical analytics</p>
          <p className="font-primary font-semibold leading-snug tracking-[-0.02em] text-tx-primary mt-2 text-[1.0625rem]">
            Diagnostic throughput +12% this week
          </p>
          <button
            type="button"
            className="mt-3 p-0 bg-transparent text-tx-secondary hover:text-tx-primary transition-colors border-none cursor-pointer font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.1em]"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/analytics');
            }}
          >
            Open insights →
          </button>
        </div>

        <div
          className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both] relative overflow-hidden bg-gradient-to-br from-card via-[#12121a] to-surface-muted"
          style={{ animationDelay: '260ms' }}
        >
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_85%_15%,var(--color-accent)_0%,transparent_50%)] pointer-events-none" />
          <div className="relative flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-md bg-accent-muted flex items-center justify-center text-accent shrink-0 border border-accent/20">
              <Sparkles size={18} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-tx-dim">System status</p>
              <p className="font-primary text-[0.8125rem] text-tx-secondary mt-2 leading-relaxed max-w-[420px]">
                Telemetry mesh encrypted. Latency <span className="font-tech font-medium tabular-nums text-success">14ms</span>.{' '}
                {stable + recovering} stable / recovering on ward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
