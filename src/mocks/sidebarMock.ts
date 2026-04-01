export const defaultUser = {
  name: 'Wassim M',
  email: 'wassim@querai.com',
  avatarUrl: '',
};

export const sidebarProjects = [
  {
    id: 'q3-review',
    name: 'Q3 Financial Review',
    subLabel: 'Recent',
    expanded: true,
    children: [
      { id: 'initial', label: 'Initial Analysis' },
      { id: 'budget', label: 'Budget Breakdown' },
      { id: 'savings', label: 'Savings Plan' },
    ],
  },
  { id: 'portfolio', name: 'Investment Portfolio', subLabel: '3 chats' },
];

export const sidebarChats = [
  { id: '1', title: 'Retirement Savings Plan', time: '2h ago' },
  { id: '2', title: 'Budget Optimization', time: '5h ago' },
  { id: '3', title: 'Expense Tracking Setup', time: 'Yesterday' },
  { id: '4', title: 'Emergency Fund Goals', time: 'Oct 12' },
];
