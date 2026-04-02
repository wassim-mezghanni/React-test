export interface FinancialEntry {
  id: string;
  BUKRS: string;   // Company Code
  BELNR: string;   // Document Number
  GJAHR: string;   // Fiscal Year
  MONAT: string;   // Period
  HKONT: string;   // G/L Account
  BLART: string;   // Document Type
  DMBTR: number;   // Amount in Local Currency
  SHKZG: string;   // Debit/Credit Indicator
  WAERS: string;   // Currency Key
  BUDAT: string;   // Posting Date
}

export const financialTableData: FinancialEntry[] = [
  { id: '1',  BUKRS: '1000', BELNR: '5100000012', GJAHR: '2026', MONAT: '01', HKONT: '0011000000', BLART: 'SA', DMBTR: 245000.00,  SHKZG: 'S', WAERS: 'EUR', BUDAT: '2026-01-15' },
  { id: '2',  BUKRS: '1000', BELNR: '5100000034', GJAHR: '2026', MONAT: '01', HKONT: '0014000000', BLART: 'DZ', DMBTR: 82500.50,   SHKZG: 'H', WAERS: 'EUR', BUDAT: '2026-01-20' },
  { id: '3',  BUKRS: '2000', BELNR: '5100000056', GJAHR: '2026', MONAT: '02', HKONT: '0040000000', BLART: 'RE', DMBTR: 156300.00,  SHKZG: 'S', WAERS: 'EUR', BUDAT: '2026-02-03' },
  { id: '4',  BUKRS: '1000', BELNR: '5100000078', GJAHR: '2026', MONAT: '02', HKONT: '0047100000', BLART: 'KR', DMBTR: 43200.75,   SHKZG: 'H', WAERS: 'EUR', BUDAT: '2026-02-10' },
  { id: '5',  BUKRS: '3000', BELNR: '5100000090', GJAHR: '2026', MONAT: '02', HKONT: '0011000000', BLART: 'SA', DMBTR: 310000.00,  SHKZG: 'S', WAERS: 'USD', BUDAT: '2026-02-18' },
  { id: '6',  BUKRS: '2000', BELNR: '5100000112', GJAHR: '2026', MONAT: '03', HKONT: '0080000000', BLART: 'AB', DMBTR: 67800.00,   SHKZG: 'S', WAERS: 'EUR', BUDAT: '2026-03-01' },
  { id: '7',  BUKRS: '1000', BELNR: '5100000134', GJAHR: '2026', MONAT: '03', HKONT: '0014000000', BLART: 'DZ', DMBTR: 125400.25,  SHKZG: 'H', WAERS: 'EUR', BUDAT: '2026-03-08' },
  { id: '8',  BUKRS: '4000', BELNR: '5100000156', GJAHR: '2026', MONAT: '03', HKONT: '0040000000', BLART: 'RE', DMBTR: 198750.00,  SHKZG: 'S', WAERS: 'JPY', BUDAT: '2026-03-12' },
  { id: '9',  BUKRS: '3000', BELNR: '5100000178', GJAHR: '2026', MONAT: '04', HKONT: '0047100000', BLART: 'KR', DMBTR: 54320.00,   SHKZG: 'H', WAERS: 'USD', BUDAT: '2026-04-01' },
  { id: '10', BUKRS: '1000', BELNR: '5100000200', GJAHR: '2026', MONAT: '04', HKONT: '0080000000', BLART: 'AB', DMBTR: 89100.50,   SHKZG: 'S', WAERS: 'EUR', BUDAT: '2026-04-05' },
  { id: '11', BUKRS: '2000', BELNR: '5100000222', GJAHR: '2026', MONAT: '04', HKONT: '0011000000', BLART: 'SA', DMBTR: 420000.00,  SHKZG: 'S', WAERS: 'EUR', BUDAT: '2026-04-10' },
  { id: '12', BUKRS: '4000', BELNR: '5100000244', GJAHR: '2026', MONAT: '05', HKONT: '0014000000', BLART: 'DZ', DMBTR: 37650.00,   SHKZG: 'H', WAERS: 'JPY', BUDAT: '2026-05-02' },
  { id: '13', BUKRS: '1000', BELNR: '5100000266', GJAHR: '2026', MONAT: '05', HKONT: '0040000000', BLART: 'RE', DMBTR: 275000.00,  SHKZG: 'S', WAERS: 'EUR', BUDAT: '2026-05-14' },
  { id: '14', BUKRS: '3000', BELNR: '5100000288', GJAHR: '2026', MONAT: '06', HKONT: '0047100000', BLART: 'KR', DMBTR: 61200.00,   SHKZG: 'H', WAERS: 'USD', BUDAT: '2026-06-01' },
  { id: '15', BUKRS: '2000', BELNR: '5100000310', GJAHR: '2026', MONAT: '06', HKONT: '0080000000', BLART: 'AB', DMBTR: 148500.75,  SHKZG: 'S', WAERS: 'EUR', BUDAT: '2026-06-20' },
];

export const companyCodeMap: Record<string, string> = {
  '1000': 'SAP Global Corp',
  '2000': 'Querai Europe GmbH',
  '3000': 'Querai North America Inc.',
  '4000': 'Querai Asia Pacific Ltd.',
};

export const docTypeMap: Record<string, string> = {
  'SA': 'G/L Account',
  'DZ': 'Payment Posting',
  'RE': 'Invoice - Gross',
  'KR': 'Vendor Credit Memo',
  'AB': 'Clearing Document',
};
