export interface UseCaseItem {
  id: string;
  label: string;
  icon: string;
  category: string;
  status?: 'Beta' | 'Coming Soon' | 'New';
  color?: string;
}

export const availableUseCases: UseCaseItem[] = [
  {
    id: 'UC_001',
    label: 'Financial Variance Analysis',
    icon: 'payments',
    category: 'Finance',
    status: 'New',
    color: '#1A4D2E'
  },
  {
    id: 'UC_002',
    label: 'Predecition  Analysis',
    icon: 'account_balance',
    category: 'Finance',
    status: 'Coming Soon',
    color: '#4F6F52'
  },
  {
    id: 'UC_003',
    label: 'Order to Cash',
    icon: 'trending_up',
    category: 'Treasury',
    status: 'Beta',
    color: '#739072'
  },

];
