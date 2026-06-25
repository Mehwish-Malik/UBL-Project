'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChartCard } from '@/components/charts/line-chart-card';
import {
  Heart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  Lightbulb
} from 'lucide-react';
import { financialHealth, creditScoreHistory } from '@/data/mock-data';

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-[#0052D4]';
  if (score >= 60) return 'text-blue-500';
  if (score >= 40) return 'text-amber-500';
  return 'text-red-500';
};

const getScoreBgColor = (score: number) => {
  if (score >= 80) return 'bg-gradient-to-br from-[#0052D4] to-[#003d9e]';
  if (score >= 60) return 'bg-blue-600';
  if (score >= 40) return 'bg-amber-600';
  return 'bg-red-600';
};

const getCategoryBadge = (category: string) => {
  switch (category) {
    case 'Excellent':
      return <Badge variant="success">Excellent</Badge>;
    case 'Good':
      return <Badge className="bg-blue-600 text-white">Good</Badge>;
    case 'Fair':
      return <Badge variant="warning">Fair</Badge>;
    case 'Poor':
      return <Badge variant="destructive">Poor</Badge>;
    default:
      return <Badge variant="outline">{category}</Badge>;
  }
};

export default function FinancialHealthPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Financial Health Analytics</h1>
          <p className="mt-2 text-slate-400">AI-powered wellness tracking and personalized financial guidance</p>
        </div>

        {/* Main Score Card */}
        <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-slate-900/50">
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative">
                <div className={`flex h-40 w-40 items-center justify-center rounded-full ${getScoreBgColor(financialHealth.score)}`}>
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-950">
                    <div>
                      <p className={`text-5xl font-bold ${getScoreColor(financialHealth.score)}`}>
                        {financialHealth.score}
                      </p>
                      <p className="text-sm text-slate-400">/ 100</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2">
                  <Heart className="h-8 w-8 text-emerald-500 fill-emerald-500" />
                </div>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-slate-100">
                Your Financial Health is {financialHealth.category}
              </h2>
              <div className="mt-4">
                {getCategoryBadge(financialHealth.category)}
              </div>
              <p className="mt-4 max-w-2xl text-slate-400">
                Your financial health score is calculated based on multiple factors including credit score,
                debt-to-income ratio, savings rate, and payment history.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Health Factors */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-400">Credit Score</p>
                  <Badge variant="success">{financialHealth.factors.creditScore}%</Badge>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#0052D4] to-[#0041a8] transition-all"
                    style={{ width: `${financialHealth.factors.creditScore}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">Excellent standing</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-400">Debt-to-Income</p>
                  <Badge className="bg-blue-600 text-white">{financialHealth.factors.debtToIncome}%</Badge>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${financialHealth.factors.debtToIncome}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">Healthy ratio</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-400">Savings Rate</p>
                  <Badge className="bg-purple-600 text-white">{financialHealth.factors.savingsRate}%</Badge>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-purple-600 transition-all"
                    style={{ width: `${financialHealth.factors.savingsRate}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">Good progress</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-400">Payment History</p>
                  <Badge className="bg-amber-600 text-white">{financialHealth.factors.paymentHistory}%</Badge>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-amber-600 transition-all"
                    style={{ width: `${financialHealth.factors.paymentHistory}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">Very good</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Recommendations */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Credit Score Trend */}
          <LineChartCard
            title="Credit Score Trend"
            description="6-month credit score history"
            data={creditScoreHistory}
            dataKeys={[
              { key: 'score', color: '#0052D4', name: 'Credit Score' },
            ]}
          />

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>Action items to improve your financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialHealth.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/30 p-4"
                  >
                    <div className="mt-0.5">
                      <Target className="h-5 w-5 text-[#0052D4]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-100">{recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full" variant="default">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Detailed Action Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Financial Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Goals & Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0052D4] to-[#003d9e]">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-100">Emergency Fund</p>
                    <p className="text-xs text-slate-500">3 months expenses saved</p>
                  </div>
                </div>
                <div className="mt-4 h-2 w-full rounded-full bg-slate-800">
                  <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-[#0052D4] to-[#0041a8]" />
                </div>
                <p className="mt-2 text-xs text-slate-400">75% complete</p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-100">Debt Reduction</p>
                    <p className="text-xs text-slate-500">Pay off credit cards</p>
                  </div>
                </div>
                <div className="mt-4 h-2 w-full rounded-full bg-slate-800">
                  <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700" />
                </div>
                <p className="mt-2 text-xs text-slate-400">50% complete</p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-100">Investment Goals</p>
                    <p className="text-xs text-slate-500">Build investment portfolio</p>
                  </div>
                </div>
                <div className="mt-4 h-2 w-full rounded-full bg-slate-800">
                  <div className="h-2 w-1/4 rounded-full bg-amber-600" />
                </div>
                <p className="mt-2 text-xs text-slate-400">25% complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
