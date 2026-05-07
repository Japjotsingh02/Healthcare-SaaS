import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '../../types';
import { usePatientStore } from '../../store/patientStore';
import StatusBadge from '../common/StatusBadge';

interface Props {
  patient: Patient;
  index: number;
}

export default function PatientCard({ patient, index }: Props) {
  const navigate = useNavigate();
  const { selectPatient } = usePatientStore();

  const handleClick = () => {
    selectPatient(patient);
    navigate(`/patients/${patient.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-card rounded-lg p-4 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] cursor-pointer transition-all hover:bg-card-hover hover:border-border-default animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both] text-left w-full flex flex-col"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-start justify-between mb-3 w-full">
        <p className="font-tech font-medium tabular-nums text-[0.625rem] text-tx-muted tracking-[0.1em]">
          {patient.id}
        </p>
        <StatusBadge status={patient.status} />
      </div>

      <h3 className="font-primary text-[1.0625rem] font-semibold leading-relaxed tracking-tight text-tx-primary mb-2">
        {patient.name}
      </h3>
      <p className="font-primary text-[0.875rem] text-tx-secondary mb-5">
        {patient.condition}
      </p>

      <div className="border-t border-border-subtle pt-4 flex items-center justify-between gap-4 w-full mt-auto">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-surface-muted border border-border-default flex items-center justify-center text-[0.625rem] font-tech text-tx-secondary shrink-0">
            {patient.doctor.slice(0, 2).toUpperCase()}
          </div>
          <span className="font-primary text-[0.8125rem] text-tx-secondary truncate">
            {patient.doctor}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Calendar size={14} className="text-tx-muted" strokeWidth={1.5} />
          <span className="font-tech font-medium tabular-nums text-[0.75rem] text-tx-muted">
            {patient.nextAppointment}
          </span>
        </div>
      </div>
    </button>
  );
}
