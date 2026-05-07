import { create } from 'zustand';
import type { Patient, ViewMode } from '../types';
import { MOCK_PATIENTS } from '../utils/mockData';

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  viewMode: ViewMode;
  searchQuery: string;
  statusFilter: string;
  loading: boolean;

  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (q: string) => void;
  setStatusFilter: (s: string) => void;
  selectPatient: (p: Patient | null) => void;
  fetchPatients: () => Promise<void>;
  getFilteredPatients: () => Patient[];
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: [],
  selectedPatient: null,
  viewMode: 'grid',
  searchQuery: '',
  statusFilter: 'All',
  loading: false,

  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setStatusFilter: (s) => set({ statusFilter: s }),
  selectPatient: (p) => set({ selectedPatient: p }),

  fetchPatients: async () => {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 800));
    set({ patients: MOCK_PATIENTS, loading: false });
  },

  getFilteredPatients: () => {
    const { patients, searchQuery, statusFilter } = get();
    return patients.filter((p) => {
      const matchSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  },
}));
