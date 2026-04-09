import type { ReactNode } from 'react';

interface VarianceValueProps {
  value: number;
  formatter?: (v: number) => string;
  className?: string;
}

/**
 * Renders a numeric value colored by sign:
 * negative → text-error, positive → text-primary, zero → default.
 */
export function VarianceValue({ value, formatter, className = '' }: VarianceValueProps): ReactNode {
  const color = value < 0 ? 'text-error' : value > 0 ? 'text-primary' : '';
  const display = formatter ? formatter(value) : String(value);
  return <span className={`${color} ${className}`}>{display}</span>;
}
