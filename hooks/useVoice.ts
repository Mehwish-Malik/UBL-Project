import { useState, useEffect, useCallback, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UseVoiceOptions {
  onTranscript?: (text: string) => void;
  onError?: (error: string) => void;
  onStateChange?: (state: VoiceState) => void;
}

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

export function useVoice(options: UseVoiceOptions = {}) {
  const [isSupported, setIsSupported] = useState(false);
  const [state, setState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isListeningRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isProcessingRef = useRef(false);
  const lastProcessedTranscriptRef = useRef<string>('');
  const processingLockRef = useRef(false);

  // Check browser support - only once on mount
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;

    if (SpeechRecognition && speechSynthesis) {
      setIsSupported(true);

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      const errorMsg = 'Speech recognition is not supported in this browser';
      setError(errorMsg);
      options.onError?.(errorMsg);
    }

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []); // Only run once on mount

  // State change callback
  useEffect(() => {
    options.onStateChange?.(state);
  }, [state, options.onStateChange]);

  // Setup recognition event handlers - only once
  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    const handleStart = () => {
      isListeningRef.current = true;
      setState('listening');
      setError(null);
    };

    const handleResult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;

      // Update transcript during listening
      setTranscript(transcriptText);

      // When final result is received, trigger callback
      if (event.results[current].isFinal) {
        options.onTranscript?.(transcriptText);
      }
    };

    const handleError = (event: any) => {
      console.error('Speech recognition error:', event.error);

      let errorMessage = 'Speech recognition error';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'No microphone found. Please check your microphone.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied. Please allow microphone access.';
          break;
        case 'network':
          errorMessage = 'Network error. Please check your connection.';
          break;
        case 'aborted':
          // Silent - user intentionally stopped
          isListeningRef.current = false;
          setState('idle');
          return;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }

      setError(errorMessage);
      options.onError?.(errorMessage);

      isListeningRef.current = false;
      setState('idle');
    };

    const handleEnd = () => {
      isListeningRef.current = false;

      // Only transition to idle if not processing or speaking
      if (!isProcessingRef.current && !isSpeakingRef.current) {
        setState('idle');
      }
    };

    // Attach event handlers
    recognition.onstart = handleStart;
    recognition.onresult = handleResult;
    recognition.onerror = handleError;
    recognition.onend = handleEnd;

    // Cleanup function
    return () => {
      if (recognition) {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
      }
    };
  }, []); // Empty deps - set up once

  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    if (isListeningRef.current || isProcessingRef.current || isSpeakingRef.current) {
      return;
    }

    try {
      // Clear previous transcript and last processed
      setTranscript('');
      lastProcessedTranscriptRef.current = '';
      setError(null);

      recognitionRef.current.start();
    } catch (err: any) {
      // Handle "already started" error gracefully
      if (err.message && err.message.includes('already started')) {
        console.warn('Recognition already started, aborting and restarting...');
        try {
          recognitionRef.current.abort();
          setTimeout(() => {
            try {
              setTranscript('');
              lastProcessedTranscriptRef.current = '';
              recognitionRef.current?.start();
            } catch (e) {
              console.error('Failed to restart recognition:', e);
            }
          }, 100);
        } catch (e) {
          console.error('Error handling recognition restart:', e);
        }
      } else {
        console.error('Error starting recognition:', err);
        setError('Failed to start listening');
        options.onError?.('Failed to start listening');
      }
    }
  }, [options.onError]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListeningRef.current) return;

    try {
      recognitionRef.current.stop();
    } catch (err) {
      console.error('Error stopping recognition:', err);
    }
  }, []);

  // Speak text - with proper cleanup and locks
  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis || !text.trim()) {
      setError('Text-to-speech is not supported');
      return;
    }

    // Cancel any ongoing speech IMMEDIATELY
    if (isSpeakingRef.current || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
      utteranceRef.current = null;
    }

    // Wait for cancel to complete before starting new speech
    const startSpeech = () => {
      // Double-check nothing is speaking
      if (window.speechSynthesis.speaking) {
        setTimeout(startSpeech, 50);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        isSpeakingRef.current = true;
        setState('speaking');
      };

      utterance.onend = () => {
        isSpeakingRef.current = false;
        utteranceRef.current = null;

        // Only return to idle if not processing or listening
        if (!isProcessingRef.current && !isListeningRef.current) {
          setState('idle');
        }
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);

        isSpeakingRef.current = false;
        utteranceRef.current = null;

        // Only set error for non-cancelled errors
        if (event.error !== 'canceled' && event.error !== 'interrupted') {
          setError('Failed to speak response');
        }

        if (!isProcessingRef.current && !isListeningRef.current) {
          setState('idle');
        }
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    // Start after a brief delay to ensure cancel completes
    setTimeout(startSpeech, 100);
  }, []);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis && (isSpeakingRef.current || window.speechSynthesis.speaking)) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
      utteranceRef.current = null;

      if (!isProcessingRef.current && !isListeningRef.current) {
        setState('idle');
      }
    }
  }, []);

  // Add message to chat
  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const message: Message = {
      id: `${Date.now()}-${Math.random()}`,
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
    return message;
  }, []);

  // Clear chat
  const clearChat = useCallback(() => {
    setMessages([]);
    setTranscript('');
    setError(null);
    lastProcessedTranscriptRef.current = '';
    processingLockRef.current = false;

    // Stop any ongoing operations
    stopSpeaking();
    if (isListeningRef.current) {
      stopListening();
    }

    isProcessingRef.current = false;
    setState('idle');
  }, [stopListening, stopSpeaking]);

  // Set processing state
  const setProcessing = useCallback(() => {
    isProcessingRef.current = true;
    setState('processing');
  }, []);

  // Clear transcript (important for preventing re-triggers)
  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
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
    setState,
    isListeningRef,
    isSpeakingRef,
    isProcessingRef,
    lastProcessedTranscriptRef,
    processingLockRef,
  };
}
