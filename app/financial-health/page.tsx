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
import { motion } from 'framer-motion';
import { staggerContainer, cardVariant } from '@/lib/animations';
import { useMemo } from 'react';

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

type BadgeVariant = 'success' | 'default';

export default function FinancialHealthPage() {
  // Memoize expensive computations
  const healthFactors = useMemo(() => [
    { label: 'Credit Score', value: financialHealth.factors.creditScore, variant: 'success' as BadgeVariant, desc: 'Excellent standing' },
    { label: 'Debt-to-Income', value: financialHealth.factors.debtToIncome, variant: 'default' as BadgeVariant, desc: 'Healthy ratio' },
    { label: 'Savings Rate', value: financialHealth.factors.savingsRate, variant: 'default' as BadgeVariant, desc: 'Good progress' },
    { label: 'Payment History', value: financialHealth.factors.paymentHistory, variant: 'default' as BadgeVariant, desc: 'Very good' },
  ], []);

  const goals = useMemo(() => [
    { title: 'Emergency Fund', desc: '3 months expenses saved', progress: 75, icon: CheckCircle, color: 'from-[#0052D4] to-[#003d9e]' },
    { title: 'Debt Reduction', desc: 'Pay off credit cards', progress: 50, icon: Target, color: 'from-blue-600 to-blue-700' },
    { title: 'Investment Goals', desc: 'Build investment portfolio', progress: 25, icon: AlertCircle, color: 'from-amber-600 to-amber-600' },
  ], []);

  const chartDataKeys = useMemo(() => [
    { key: 'score', color: '#0052D4', name: 'Credit Score' },
  ], []);
  return (
    <MainLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Financial Health Analytics
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
            AI-powered wellness tracking and personalized financial guidance
          </p>
        </motion.div>

        {/* Main Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-blue-900/50 dark:border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-transparent">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 100 }}
                    className={`flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center rounded-full ${getScoreBgColor(financialHealth.score)}`}
                  >
                    <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-background">
                      <div>
                        <motion.p
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          className={`text-4xl sm:text-5xl font-bold ${getScoreColor(financialHealth.score)}`}
                        >
                          {financialHealth.score}
                        </motion.p>
                        <p className="text-xs sm:text-sm text-muted-foreground">/ 100</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2"
                  >
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 fill-emerald-500" />
                  </motion.div>
                </div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold"
                >
                  Your Financial Health is {financialHealth.category}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                  className="mt-3 sm:mt-4"
                >
                  {getCategoryBadge(financialHealth.category)}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground px-4"
                >
                  Your financial health score is calculated based on multiple factors including credit score,
                  debt-to-income ratio, savings rate, and payment history.
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Health Factors */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4"
        >
          {healthFactors.map((factor, index) => (
            <motion.div key={factor.label} variants={cardVariant}>
              <Card className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{factor.label}</p>
                      <Badge variant={factor.variant} className="text-xs flex-shrink-0">{factor.value}%</Badge>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.value}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 1, ease: 'easeOut' }}
                        className={`h-2 rounded-full ${
                          index === 0 ? 'bg-gradient-to-r from-[#0052D4] to-[#0041a8]' :
                          index === 1 ? 'bg-blue-600' :
                          index === 2 ? 'bg-purple-600' :
                          'bg-amber-600'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{factor.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts and Recommendations */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Credit Score Trend */}
          <LineChartCard
            title="Credit Score Trend"
            description="6-month credit score history"
            data={creditScoreHistory}
            dataKeys={chartDataKeys}
          />

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-500" />
                  Personalized Recommendations
                </CardTitle>
                <CardDescription className="text-sm">Action items to improve your financial health</CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  {financialHealth.recommendations.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="flex items-start gap-2 sm:gap-3 rounded-lg border border-border bg-muted/30 p-3 sm:p-4 cursor-pointer transition-all"
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm">{recommendation}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button className="mt-6 w-full" variant="default">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Detailed Action Plan
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Financial Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Financial Goals & Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg border border-border bg-muted/30 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${goal.color}`}>
                        <goal.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{goal.title}</p>
                        <p className="text-xs text-muted-foreground">{goal.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 1, ease: 'easeOut' }}
                        className={`h-2 rounded-full bg-gradient-to-r ${goal.color}`}
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{goal.progress}% complete</p>
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
