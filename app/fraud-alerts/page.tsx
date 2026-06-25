'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, CheckCircle, Clock, Eye, XCircle } from 'lucide-react';
import { fraudAlerts } from '@/data/mock-data';
import { FraudAlert } from '@/types';

const getAlertIcon = (type: FraudAlert['type']) => {
  switch (type) {
    case 'high':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case 'medium':
      return <Shield className="h-5 w-5 text-amber-500" />;
    case 'low':
      return <CheckCircle className="h-5 w-5 text-blue-500" />;
  }
};

const getAlertBadge = (type: FraudAlert['type']) => {
  switch (type) {
    case 'high':
      return <Badge variant="destructive">High Risk</Badge>;
    case 'medium':
      return <Badge variant="warning">Medium Risk</Badge>;
    case 'low':
      return <Badge variant="outline">Low Risk</Badge>;
  }
};

const getStatusBadge = (status: FraudAlert['status']) => {
  switch (status) {
    case 'pending':
      return <Badge variant="warning" className="gap-1">
        <Clock className="h-3 w-3" />
        Pending
      </Badge>;
    case 'investigating':
      return <Badge variant="default" className="gap-1">
        <Eye className="h-3 w-3" />
        Investigating
      </Badge>;
    case 'resolved':
      return <Badge variant="success" className="gap-1">
        <CheckCircle className="h-3 w-3" />
        Resolved
      </Badge>;
  }
};

export default function FraudAlertsPage() {
  const highRiskCount = fraudAlerts.filter(a => a.type === 'high').length;
  const pendingCount = fraudAlerts.filter(a => a.status === 'pending' || a.status === 'investigating').length;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Real-Time Fraud Protection</h1>
          <p className="mt-2 text-slate-400">AI-powered security monitoring protecting your financial world</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-red-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">High Risk Alerts</p>
                  <h3 className="mt-2 text-3xl font-bold text-red-500">{highRiskCount}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Pending Review</p>
                  <h3 className="mt-2 text-3xl font-bold text-amber-500">{pendingCount}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-600">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Alerts</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-100">{fraudAlerts.length}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-700">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Protection Status</p>
                  <h3 className="mt-2 text-lg font-bold text-emerald-500">Active</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fraudAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-4 rounded-lg border border-slate-800 bg-slate-900/30 p-4 hover:border-slate-700 transition-colors"
                >
                  <div className="mt-1">
                    {getAlertIcon(alert.type)}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-slate-100">{alert.description}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getAlertBadge(alert.type)}
                        {getStatusBadge(alert.status)}
                      </div>
                    </div>

                    {alert.amount && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-400">Transaction Amount:</span>
                        <span className="font-semibold text-slate-100">
                          PKR {alert.amount.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="default">
                        View Details
                      </Button>
                      {alert.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Safe
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-4 w-4 mr-1" />
                            Report Fraud
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card className="border-emerald-900/50 bg-emerald-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-500" />
              Security Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                Never share your PIN, password, or OTP with anyone
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                Enable two-factor authentication for added security
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                Review your transactions regularly for suspicious activity
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                Contact UBL immediately if you notice unauthorized transactions
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
