// src/pages/PatientDetailPage.tsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {ArrowLeft, FileText, Activity, Bell, UserRound} from 'lucide-react';
import { usePatientStore } from '../store/patientStore';
import { useNotificationStore } from '../store/notificationStore';
import { MOCK_PATIENTS } from '../utils/mockData';
import StatusBadge from '../components/common/StatusBadge';
import PageShell from '../components/common/PageShell';

const VITAL_CONFIG = [
  { key: 'heartRate' as const, label: 'Heart Rate', unit: 'BPM' },
  { key: 'bloodPressure' as const, label: 'Blood Pressure', unit: 'mmHg' },
  { key: 'temperature' as const, label: 'Temperature', unit: '°F' },
  { key: 'oxygen' as const, label: 'SpO₂', unit: '%' },
];

export default function PatientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedPatient, selectPatient, patients } = usePatientStore();
  const { sendLocalNotification } = useNotificationStore();

  const patient = selectedPatient || patients.find((p) => p.id === id) || MOCK_PATIENTS.find((p) => p.id === id);

  useEffect(() => {
    if (!patient && id) {
      const p = MOCK_PATIENTS.find((x) => x.id === id);
      if (p) selectPatient(p);
      else {
        sendLocalNotification(`Record ${id} missing`, 'Patient not found in local index.', 'record-error', 'danger');
        navigate('/patients');
      }
    }
  }, [id, navigate, patient, selectPatient, sendLocalNotification]);

  if (!patient) return null;

  const history = patient.history ?? [];

  return (
    <PageShell className="pb-24">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3 animate-[fade-in_0.22s_ease-out_both]">
        <button type="button" className="px-[18px] rounded-md font-primary text-[0.8125rem] font-semibold cursor-pointer border-none bg-transparent flex items-center gap-2 transition-colors duration-150 py-[6px] text-tx-secondary hover:text-tx-primary hover:bg-accent-muted" onClick={() => navigate('/patients')}>
          <ArrowLeft size={16} strokeWidth={1.5} /> Records
        </button>
        <div className="flex items-center gap-4">
          <p className="font-tech font-medium tabular-nums text-[0.6875rem] text-tx-muted">
            LAST SYNC · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <button type="button" className="p-2 rounded-md text-tx-secondary bg-transparent border-none cursor-pointer transition-colors duration-150 hover:text-tx-primary hover:bg-surface-muted" aria-label="Notifications">
            <Bell size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-primary text-[clamp(1.35rem,3vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em] text-tx-primary">{patient.name}</h1>
            <StatusBadge status={patient.status} />
          </div>
          <p className="font-tech font-medium tabular-nums mt-3 text-[0.6875rem] tracking-[0.12em] text-tx-muted">
            PATIENT_ID: {patient.id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,1fr)_minmax(0,2fr)] gap-3">
        <div className="flex flex-col gap-3">
          <div className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]">
            <div className="flex items-center gap-2.5 mb-3">
              <UserRound size={16} className="text-tx-muted" strokeWidth={1.5} />
              <h2 className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] leading-relaxed text-tx-muted">Admission details</h2>
            </div>
            <div className="w-full aspect-[4/3] max-h-[180px] rounded-md bg-surface-muted flex items-center justify-center text-[2rem] font-semibold text-tx-secondary border border-border-subtle grayscale mb-4">
              {patient.avatar}
            </div>

            {[
              { label: 'Age / Gender', value: `${patient.age} · ${patient.gender}` },
              { label: 'Blood type', value: patient.bloodType },
              { label: 'Admitted', value: patient.admittedDate },
              { label: 'Ward / Room', value: patient.ward },
              { label: 'Primary diagnosis', value: patient.condition },
              { label: 'Attending', value: patient.doctor },
              { label: 'Emergency contact', value: patient.phone },
            ].map((row) => (
              <div key={row.label} className="mb-3">
                <p className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] leading-relaxed text-tx-muted mb-[6px]">{row.label}</p>
                <p className="font-primary text-[0.9375rem] font-medium leading-[1.45] text-tx-primary">{row.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: '80ms' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Activity size={16} className="text-tx-muted" strokeWidth={1.5} />
                <h2 className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] leading-relaxed text-tx-muted">Real-time vitals</h2>
              </div>
              <span className="font-tech font-medium tabular-nums text-[0.625rem] text-success">LIVE TELEMETRY</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {VITAL_CONFIG.map(({ key, label, unit }) => {
                const raw = patient.vitals[key];
                const display = String(raw);
                return (
                  <div key={key} className="bg-elevated rounded-md p-3 border border-border-subtle">
                    <p className="font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-tx-dim mb-2 text-center">{label}</p>
                    <div className="flex items-baseline justify-center gap-[6px] flex-wrap">
                      <span className="text-[1.75rem] font-bold text-tx-primary tracking-[-0.03em] font-primary">
                        {display}
                      </span>
                      <span className="font-primary text-[0.9375rem] text-tx-secondary text-[0.75rem] text-tx-muted">{unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="bg-card rounded-lg p-4 border border-border-default shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both] border-solid"
            style={{ animationDelay: '120ms' }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <FileText size={16} className="text-tx-muted" strokeWidth={1.5} />
              <h2 className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] leading-relaxed text-tx-muted">Physician notes</h2>
            </div>
            <p className="font-primary text-[0.9375rem] leading-[1.75] text-tx-secondary">
              Patient remains hemodynamically stable with continuous telemetry. Labs reviewed; no acute interval change.
              Continue current protocol and reassess prior to next shift handoff. Document any breakthrough pain or SpO₂
              variability in the ward log.
            </p>
          </div>

          {history.length > 0 && (
            <div className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: '160ms' }}>
              <h2 className="font-tech text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-tx-dim mb-3">Logged events</h2>
              <div className="flex flex-col gap-3">
                {history.map((record) => (
                  <div key={`${record.date}-${record.description}`}>
                    <p className="font-tech font-medium tabular-nums text-[0.6875rem] text-accent mb-[6px]">{record.date}</p>
                    <p className="font-primary text-[0.9375rem] text-tx-secondary text-tx-primary">{record.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed left-0 lg:left-[216px] right-0 bottom-0 py-3 px-4 sm:px-5 bg-gradient-to-b from-transparent to-[var(--color-root)] via-[var(--color-root)_35%] border-t border-border-subtle flex justify-end gap-2 z-40">
        <button type="button" className="inline-flex items-center rounded-md cursor-pointer transition-all duration-150 active:scale-98 h-10 px-[18px] justify-center gap-2 bg-transparent text-tx-primary border border-border-strong hover:border-tx-muted hover:bg-white/5 font-primary text-[0.8125rem] font-semibold min-w-[160px]">
          Generate Report
        </button>
        <button type="button" className="inline-flex items-center rounded-md border-none cursor-pointer text-white font-primary font-semibold transition-all duration-150 hover:bg-accent-hover active:scale-98 h-10 px-[18px] justify-center gap-2 bg-accent text-[0.8125rem] min-w-[200px]">
          Schedule Follow-up
        </button>
      </div>
    </PageShell>
  );
}
