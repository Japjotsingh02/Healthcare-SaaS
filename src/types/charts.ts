/** Payload row passed into Recharts `<Tooltip content={...} />` renderers. */
export interface ChartTooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
}

export interface RechartsTooltipContentProps {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: string;
}
