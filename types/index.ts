// Dashboard Types
export interface DashboardStats {
  totalBalance: number;
  monthlySpending: number;
  savingsGoal: number;
  creditScore: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
}

export interface FraudAlert {
  id: string;
  timestamp: string;
  type: 'high' | 'medium' | 'low';
  description: string;
  amount?: number;
  status: 'pending' | 'resolved' | 'investigating';
}

export interface LoanEligibility {
  eligible: boolean;
  maxAmount: number;
  interestRate: number;
  tenure: number;
  creditScore: number;
  monthlyIncome: number;
}

export interface FinancialHealth {
  score: number;
  category: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  factors: {
    creditScore: number;
    debtToIncome: number;
    savingsRate: number;
    paymentHistory: number;
  };
  recommendations: string[];
}

export interface ChartData {
  name: string;
  value?: number;
  [key: string]: string | number | undefined;
}
