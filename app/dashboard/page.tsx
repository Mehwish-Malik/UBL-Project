'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { StatCard } from '@/components/dashboard/stat-card';
import { BarChartCard } from '@/components/charts/bar-chart-card';
import { PieChartCard } from '@/components/charts/pie-chart-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, TrendingDown, Target, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  dashboardStats,
  recentTransactions,
  spendingByCategory,
  monthlySpending,
} from '@/data/mock-data';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
          <p className="mt-2 text-slate-400">Your Financial World, Connected. AI-powered insights at your fingertips.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Balance"
            value={`PKR ${(dashboardStats.totalBalance / 1000).toFixed(0)}K`}
            change="+12.5% from last month"
            changeType="positive"
            icon={Wallet}
            iconColor="bg-gradient-to-br from-[#0052D4] to-[#003d9e]"
          />
          <StatCard
            title="Monthly Spending"
            value={`PKR ${(dashboardStats.monthlySpending / 1000).toFixed(0)}K`}
            change="-3.2% from last month"
            changeType="positive"
            icon={TrendingDown}
            iconColor="bg-gradient-to-br from-blue-600 to-blue-700"
          />
          <StatCard
            title="Savings Goal"
            value={`PKR ${(dashboardStats.savingsGoal / 1000).toFixed(0)}K`}
            change="40% achieved"
            changeType="neutral"
            icon={Target}
            iconColor="bg-gradient-to-br from-amber-600 to-amber-700"
          />
          <StatCard
            title="Credit Score"
            value={dashboardStats.creditScore.toString()}
            change="+30 from last month"
            changeType="positive"
            icon={Award}
            iconColor="bg-gradient-to-br from-purple-600 to-purple-700"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <BarChartCard
            title="Monthly Income vs Spending"
            description="Last 6 months comparison"
            data={monthlySpending}
            dataKeys={[
              { key: 'income', color: '#0052D4', name: 'Income' },
              { key: 'spending', color: '#ef4444', name: 'Spending' },
            ]}
          />
          <PieChartCard
            title="Spending by Category"
            description="Current month breakdown"
            data={spendingByCategory}
            colors={['#0052D4', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']}
          />
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        transaction.type === 'credit' ? 'bg-emerald-600/20' : 'bg-red-600/20'
                      }`}
                    >
                      {transaction.type === 'credit' ? (
                        <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-100">{transaction.description}</p>
                      <p className="text-sm text-slate-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-emerald-500' : 'text-slate-100'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : ''}PKR {Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
