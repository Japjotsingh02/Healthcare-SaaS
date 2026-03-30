// src/components/patients/ViewToggle.tsx
import { LayoutGrid, List } from 'lucide-react';
import type { ViewMode } from '../../types';

interface Props {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ mode, onChange }: Props) {
  return (
    <div className="flex items-center p-1 gap-1 bg-card rounded-md border border-border-subtle">
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={`flex items-center gap-1.5 py-2 px-3 rounded-md border-none font-primary text-[0.75rem] font-semibold tracking-[0.06em] uppercase cursor-pointer transition-colors duration-150 ${mode === 'grid' ? 'bg-accent-muted text-accent' : 'bg-transparent text-tx-muted'}`}
      >
        <LayoutGrid size={16} strokeWidth={1.5} />
        Grid
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        className={`flex items-center gap-1.5 py-2 px-3 rounded-md border-none font-primary text-[0.75rem] font-semibold tracking-[0.06em] uppercase cursor-pointer transition-colors duration-150 ${mode === 'list' ? 'bg-accent-muted text-accent' : 'bg-transparent text-tx-muted'}`}
      >
        <List size={16} strokeWidth={1.5} />
        List
      </button>
    </div>
  );
}
