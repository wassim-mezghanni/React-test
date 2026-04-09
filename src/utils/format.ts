/**
 * Format a number as compact currency, adaptive precision to keep strings short.
 *   >= 1B   → $1.2B
 *   >= 100M → $124M
 *   >= 1M   → $15.5M
 *   >= 100K → $473K
 *   >= 1K   → $15.2K
 *   < 1K    → $900
 */
export const fmtCurrency = (v: number) => {
  const sign = v < 0 ? '-' : '';
  const abs = Math.abs(v);
  if (abs >= 999_500_000) return `${sign}$${(abs / 1_000_000_000).toFixed(abs >= 10_000_000_000 ? 0 : 1)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(abs >= 100_000_000 ? 0 : 1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(abs >= 100_000 ? 0 : 1)}K`;
  return `${sign}$${abs.toLocaleString()}`;
};

/** Format a number as a signed percentage: +5.2%, -3.1% */
export const fmtPct = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;

/** Map a record status string to a Chip variant */
export const statusChipVariant = (s: string) => {
  switch (s) {
    case 'New': return 'primary' as const;
    case 'Removed': return 'error' as const;
    default: return 'surface' as const;
  }
};

/** Convert a PascalCase dimension name to its snake_case data key */
export const dimKey = (dimension: string) => {
  switch (dimension) {
    case 'CostCenter': return 'cost_center';
    case 'ProfitCenter': return 'profit_center';
    case 'Customer': return 'customer';
    case 'Supplier': return 'supplier';
    case 'DocumentType': return 'document_type';
    default: return dimension.toLowerCase();
  }
};

/** Insert a space before each uppercase letter: "CostCenter" → "Cost Center" */
export const humanize = (s: string) => s.replace(/([A-Z])/g, ' $1').trim();
