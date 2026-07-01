'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calculator, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { loanEligibility } from '@/data/mock-data';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, cardVariant } from '@/lib/animations';

export default function LoanCheckerPage() {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    existingLoans: '',
    loanAmount: '',
    loanTenure: '',
  });

  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            Loan Eligibility Intelligence
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
            AI-powered loan analysis for personal and business financing
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Loan Calculator Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">Calculate Your Eligibility</CardTitle>
                  <CardDescription className="text-sm">Enter your financial details to check loan eligibility</CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                      >
                        <label className="text-xs sm:text-sm font-medium">
                          Monthly Income (PKR)
                        </label>
                        <Input
                          type="number"
                          placeholder="150000"
                          value={formData.monthlyIncome}
                          onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                      >
                        <label className="text-xs sm:text-sm font-medium">
                          Existing Loans (PKR)
                        </label>
                        <Input
                          type="number"
                          placeholder="50000"
                          value={formData.existingLoans}
                          onChange={(e) => handleInputChange('existingLoans', e.target.value)}
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                      >
                        <label className="text-xs sm:text-sm font-medium">
                          Desired Loan Amount (PKR)
                        </label>
                        <Input
                          type="number"
                          placeholder="1000000"
                          value={formData.loanAmount}
                          onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                      >
                        <label className="text-xs sm:text-sm font-medium">
                          Loan Tenure (Months)
                        </label>
                        <Input
                          type="number"
                          placeholder="36"
                          value={formData.loanTenure}
                          onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                          required
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button type="submit" className="w-full" size="lg">
                        <Calculator className="h-5 w-5 mr-2" />
                        Check Eligibility
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={loanEligibility.eligible ? 'border-emerald-900/50 dark:border-emerald-900/50 bg-emerald-950/20 dark:bg-emerald-950/20' : 'border-red-900/50 dark:border-red-900/50 bg-red-950/20 dark:bg-red-950/20'}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Eligibility Results</CardTitle>
                        {loanEligibility.eligible ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                          >
                            <Badge variant="success" className="gap-1">
                              <CheckCircle className="h-4 w-4" />
                              Eligible
                            </Badge>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                          >
                            <Badge variant="destructive" className="gap-1">
                              <XCircle className="h-4 w-4" />
                              Not Eligible
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {loanEligibility.eligible ? (
                        <>
                          <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="grid gap-4 sm:grid-cols-2"
                          >
                            {[
                              { label: 'Maximum Loan Amount', value: `PKR ${loanEligibility.maxAmount.toLocaleString()}`, color: 'text-emerald-600 dark:text-emerald-500' },
                              { label: 'Interest Rate', value: `${loanEligibility.interestRate}% p.a.`, color: 'text-foreground' },
                              { label: 'Maximum Tenure', value: `${loanEligibility.tenure} months`, color: 'text-foreground' },
                              { label: 'Credit Score', value: loanEligibility.creditScore.toString(), color: 'text-foreground' },
                            ].map((item, index) => (
                              <motion.div
                                key={item.label}
                                variants={cardVariant}
                                whileHover={{ scale: 1.02 }}
                                className="rounded-lg bg-card p-4 border border-border"
                              >
                                <p className="text-sm text-muted-foreground">{item.label}</p>
                                <motion.p
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                                  className={`mt-1 text-2xl font-bold ${item.color}`}
                                >
                                  {item.value}
                                </motion.p>
                              </motion.div>
                            ))}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="rounded-lg border border-emerald-900/50 dark:border-emerald-900/50 bg-emerald-950/20 dark:bg-emerald-950/20 p-4"
                          >
                            <h4 className="font-semibold text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
                              <CheckCircle className="h-5 w-5" />
                              Congratulations!
                            </h4>
                            <p className="mt-2 text-sm">
                              Based on your financial profile, you are eligible for a loan. Our team will contact you within 24 hours to proceed with your application.
                            </p>
                            <Button className="mt-4 w-full">
                              Apply for Loan
                            </Button>
                          </motion.div>
                        </>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="rounded-lg border border-red-900/50 dark:border-red-900/50 bg-red-950/20 dark:bg-red-950/20 p-4"
                        >
                          <h4 className="font-semibold text-red-600 dark:text-red-500 flex items-center gap-2">
                            <XCircle className="h-5 w-5" />
                            Not Eligible
                          </h4>
                          <p className="mt-2 text-sm">
                            Based on current criteria, you don&apos;t meet the eligibility requirements. Consider improving your credit score or reducing existing debts.
                          </p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Loan Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Loan Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: 'Personal Loan', amount: 'Up to PKR 3,000,000', rate: 'From 9.5% p.a.' },
                    { title: 'Business Loan', amount: 'Up to PKR 10,000,000', rate: 'From 11% p.a.' },
                    { title: 'Car Loan', amount: 'Up to PKR 5,000,000', rate: 'From 12% p.a.' },
                    { title: 'Home Loan', amount: 'Up to PKR 20,000,000', rate: 'From 10.5% p.a.' },
                  ].map((loan, index) => (
                    <motion.div
                      key={loan.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="rounded-lg border border-border bg-muted/30 p-3 cursor-pointer transition-all"
                    >
                      <h4 className="font-semibold">{loan.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{loan.amount}</p>
                      <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-500">{loan.rate}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-emerald-900/50 dark:border-emerald-900/50 bg-emerald-950/20 dark:bg-emerald-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                    Loan Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {[
                      'Quick approval within 24-48 hours',
                      'Competitive interest rates',
                      'Flexible repayment options',
                      'No hidden charges',
                      'Digital application process',
                    ].map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
