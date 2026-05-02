import { useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Users, TrendingUp, Activity, Heart } from 'lucide-react';
import { usePatientStore } from '../store/patientStore';
import StatsCard from '../components/analytics/StatsCard';
import PageShell from '../components/common/PageShell';
import PageHeader from '../components/common/PageHeader';
import RechartsTooltip from '../components/charts/RechartsTooltip';
import { WARD_DATA } from '../utils/mockData';
import { patientStatusCounts } from '../utils/patientMetrics';
import { PATIENT_STATUS_PIE_COLORS } from '../constants/chartPalette';

export default function AnalyticsPage() {
  const { patients, fetchPatients } = usePatientStore();

  useEffect(() => {
    void fetchPatients();
  }, [fetchPatients]);

  const statusCounts = patientStatusCounts(patients);
  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  return (
    <PageShell>
      <PageHeader eyebrow="System logs" title="Insights" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatsCard title="TOTAL CAPACITY" value="85%" trend={+2.4} icon={<Users size={20} />} index={0} />
        <StatsCard title="AVG STAY [D]" value="5.2" trend={-0.8} icon={<Activity size={20} />} index={1} />
        <StatsCard title="RECOVERY RT" value="94.2%" trend={+1.1} icon={<TrendingUp size={20} />} index={2} />
        <StatsCard title="EMERGENCY ADMIT" value={24} trend={+5.0} icon={<Heart size={20} />} index={3} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <div className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: '200ms' }}>
          <h2 className="font-primary text-[0.8125rem] font-semibold text-tx-primary mb-4">Ward loading</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WARD_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="var(--color-tx-dim)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-tx-muted)" fontSize={11} tickMargin={12} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--color-tx-muted)" fontSize={11} tickMargin={12} axisLine={false} tickLine={false} />
                <Tooltip content={<RechartsTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="occupancy" fill="var(--color-accent)" barSize={40} />
                <Bar dataKey="capacity" fill="var(--color-tx-dim)" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: '250ms' }}>
          <h2 className="font-primary text-[0.8125rem] font-semibold text-tx-primary mb-4">State distribution</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={90}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PATIENT_STATUS_PIE_COLORS[index % PATIENT_STATUS_PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<RechartsTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="square" wrapperStyle={{ fontFamily: 'var(--font-tech)', fontSize: '0.75rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
