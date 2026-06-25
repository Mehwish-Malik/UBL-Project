'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Send } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

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
        <div>
          <h1 className="text-3xl font-bold text-slate-100">AI Voice Banking</h1>
          <p className="mt-2 text-slate-400">Speak naturally with Nexus AI - Your intelligent banking companion</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="flex flex-col h-[600px]">
              <CardHeader className="border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <CardTitle>Chat Assistant</CardTitle>
                  <Badge variant="success" className="gap-1">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
                    Online
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-[#0052D4] to-[#0041a8] text-white shadow-lg shadow-blue-900/20'
                          : 'bg-slate-800 text-slate-100'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`mt-2 text-xs ${
                          message.type === 'user' ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input Area */}
              <div className="border-t border-slate-800 p-4">
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
          </div>

          {/* Quick Actions & Features */}
          <div className="space-y-6">
            {/* Voice Control */}
            <Card>
              <CardHeader>
                <CardTitle>Voice Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full h-32"
                  variant={isListening ? 'destructive' : 'default'}
                  onClick={() => setIsListening(!isListening)}
                >
                  <div className="flex flex-col items-center gap-2">
                    {isListening ? (
                      <>
                        <div className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                          <MicOff className="h-8 w-8" />
                        </div>
                        <span>Stop Listening</span>
                      </>
                    ) : (
                      <>
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#0052D4] to-[#003d9e] flex items-center justify-center shadow-lg shadow-blue-900/30">
                          <Mic className="h-8 w-8" />
                        </div>
                        <span>Start Voice Command</span>
                      </>
                    )}
                  </div>
                </Button>

                {isListening && (
                  <div className="rounded-lg bg-red-600/20 border border-red-600/50 p-3">
                    <p className="text-sm text-red-500 font-medium flex items-center gap-2">
                      <Volume2 className="h-4 w-4 animate-pulse" />
                      Listening...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Button key={action} variant="outline" size="sm" className="text-xs">
                      {action}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-100">Natural Language</p>
                    <p className="text-xs text-slate-500">Speak naturally in English or Urdu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-100">Secure</p>
                    <p className="text-xs text-slate-500">Voice biometric authentication</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-100">24/7 Available</p>
                    <p className="text-xs text-slate-500">Always ready to help</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
