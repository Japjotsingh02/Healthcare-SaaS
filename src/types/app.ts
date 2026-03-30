export type ViewMode = 'grid' | 'list';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'danger';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
}

export type PatientStatus = 'Stable' | 'Critical' | 'Recovering' | 'Discharged';

export interface PatientVitals {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  oxygen: number;
}

export interface Patient {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: string;
  bloodType: string;
  condition: string;
  status: PatientStatus;
  ward: string;
  doctor: string;
  phone: string;
  email: string;
  admittedDate: string;
  lastVisit: string;
  nextAppointment: string;
  vitals: PatientVitals;
  history?: { date: string; description: string }[];
}
