export interface MetadataOption {
  value: string;
  label: string;
}

export const sapMetadataMock: Record<string, MetadataOption[]> = {
  'company-codes': [
    { value: '1000', label: '1000 - Quatelio Germany' },
    { value: '2000', label: '2000 - Quatelio USA' },
    { value: '3000', label: '3000 - Quatelio France' },
    { value: '4000', label: '4000 - Quatelio Spain' },
  ],
  'fiscal-years': [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
  ],
  'periods': [
    { value: '01', label: '01 - January' },
    { value: '02', label: '02 - February' },
    { value: '03', label: '03 - March' },
    { value: '04', label: '04 - April' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - June' },
    { value: '07', label: '07 - July' },
    { value: '08', label: '08 - August' },
    { value: '09', label: '09 - September' },
    { value: '10', label: '10 - October' },
    { value: '11', label: '11 - November' },
    { value: '12', label: '12 - December' },
  ],
  'ledgers': [
    { value: '0L', label: '0L - Leading Ledger' },
    { value: '2L', label: '2L - Local Ledger' },
    { value: 'IF', label: 'IF - IFRS Ledger' },
  ],
};

export function getMockMetadata(source: string, endpoint: string): MetadataOption[] {
  if (source === 'sap') {
    return sapMetadataMock[endpoint] || [];
  }
  return [];
}
