export interface RecentTransaction {
  id: string;
  date: string;
  docNumber: string;
  companyCode: string;
  companyName: string;
  amount: number;
  type: 'debit' | 'credit';
  currency: string;
  docType: string;
}

export interface AnalysisSession {
  id: string;
  title: string;
  companyCode: string;
  status: 'completed' | 'running' | 'queued';
  timestamp: string;
  icon: string;
}

export interface AIInsight {
  id: string;
  severity: 'warning' | 'error' | 'success' | 'info';
  title: string;
  message: string;
  icon: string;
  timestamp: string;
}

export const revenueData = [
  { month: 'Nov', revenue: 1820000 },
  { month: 'Dec', revenue: 1950000 },
  { month: 'Jan', revenue: 2100000 },
  { month: 'Feb', revenue: 1980000 },
  { month: 'Mar', revenue: 2340000 },
  { month: 'Apr', revenue: 2510000 },
];

export const postingActivityData = [
  { company: '1000 — SAP Global', SA: 142, DZ: 87, RE: 64, KR: 35, AB: 21 },
  { company: '2000 — Querai EU', SA: 98, DZ: 62, RE: 45, KR: 28, AB: 15 },
  { company: '3000 — Querai NA', SA: 76, DZ: 54, RE: 38, KR: 19, AB: 12 },
  { company: '4000 — Querai AP', SA: 53, DZ: 31, RE: 22, KR: 14, AB: 8 },
];

export const companyComparisonData = [
  { company: '1000 — SAP Global Corp', documents: 349 },
  { company: '2000 — Querai Europe GmbH', documents: 248 },
  { company: '3000 — Querai North America', documents: 199 },
  { company: '4000 — Querai Asia Pacific', documents: 128 },
];

export const recentTransactions: RecentTransaction[] = [
  { id: '1', date: '2026-04-02', docNumber: '5100000310', companyCode: '2000', companyName: 'Querai Europe', amount: 148500.75, type: 'debit', currency: 'EUR', docType: 'AB' },
  { id: '2', date: '2026-04-01', docNumber: '5100000288', companyCode: '3000', companyName: 'Querai NA', amount: 61200.00, type: 'credit', currency: 'USD', docType: 'KR' },
  { id: '3', date: '2026-04-01', docNumber: '5100000178', companyCode: '3000', companyName: 'Querai NA', amount: 54320.00, type: 'credit', currency: 'USD', docType: 'KR' },
  { id: '4', date: '2026-03-28', docNumber: '5100000266', companyCode: '1000', companyName: 'SAP Global', amount: 275000.00, type: 'debit', currency: 'EUR', docType: 'RE' },
  { id: '5', date: '2026-03-25', docNumber: '5100000244', companyCode: '4000', companyName: 'Querai AP', amount: 37650.00, type: 'credit', currency: 'JPY', docType: 'DZ' },
];

export const analysisSessions: AnalysisSession[] = [
  { id: '1', title: 'FY2026 Q1 Consolidation', companyCode: 'All', status: 'completed', timestamp: '2 hours ago', icon: 'assessment' },
  { id: '2', title: 'Intercompany Reconciliation', companyCode: '1000 / 2000', status: 'running', timestamp: 'In progress', icon: 'sync' },
  { id: '3', title: 'AP Aging Analysis', companyCode: '3000', status: 'completed', timestamp: '5 hours ago', icon: 'schedule' },
  { id: '4', title: 'Revenue Recognition Check', companyCode: '1000', status: 'queued', timestamp: 'Queued', icon: 'pending' },
];

export const aiInsights: AIInsight[] = [
  {
    id: '1',
    severity: 'warning',
    title: 'Unusual Posting Pattern Detected',
    message: 'Company code 2000 shows a 340% spike in clearing documents (AB) compared to last period. Review recommended.',
    icon: 'warning',
    timestamp: '15 min ago',
  },
  {
    id: '2',
    severity: 'error',
    title: 'Reconciliation Mismatch',
    message: 'Intercompany balance between 1000 and 3000 has a EUR 12,450 discrepancy in period 03/2026.',
    icon: 'error',
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    severity: 'success',
    title: 'Month-End Close Ready',
    message: 'All posting periods for company code 4000 have been validated. No anomalies detected in JPY transactions.',
    icon: 'check_circle',
    timestamp: '3 hours ago',
  },
  {
    id: '4',
    severity: 'info',
    title: 'Predictive Forecast Updated',
    message: 'Q2 revenue forecast for Querai Europe revised upward by 8.2% based on current posting trends.',
    icon: 'auto_awesome',
    timestamp: '4 hours ago',
  },
];
