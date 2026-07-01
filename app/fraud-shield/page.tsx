'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Loader2,
  MessageSquare,
  Mail,
  Phone,
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FraudAnalysisRequest, FraudAnalysisResult, ThreatLevel } from '@/types';

const MESSAGE_TYPES = [
  { value: 'sms' as const, label: 'SMS', icon: Phone },
  { value: 'whatsapp' as const, label: 'WhatsApp', icon: MessageSquare },
  { value: 'email' as const, label: 'Email', icon: Mail },
  { value: 'query' as const, label: 'General Query', icon: MessageSquare },
  { value: 'transfer' as const, label: 'Transfer Issue', icon: Send },
];

const DEMO_SCENARIOS = [
  {
    id: 'otp_request',
    title: 'OTP Request Scam',
    message: 'Dear customer, your account will be blocked. Please share your OTP to verify your account immediately.',
    type: 'sms' as const,
  },
  {
    id: 'prize_scam',
    title: 'Prize/Lottery Scam',
    message: 'Congratulations! You won PKR 500,000 in UBL Lucky Draw. Click here now to claim your prize: bit.ly/ubl-prize',
    type: 'whatsapp' as const,
  },
  {
    id: 'balance_inquiry',
    title: 'Safe Query',
    message: 'What is my current account balance?',
    type: 'query' as const,
  },
  {
    id: 'wrong_transfer',
    title: 'Wrong Transfer',
    message: 'I accidentally transferred PKR 50,000 to an unknown account. What should I do?',
    type: 'transfer' as const,
  },
];

const getThreatColor = (level: ThreatLevel) => {
  switch (level) {
    case 'CRITICAL':
      return 'text-red-600 dark:text-red-400';
    case 'HIGH RISK':
      return 'text-red-600 dark:text-red-500';
    case 'SUSPICIOUS':
      return 'text-amber-600 dark:text-amber-500';
    case 'SAFE':
      return 'text-emerald-600 dark:text-emerald-500';
  }
};

const getThreatBadgeVariant = (level: ThreatLevel) => {
  switch (level) {
    case 'CRITICAL':
      return 'destructive';
    case 'HIGH RISK':
      return 'destructive';
    case 'SUSPICIOUS':
      return 'warning';
    case 'SAFE':
      return 'success';
  }
};

const getThreatIcon = (level: ThreatLevel) => {
  switch (level) {
    case 'CRITICAL':
      return <AlertTriangle className="h-6 w-6" />;
    case 'HIGH RISK':
      return <AlertTriangle className="h-6 w-6" />;
    case 'SUSPICIOUS':
      return <Shield className="h-6 w-6" />;
    case 'SAFE':
      return <CheckCircle className="h-6 w-6" />;
  }
};

