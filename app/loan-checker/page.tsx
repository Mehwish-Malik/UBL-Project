'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calculator, CheckCircle, XCircle, TrendingUp, DollarSign } from 'lucide-react';
import { loanEligibility } from '@/data/mock-data';
import { useState } from 'react';

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
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Loan Eligibility Intelligence</h1>
          <p className="mt-2 text-slate-400">AI-powered loan analysis for personal and business financing</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Loan Calculator Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Eligibility</CardTitle>
                <CardDescription>Enter your financial details to check loan eligibility</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-100">
                        Monthly Income (PKR)
                      </label>
                      <Input
                        type="number"
                        placeholder="150000"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-100">
                        Existing Loans (PKR)
                      </label>
                      <Input
                        type="number"
                        placeholder="50000"
                        value={formData.existingLoans}
                        onChange={(e) => handleInputChange('existingLoans', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-100">
                        Desired Loan Amount (PKR)
                      </label>
                      <Input
                        type="number"
                        placeholder="1000000"
                        value={formData.loanAmount}
                        onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-100">
                        Loan Tenure (Months)
                      </label>
                      <Input
                        type="number"
                        placeholder="36"
                        value={formData.loanTenure}
                        onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Calculator className="h-5 w-5 mr-2" />
                    Check Eligibility
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            {showResults && (
              <Card className={loanEligibility.eligible ? 'border-emerald-900/50 bg-emerald-950/20' : 'border-red-900/50 bg-red-950/20'}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Eligibility Results</CardTitle>
                    {loanEligibility.eligible ? (
                      <Badge variant="success" className="gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Eligible
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1">
                        <XCircle className="h-4 w-4" />
                        Not Eligible
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {loanEligibility.eligible ? (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-slate-900/50 p-4">
                          <p className="text-sm text-slate-400">Maximum Loan Amount</p>
                          <p className="mt-1 text-2xl font-bold text-emerald-500">
                            PKR {loanEligibility.maxAmount.toLocaleString()}
                          </p>
                        </div>
                        <div className="rounded-lg bg-slate-900/50 p-4">
                          <p className="text-sm text-slate-400">Interest Rate</p>
                          <p className="mt-1 text-2xl font-bold text-slate-100">
                            {loanEligibility.interestRate}% p.a.
                          </p>
                        </div>
                        <div className="rounded-lg bg-slate-900/50 p-4">
                          <p className="text-sm text-slate-400">Maximum Tenure</p>
                          <p className="mt-1 text-2xl font-bold text-slate-100">
                            {loanEligibility.tenure} months
                          </p>
                        </div>
                        <div className="rounded-lg bg-slate-900/50 p-4">
                          <p className="text-sm text-slate-400">Credit Score</p>
                          <p className="mt-1 text-2xl font-bold text-slate-100">
                            {loanEligibility.creditScore}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-lg border border-emerald-900/50 bg-emerald-950/20 p-4">
                        <h4 className="font-semibold text-emerald-500 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Congratulations!
                        </h4>
                        <p className="mt-2 text-sm text-slate-300">
                          Based on your financial profile, you are eligible for a loan. Our team will contact you within 24 hours to proceed with your application.
                        </p>
                        <Button className="mt-4 w-full">
                          Apply for Loan
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-4">
                      <h4 className="font-semibold text-red-500 flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        Not Eligible
                      </h4>
                      <p className="mt-2 text-sm text-slate-300">
                        Based on current criteria, you don't meet the eligibility requirements. Consider improving your credit score or reducing existing debts.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Loan Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-3">
                  <h4 className="font-semibold text-slate-100">Personal Loan</h4>
                  <p className="mt-1 text-sm text-slate-400">Up to PKR 3,000,000</p>
                  <p className="mt-1 text-xs text-emerald-500">From 9.5% p.a.</p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-3">
                  <h4 className="font-semibold text-slate-100">Business Loan</h4>
                  <p className="mt-1 text-sm text-slate-400">Up to PKR 10,000,000</p>
                  <p className="mt-1 text-xs text-emerald-500">From 11% p.a.</p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-3">
                  <h4 className="font-semibold text-slate-100">Car Loan</h4>
                  <p className="mt-1 text-sm text-slate-400">Up to PKR 5,000,000</p>
                  <p className="mt-1 text-xs text-emerald-500">From 12% p.a.</p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-3">
                  <h4 className="font-semibold text-slate-100">Home Loan</h4>
                  <p className="mt-1 text-sm text-slate-400">Up to PKR 20,000,000</p>
                  <p className="mt-1 text-xs text-emerald-500">From 10.5% p.a.</p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-emerald-900/50 bg-emerald-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  Loan Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Quick approval within 24-48 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Competitive interest rates
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Flexible repayment options
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    No hidden charges
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Digital application process
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
