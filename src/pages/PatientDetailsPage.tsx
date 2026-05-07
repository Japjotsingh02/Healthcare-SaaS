import { useEffect } from 'react';
import { Search } from 'lucide-react';
import { usePatientStore } from '../store/patientStore';
import PatientCard from '../components/patients/PatientCard';
import ViewToggle from '../components/patients/ViewToggle';
import PatientList from '../components/patients/PatientList';
import PageShell from '../components/common/PageShell';
import PageHeader from '../components/common/PageHeader';

const STATUS_FILTERS = ['All', 'Stable', 'Critical', 'Recovering', 'Discharged'];

export default function PatientDetailsPage() {
  const {
    loading,
    viewMode,
    searchQuery,
    statusFilter,
    setViewMode,
    setSearchQuery,
    setStatusFilter,
    fetchPatients,
    getFilteredPatients,
    patients,
  } = usePatientStore();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const filtered = getFilteredPatients();
  const total = patients.length;

  return (
    <PageShell className="flex flex-col min-h-full">
      <PageHeader
        eyebrow="Precision · Clinical v1.0"
        title="Patients"
        actions={<ViewToggle mode={viewMode} onChange={setViewMode} />}
      />

      <div className="animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both] mb-4" style={{ animationDelay: '60ms' }}>
        <div className="relative mb-3">
          <Search
            size={16}
            className="text-tx-muted absolute left-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={1.5}
          />
          <input
            type="search"
            placeholder="Search patients or conditions…"
            className="w-full text-tx-primary outline-none transition-all duration-150 focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.14)] pl-[42px] h-[44px] rounded-lg bg-card border border-border-default font-primary text-[0.9375rem]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-5 border-b border-border-subtle">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              className={`font-primary text-[0.8125rem] font-medium py-3 px-0 -mb-[1px] border-none bg-transparent cursor-pointer border-b-2 transition-colors duration-150 ${statusFilter === s ? 'text-tx-primary border-tx-primary' : 'text-tx-muted border-transparent hover:text-tx-secondary'}`}
              onClick={() => setStatusFilter(s)}
            >
              {s === 'All' ? 'All Patients' : s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-[repeat(auto-fill,minmax(300px,1fr))]' : 'grid-cols-1'}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`rounded-md bg-gradient-to-r from-card via-surface-muted to-card bg-[length:200%_100%] animate-[shimmer_1.4s_linear_infinite] ${viewMode === 'grid' ? 'h-[220px]' : 'h-[72px]'}`} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card rounded-lg py-12 px-6 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] text-center">
          <Search size={40} className="text-tx-dim mx-auto mb-4" />
          <p className="font-primary text-[0.9375rem] font-medium leading-[1.45] text-tx-primary mb-2">No matches</p>
          <p className="font-primary text-[0.9375rem] text-tx-secondary cursor-auto mb-0">Try another search or filter.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3" : ""}>
          {viewMode === 'grid' ? (
            filtered.map((p, i) => <PatientCard key={p.id} patient={p} index={i} />)
          ) : (
            <PatientList patients={filtered} />
          )}
        </div>
      )}

      <div className="mt-auto pt-4 flex items-center justify-between flex-wrap gap-3 border-t border-border-subtle">
        <p className="font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-tx-secondary flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(74,222,128,0.45)]" />
          System operational · ENCRYPTED SYNC: 2.4MS
        </p>
        <p className="font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-tx-dim">
          Showing {filtered.length} of {total}
        </p>
      </div>
    </PageShell>
  );
}
