'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Send } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: 'Hello! I\'m your UBL Nexus AI assistant. How can I help you today?',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    type: 'user',
    content: 'What\'s my account balance?',
    timestamp: '10:31 AM',
  },
  {
    id: '3',
    type: 'assistant',
    content: 'Your current account balance is PKR 1,250,000. Would you like to see a breakdown of recent transactions?',
    timestamp: '10:31 AM',
  },
];

const quickActions = [
  'Check Balance',
  'Recent Transactions',
  'Pay Bills',
  'Transfer Money',
  'Loan Inquiry',
  'Report Fraud',
];

export default function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I understand your request. Let me help you with that.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

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
            AI Voice Banking
          </h1>
          <p className="mt-2 text-muted-foreground">
            Speak naturally with Nexus AI - Your intelligent banking companion
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="flex flex-col h-[600px]">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle>Chat Assistant</CardTitle>
                  <Badge variant="success" className="gap-1">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-white"
                    />
                    Online
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-[#0052D4] to-[#0041a8] text-white shadow-lg glow-primary'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`mt-2 text-xs ${
                            message.type === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>

              {/* Input Area */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant={isListening ? 'destructive' : 'outline'}
                    onClick={() => setIsListening(!isListening)}
                  >
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  <Input
                    placeholder="Type your message or use voice..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions & Features */}
          <div className="space-y-6">
            {/* Voice Control */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Voice Control</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full h-32 relative overflow-hidden"
                    variant={isListening ? 'destructive' : 'default'}
                    onClick={() => setIsListening(!isListening)}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {isListening ? (
                        <>
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                '0 0 0 0 rgba(239, 68, 68, 0.7)',
                                '0 0 0 20px rgba(239, 68, 68, 0)',
                                '0 0 0 0 rgba(239, 68, 68, 0)',
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center"
                          >
                            <MicOff className="h-8 w-8" />
                          </motion.div>
                          <span>Stop Listening</span>
                        </>
                      ) : (
                        <>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="h-16 w-16 rounded-full bg-gradient-to-br from-[#0052D4] to-[#003d9e] flex items-center justify-center shadow-lg relative"
                          >
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              animate={{
                                boxShadow: [
                                  '0 0 20px rgba(0, 82, 212, 0.3)',
                                  '0 0 40px rgba(0, 82, 212, 0.5)',
                                  '0 0 20px rgba(0, 82, 212, 0.3)',
                                ],
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                            <Mic className="h-8 w-8 relative z-10" />
                          </motion.div>
                          <span>Start Voice Command</span>
                        </>
                      )}
                    </div>
                  </Button>

                  <AnimatePresence>
                    {isListening && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        className="rounded-lg bg-red-600/20 dark:bg-red-600/20 border border-red-600/50 p-3"
                      >
                        <p className="text-sm text-red-600 dark:text-red-500 font-medium flex items-center gap-2">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Volume2 className="h-4 w-4" />
                          </motion.div>
                          Listening...
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <motion.div
                        key={action}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                      >
                        <Button variant="outline" size="sm" className="text-xs w-full">
                          {action}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>AI Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: 'Natural Language', desc: 'Speak naturally in English or Urdu' },
                    { title: 'Secure', desc: 'Voice biometric authentication' },
                    { title: '24/7 Available', desc: 'Always ready to help' },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="h-2 w-2 rounded-full bg-emerald-500 mt-2"
                      />
                      <div>
                        <p className="text-sm font-medium">{feature.title}</p>
                        <p className="text-xs text-muted-foreground">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
