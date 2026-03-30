import type { SystemActivityItem } from '../../types';

interface Props {
  items: SystemActivityItem[];
}

export default function ActivityFeed({ items }: Props) {
  return (
    <div className="flex flex-col flex-1 gap-0">
      {items.map((row, i) => (
        <div
          key={row.title}
          className={`py-2.5 ${i < items.length - 1 ? 'border-b border-border-subtle' : ''}`}
        >
          <p
            className={`font-primary text-[0.75rem] font-medium ${row.urgent ? 'text-danger' : 'text-tx-primary'}`}
          >
            {row.title}
          </p>
          <p
            className={`font-tech font-medium tabular-nums mt-1 text-[0.625rem] ${row.urgent ? 'text-rose-500/85' : 'text-tx-muted'}`}
          >
            {row.time}
          </p>
        </div>
      ))}
    </div>
  );
}
