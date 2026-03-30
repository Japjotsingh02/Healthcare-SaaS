// src/components/patients/PatientList.tsx
import { useNavigate } from 'react-router-dom';
import type { Patient } from '../../types';
import { usePatientStore } from '../../store/patientStore';
import StatusBadge from '../common/StatusBadge';

const COLS = 'grid-cols-[2.5fr_1.5fr_1fr_1fr_1fr_1.5fr]';

interface Props {
  patients: Patient[];
}

export default function PatientList({ patients }: Props) {
  const navigate = useNavigate();
  const { selectPatient } = usePatientStore();

  const handleClick = (patient: Patient) => {
    selectPatient(patient);
    navigate(`/patients/${patient.id}`);
  };

  return (
    <div className="bg-card rounded-lg border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06)] p-0 overflow-hidden">
      {/* Header */}
      <div className={`grid ${COLS} gap-3 py-2.5 px-4 border-b border-[#47474e66] bg-root`}>
        {['Patient', 'Condition', 'Age / Blood', 'Ward', 'Status', 'Doctor'].map((h) => (
          <p key={h} className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] leading-relaxed text-tx-muted">{h}</p>
        ))}
      </div>

      {/* Rows */}
      {patients.map((p, i) => (
        <button
          key={p.id}
          onClick={() => handleClick(p)}
          className={`w-full grid ${COLS} gap-3 py-3 px-4 text-left border-b ${i === patients.length - 1 ? 'border-none' : 'border-[#47474e33]'} bg-transparent border-t-0 border-x-0 cursor-pointer transition-colors duration-150 animate-[fade-in_0.22s_ease-out_both] items-center hover:bg-card-hover focus:outline-none`}
          style={{ animationDelay: `${i * 30}ms` }}
        >
          {/* Patient */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-9 h-9 rounded-md shrink-0 bg-sidebar flex items-center justify-center border border-[#47474e66]">
              {p.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-primary text-[0.9375rem] font-medium leading-[1.45] text-tx-primary truncate">{p.name}</p>
              <p className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] leading-relaxed text-tx-muted truncate">{p.id}</p>
            </div>
          </div>

          <p className="font-primary text-[0.9375rem] text-tx-secondary truncate overflow-hidden">{p.condition}</p>
          <p className="font-primary text-[0.9375rem] text-tx-secondary truncate font-tech font-medium tabular-nums border-none outline-none">{p.age}y / {p.bloodType}</p>
          <p className="font-primary text-[0.9375rem] text-tx-secondary truncate">{p.ward}</p>
          <div><StatusBadge status={p.status} /></div>
          <p className="font-primary text-[0.9375rem] text-tx-secondary truncate">{p.doctor}</p>
        </button>
      ))}
    </div>
  );
}
