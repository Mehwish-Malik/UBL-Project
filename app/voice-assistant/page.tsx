'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceAgent } from '@/components/voice/VoiceAgent';
import { motion } from 'framer-motion';
import { Mic, Zap, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Natural Speech',
    description: 'Speak naturally - I understand your banking queries',
    color: 'from-blue-600 to-blue-700',
  },
  {
    icon: Zap,
    title: 'Instant Response',
    description: 'Get immediate answers to your banking questions',
    color: 'from-amber-600 to-amber-700',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your conversations are encrypted and protected',
    color: 'from-emerald-600 to-emerald-700',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Banking assistance whenever you need it',
    color: 'from-purple-600 to-purple-700',
  },
];

const sampleQueries = [
  'What is my account balance?',
  'Am I eligible for a loan?',
  'What is my financial health score?',
  'How do I report fraud?',
  'Show me recent transactions',
  'Help me with a transfer',
];

export default function VoiceAssistantPage() {
  return (
    <MainLayout>
      <div className="space-y-4 sm:space-y-6">
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
                  '0 0 0 0 rgba(59, 130, 246, 0.7)',
                  '0 0 0 10px rgba(59, 130, 246, 0)',
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white"
            >
              <Mic className="h-6 w-6 sm:h-8 sm:w-8" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                AI Voice Banking
              </h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
                Speak naturally with Nexus AI - Your intelligent voice banking assistant
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Voice Agent - Main Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <VoiceAgent className="h-[500px] sm:h-[600px] lg:h-[700px]" />
          </motion.div>

          {/* Sidebar - Features & Sample Queries */}
          <div className="space-y-4 sm:space-y-6">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-base sm:text-lg">Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} flex-shrink-0`}>
                        <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{feature.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Sample Queries */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-base sm:text-lg">Try Asking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 px-4 sm:px-6">
                  {sampleQueries.map((query, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="text-xs p-2.5 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer border border-border"
                    >
                      <p className="text-muted-foreground">"{query}"</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-blue-900/50 bg-blue-950/20">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Mic className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    Voice Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs sm:text-sm px-4 sm:px-6">
                  <p className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span className="text-muted-foreground">
                      Speak clearly and naturally
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span className="text-muted-foreground">
                      Allow microphone access when prompted
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span className="text-muted-foreground">
                      Works best in Chrome, Edge, or Safari
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span className="text-muted-foreground">
                      Tap mic button to stop listening
                    </span>
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
