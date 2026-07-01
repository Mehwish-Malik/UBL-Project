'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVoice, VoiceState } from '@/hooks/useVoice';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader2,
  Trash2,
  User,
  Bot,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceAgentProps {
  className?: string;
}

export function VoiceAgent({ className }: VoiceAgentProps) {
  const {
    isSupported,
    state,
    transcript,
    messages,
    error,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    addMessage,
    clearChat,
    setProcessing,
    clearTranscript,
    isProcessingRef,
    lastProcessedTranscriptRef,
    processingLockRef,
  } = useVoice();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle transcript completion - SINGLE CYCLE ONLY
  useEffect(() => {
    // Only process if:
    // 1. We have a non-empty transcript
    // 2. State is idle (recognition has completely ended)
    // 3. Not currently processing (lock check)
    // 4. Haven't processed this exact transcript before
    if (
      transcript &&
      transcript.trim() &&
      state === 'idle' &&
      !processingLockRef.current &&
      lastProcessedTranscriptRef.current !== transcript
    ) {
      // Acquire lock IMMEDIATELY to prevent duplicate processing
      processingLockRef.current = true;

      // Mark this transcript as processed
      lastProcessedTranscriptRef.current = transcript;

      // Process the transcript
      handleTranscriptComplete(transcript);

      // Clear the transcript from state to prevent future re-triggers
      clearTranscript();
    }
  }, [transcript, state, processingLockRef, lastProcessedTranscriptRef, clearTranscript]);

  const handleTranscriptComplete = async (text: string) => {
    if (!text.trim()) {
      processingLockRef.current = false;
      return;
    }

    try {
      // Add user message
      addMessage('user', text);

      // Set processing state
      setProcessing();

      // Call API
      const response = await fetch('/api/voice-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add assistant message
      addMessage('assistant', data.response);

      // CRITICAL FIX: Reset isProcessingRef BEFORE speaking
      // This allows the next voice input to work after speaking completes
      isProcessingRef.current = false;

      // Speak the response - this will change state to 'speaking'
      speak(data.response);
    } catch (err) {
      console.error('Error processing query:', err);
      const errorMessage = 'I apologize, I encountered an error. Please try again.';
      addMessage('assistant', errorMessage);

      // CRITICAL FIX: Reset isProcessingRef even on error
      isProcessingRef.current = false;

      speak(errorMessage);
    } finally {
      // Release processing lock
      processingLockRef.current = false;
    }
  };

  const handleMicClick = () => {
    if (state === 'listening') {
      stopListening();
    } else if (state === 'speaking') {
      stopSpeaking();
    } else if (state === 'idle') {
      startListening();
    }
  };

  const handleClearChat = () => {
    clearChat();
  };

  const getStateLabel = (state: VoiceState): string => {
    switch (state) {
      case 'listening':
        return 'Listening...';
      case 'processing':
        return 'Processing...';
      case 'speaking':
        return 'Speaking...';
      default:
        return 'Tap to speak';
    }
  };

  const getStateColor = (state: VoiceState): string => {
    switch (state) {
      case 'listening':
        return 'text-blue-600 dark:text-blue-400';
      case 'processing':
        return 'text-amber-600 dark:text-amber-400';
      case 'speaking':
        return 'text-emerald-600 dark:text-emerald-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getMicIcon = () => {
    if (state === 'listening') return <Mic className="h-8 w-8" />;
    if (state === 'speaking') return <Volume2 className="h-8 w-8" />;
    if (state === 'processing') return <Loader2 className="h-8 w-8 animate-spin" />;
    return <MicOff className="h-8 w-8" />;
  };

  if (!isSupported) {
    return (
      <Card className="border-red-900/50 bg-red-950/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-600 mb-2">Voice Assistant Not Supported</h3>
              <p className="text-sm text-muted-foreground">
                Your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari for the best experience.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Chat Container */}
      <Card className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                boxShadow: state === 'listening' || state === 'speaking'
                  ? [
                      '0 0 0 0 rgba(59, 130, 246, 0.7)',
                      '0 0 0 10px rgba(59, 130, 246, 0)',
                      '0 0 0 0 rgba(59, 130, 246, 0)',
                    ]
                  : '0 0 0 0 rgba(59, 130, 246, 0)',
              }}
              transition={{ duration: 2, repeat: state === 'listening' || state === 'speaking' ? Infinity : 0 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700"
            >
              <Bot className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold">UBL Voice Assistant</h3>
              <p className={cn('text-sm', getStateColor(state))}>
                {getStateLabel(state)}
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center max-w-md">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 mx-auto mb-4"
                >
                  <Mic className="h-10 w-10 text-white" />
                </motion.div>
                <h4 className="text-lg font-semibold mb-2">Welcome to UBL Voice Banking</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Tap the microphone button to start. I can help you with:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Account Balance', 'Loan Eligibility', 'Financial Score', 'Fraud Detection'].map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-3',
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p
                      className={cn(
                        'text-xs mt-1',
                        message.role === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Transcript Preview - only show during listening */}
          {transcript && state === 'listening' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-blue-600/20 border border-blue-600/50">
                <p className="text-sm text-blue-600 dark:text-blue-400 italic">
                  {transcript}
                </p>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-t border-border p-3 bg-red-950/20"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Microphone Button */}
        <div className="border-t border-border p-6">
          <div className="flex flex-col items-center gap-4">
            <motion.button
              onClick={handleMicClick}
              disabled={state === 'processing'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow:
                  state === 'listening'
                    ? [
                        '0 0 0 0 rgba(59, 130, 246, 0.7)',
                        '0 0 0 20px rgba(59, 130, 246, 0)',
                        '0 0 0 0 rgba(59, 130, 246, 0)',
                      ]
                    : state === 'speaking'
                    ? [
                        '0 0 0 0 rgba(16, 185, 129, 0.7)',
                        '0 0 0 20px rgba(16, 185, 129, 0)',
                        '0 0 0 0 rgba(16, 185, 129, 0)',
                      ]
                    : '0 0 0 0 rgba(59, 130, 246, 0)',
              }}
              transition={{
                duration: 2,
                repeat: state === 'listening' || state === 'speaking' ? Infinity : 0,
              }}
              className={cn(
                'flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300',
                state === 'listening' && 'bg-gradient-to-br from-blue-600 to-blue-700',
                state === 'speaking' && 'bg-gradient-to-br from-emerald-600 to-emerald-700',
                state === 'processing' && 'bg-gradient-to-br from-amber-600 to-amber-700',
                state === 'idle' && 'bg-gradient-to-br from-slate-600 to-slate-700 hover:from-blue-600 hover:to-blue-700',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label={
                state === 'listening'
                  ? 'Stop listening'
                  : state === 'speaking'
                  ? 'Stop speaking'
                  : state === 'processing'
                  ? 'Processing your request'
                  : 'Start voice assistant'
              }
              aria-live="polite"
              aria-atomic="true"
            >
              {getMicIcon()}
            </motion.button>
            <div className="text-center">
              <p className={cn('text-sm font-medium', getStateColor(state))}>
                {getStateLabel(state)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {state === 'listening'
                  ? 'Speak your banking query'
                  : state === 'processing'
                  ? 'Analyzing your request'
                  : state === 'speaking'
                  ? 'Tap to stop speaking'
                  : 'Tap the microphone to start'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
