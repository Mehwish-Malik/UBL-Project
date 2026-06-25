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
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your Financial World, Connected. AI-powered insights at your fingertips.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
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
        </motion.div>

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0 hover:bg-muted/30 -mx-2 px-2 py-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          transaction.type === 'credit'
                            ? 'bg-emerald-600/20 dark:bg-emerald-600/20'
                            : 'bg-red-600/20 dark:bg-red-600/20'
                        }`}
                      >
                        {transaction.type === 'credit' ? (
                          <ArrowUpRight className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-red-600 dark:text-red-500" />
                        )}
                      </motion.div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === 'credit'
                            ? 'text-emerald-600 dark:text-emerald-500'
                            : 'text-foreground'
                        }`}
                      >
                        {transaction.type === 'credit' ? '+' : ''}PKR {Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <Badge variant="outline" className="mt-1">
                        {transaction.category}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