export default function FraudShieldPage() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<FraudAnalysisRequest['type']>('sms');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FraudAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (useMock = false, mockScenario?: string) => {
    if (!message.trim() && !useMock) {
      setError('Please enter a message to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/fraud-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          type: messageType,
          useMock,
          mockScenario,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze message');
      }

      const data: FraudAnalysisResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loadDemoScenario = (scenario: typeof DEMO_SCENARIOS[0]) => {
    setMessage(scenario.message);
    setMessageType(scenario.type);
    setResult(null);
    setError(null);
    // Auto-analyze demo scenarios
    setTimeout(() => {
      handleAnalyze(true, scenario.id);
    }, 100);
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 90) return 'from-red-700 to-red-800';
    if (score >= 70) return 'from-red-600 to-red-700';
    if (score >= 35) return 'from-amber-600 to-amber-700';
    return 'from-emerald-600 to-emerald-700';
  };

  return (
    <MainLayout>
      <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(16, 185, 129, 0.7)',
                  '0 0 0 10px rgba(16, 185, 129, 0)',
                  '0 0 0 0 rgba(16, 185, 129, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white"
            >
              <Shield className="h-6 w-6 sm:h-8 sm:w-8" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                Fraud Shield Agent
              </h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
                AI-powered fraud detection protecting you from scams, phishing, and social engineering attacks
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Main Analysis Panel */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Input Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">Analyze Message</CardTitle>
                  <CardDescription className="text-sm">
                    Paste any suspicious message, SMS, email, or query to check for fraud
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-4 sm:px-6">
                  {/* Message Type Selector */}
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-2 block">Message Type</label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {MESSAGE_TYPES.map((type) => (
                        <Button
                          key={type.value}
                          variant={messageType === type.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setMessageType(type.value)}
                          className="gap-2"
                        >
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-2 block">Message Content</label>
                    <Textarea
                      placeholder="Paste the message you want to analyze here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  {/* Error Display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-lg bg-red-950/20 border border-red-900/50 text-red-600 dark:text-red-500 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Action Button */}
                  <Button
                    onClick={() => handleAnalyze(false)}
                    disabled={loading || !message.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        Analyze for Fraud
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Card */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`border-2 ${
                    result.threatLevel === 'CRITICAL' ? 'border-red-900/70 bg-red-950/20' :
                    result.threatLevel === 'HIGH RISK' ? 'border-red-900/50 bg-red-950/10' :
                    result.threatLevel === 'SUSPICIOUS' ? 'border-amber-900/50 bg-amber-950/10' :
                    'border-emerald-900/50 bg-emerald-950/10'
                  }`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Analysis Results</CardTitle>
                        <Badge variant={getThreatBadgeVariant(result.threatLevel)}>
                          {result.threatLevel}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Risk Score */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Risk Score</span>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className={`text-3xl font-bold ${getThreatColor(result.threatLevel)}`}
                          >
                            {result.riskScore}/100
                          </motion.span>
                        </div>
                        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.riskScore}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full bg-gradient-to-r ${getRiskScoreColor(result.riskScore)} rounded-full`}
                          />
                        </div>
                      </div>

                      {/* Threat Level */}
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                        <div className={getThreatColor(result.threatLevel)}>
                          {getThreatIcon(result.threatLevel)}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{result.threatLevel}</p>
                          <p className="text-sm text-muted-foreground">Threat Assessment</p>
                        </div>
                      </div>

                      {/* AI Analysis */}
                      {result.analysis && (
                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            AI Analysis
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed p-4 bg-muted/30 rounded-lg">
                            {result.analysis}
                          </p>
                        </div>
                      )}

                      {/* Detected Threats */}
                      {result.detectedThreats.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            Detected Threats
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {result.detectedThreats.map((threat, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                              >
                                <Badge variant="destructive" className="text-xs">
                                  {threat}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reasons */}
                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Info className="h-4 w-4 text-blue-600" />
                          Detection Reasons
                        </h4>
                        <ul className="space-y-2">
                          {result.reasons.map((reason, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-muted-foreground mt-0.5">•</span>
                              <span>{reason}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommendations */}
                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Shield className="h-4 w-4 text-emerald-600" />
                          Recommended Actions
                        </h4>
                        <div className="space-y-2">
                          {result.recommendations.map((rec, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 text-sm"
                            >
                              <span className="flex-shrink-0">{rec.split(' ')[0]}</span>
                              <span>{rec.split(' ').slice(1).join(' ')}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Demo Scenarios */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Demo Scenarios</CardTitle>
                  <CardDescription>Try these examples to see how it works</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {DEMO_SCENARIOS.map((scenario, index) => (
                    <motion.div
                      key={scenario.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => loadDemoScenario(scenario)}
                        disabled={loading}
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{scenario.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {scenario.message}
                          </p>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-emerald-900/50 bg-emerald-950/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    Security Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    {[
                      'Banks NEVER ask for OTP, PIN, or passwords',
                      'Verify sender through official channels',
                      'Be cautious of urgent or threatening messages',
                      'Never click suspicious links',
                      'Contact UBL at 111-825-888 to verify',
                    ].map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-blue-900/50 bg-blue-950/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">UBL Helpline</p>
                    <p className="text-2xl font-bold text-blue-600">111-825-888</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Available 24/7 for fraud reporting and account security
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
