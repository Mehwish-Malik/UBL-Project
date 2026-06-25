import { DashboardStats, Transaction, FraudAlert, LoanEligibility, FinancialHealth, ChartData } from '@/types';

// Dashboard Statistics
export const dashboardStats: DashboardStats = {
  totalBalance: 1250000,
  monthlySpending: 185000,
  savingsGoal: 500000,
  creditScore: 750,
};

// Recent Transactions
export const recentTransactions: Transaction[] = [
  {
    id: '1',
    date: '2026-06-24',
    description: 'Grocery Store',
    amount: -5500,
    type: 'debit',
    category: 'Food & Dining',
  },
  {
    id: '2',
    date: '2026-06-23',
    description: 'Salary Credit',
    amount: 150000,
    type: 'credit',
    category: 'Income',
  },
  {
    id: '3',
    date: '2026-06-22',
    description: 'Utility Bill',
    amount: -12000,
    type: 'debit',
    category: 'Bills & Utilities',
  },
  {
    id: '4',
    date: '2026-06-21',
    description: 'Online Shopping',
    amount: -25000,
    type: 'debit',
    category: 'Shopping',
  },
  {
    id: '5',
    date: '2026-06-20',
    description: 'Fuel Station',
    amount: -8000,
    type: 'debit',
    category: 'Transportation',
  },
];

// Spending by Category
export const spendingByCategory: ChartData[] = [
  { name: 'Food & Dining', value: 45000 },
  { name: 'Shopping', value: 52000 },
  { name: 'Bills & Utilities', value: 35000 },
  { name: 'Transportation', value: 28000 },
  { name: 'Entertainment', value: 15000 },
  { name: 'Healthcare', value: 10000 },
];

// Monthly Spending Trend
export const monthlySpending: ChartData[] = [
  { name: 'Jan', spending: 165000, income: 150000 },
  { name: 'Feb', spending: 142000, income: 150000 },
  { name: 'Mar', spending: 178000, income: 150000 },
  { name: 'Apr', spending: 155000, income: 150000 },
  { name: 'May', spending: 192000, income: 150000 },
  { name: 'Jun', spending: 185000, income: 150000 },
];

// Fraud Alerts
export const fraudAlerts: FraudAlert[] = [
  {
    id: '1',
    timestamp: '2026-06-25T10:30:00',
    type: 'high',
    description: 'Unusual transaction detected from foreign location',
    amount: 75000,
    status: 'investigating',
  },
  {
    id: '2',
    timestamp: '2026-06-24T15:45:00',
    type: 'medium',
    description: 'Multiple failed login attempts',
    status: 'resolved',
  },
  {
    id: '3',
    timestamp: '2026-06-23T09:15:00',
    type: 'low',
    description: 'New device login detected',
    status: 'resolved',
  },
  {
    id: '4',
    timestamp: '2026-06-22T18:20:00',
    type: 'medium',
    description: 'Card details accessed from unknown location',
    status: 'pending',
  },
];

// Loan Eligibility Data
export const loanEligibility: LoanEligibility = {
  eligible: true,
  maxAmount: 2500000,
  interestRate: 9.5,
  tenure: 60,
  creditScore: 750,
  monthlyIncome: 150000,
};

// Financial Health Score
export const financialHealth: FinancialHealth = {
  score: 78,
  category: 'Good',
  factors: {
    creditScore: 85,
    debtToIncome: 70,
    savingsRate: 75,
    paymentHistory: 82,
  },
  recommendations: [
    'Increase your monthly savings by 10% to improve your financial buffer',
    'Consider paying off high-interest debts to improve debt-to-income ratio',
    'Maintain consistent payment history for better credit score',
    'Diversify your investment portfolio for long-term growth',
  ],
};

// Credit Score History
export const creditScoreHistory: ChartData[] = [
  { name: 'Jan', score: 720 },
  { name: 'Feb', score: 725 },
  { name: 'Mar', score: 730 },
  { name: 'Apr', score: 735 },
  { name: 'May', score: 742 },
  { name: 'Jun', score: 750 },
];
