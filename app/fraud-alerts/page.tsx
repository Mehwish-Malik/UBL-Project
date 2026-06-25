'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, CheckCircle, Clock, Eye, XCircle } from 'lucide-react';
import { fraudAlerts } from '@/data/mock-data';
import { FraudAlert } from '@/types';
import { motion } from 'framer-motion';
import { staggerContainer, cardVariant } from '@/lib/animations';

const getAlertIcon = (type: FraudAlert['type']) => {
  switch (type) {
    case 'high':
      return <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />;
    case 'medium':
      return <Shield className="h-5 w-5 text-amber-600 dark:text-amber-500" />;
    case 'low':
      return <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Real-Time Fraud Protection
          </h1>
          <p className="mt-2 text-muted-foreground">
            AI-powered security monitoring protecting your financial world
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={cardVariant}>
            <Card className="border-red-900/50 dark:border-red-900/50 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-red-500/5"
                animate={{ opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">High Risk Alerts</p>
                    <motion.h3
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="mt-2 text-3xl font-bold text-red-600 dark:text-red-500"
                    >
                      {highRiskCount}
                    </motion.h3>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600"
                  >
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariant}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                    <motion.h3
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                      className="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-500"
                    >
                      {pendingCount}
                    </motion.h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-600">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariant}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Alerts</p>
                    <motion.h3
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                      className="mt-2 text-3xl font-bold"
                    >
                      {fraudAlerts.length}
                    </motion.h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariant}>
            <Card className="border-emerald-900/50 dark:border-emerald-900/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Protection Status</p>
                    <motion.h3
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                      className="mt-2 text-lg font-bold text-emerald-600 dark:text-emerald-500"
                    >
                      Active
                    </motion.h3>
                  </div>
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(16, 185, 129, 0.7)',
                        '0 0 0 10px rgba(16, 185, 129, 0)',
                        '0 0 0 0 rgba(16, 185, 129, 0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600"
                  >
                    <Shield className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Alert List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fraudAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="flex items-start gap-4 rounded-lg border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <motion.div
                      className="mt-1"
                      animate={alert.type === 'high' ? {
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {getAlertIcon(alert.type)}
                    </motion.div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">{alert.description}</p>
                          <p className="text-sm text-muted-foreground mt-1">
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
                          <span className="text-muted-foreground">Transaction Amount:</span>
                          <span className="font-semibold">
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
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-emerald-900/50 dark:border-emerald-900/50 bg-emerald-950/20 dark:bg-emerald-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                Security Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {[
                  'Never share your PIN, password, or OTP with anyone',
                  'Enable two-factor authentication for added security',
                  'Review your transactions regularly for suspicious activity',
                  'Contact UBL immediately if you notice unauthorized transactions',
                ].map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 mt-0.5 flex-shrink-0" />
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
