import type { Patient, PatientStatus } from '../types';

export function countByStatus(patients: Patient[], status: PatientStatus): number {
  return patients.filter((p) => p.status === status).length;
}

export function patientStatusCounts(patients: Patient[]): Record<PatientStatus, number> {
  return {
    Stable: countByStatus(patients, 'Stable'),
    Critical: countByStatus(patients, 'Critical'),
    Recovering: countByStatus(patients, 'Recovering'),
    Discharged: countByStatus(patients, 'Discharged'),
  };
}

export function wardOccupancyPercent(patientCount: number, capacity: number): number {
  if (patientCount === 0 || capacity <= 0) return 0;
  return Math.min(100, Math.round((patientCount / capacity) * 100));
}
