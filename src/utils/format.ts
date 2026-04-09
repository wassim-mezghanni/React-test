/** Format a number as compact currency: $1.23M, $45.0K, $900 */
export const fmtCurrency = (v: number) => {
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `${v < 0 ? '-' : ''}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${v < 0 ? '-' : ''}$${(abs / 1_000).toFixed(1)}K`;
  return `$${v.toLocaleString()}`;
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
