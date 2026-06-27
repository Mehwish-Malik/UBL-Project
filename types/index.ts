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

// Fraud Detection Types
export type ThreatLevel = 'SAFE' | 'SUSPICIOUS' | 'HIGH RISK';

export interface FraudAnalysisRequest {
  message: string;
  type: 'sms' | 'whatsapp' | 'email' | 'query' | 'transfer';
}

export interface FraudAnalysisResult {
  riskScore: number;
  threatLevel: ThreatLevel;
  reasons: string[];
  recommendations: string[];
  analysis: string;
  detectedThreats: string[];
  timestamp: string;
}

export interface FraudPattern {
  pattern: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}
