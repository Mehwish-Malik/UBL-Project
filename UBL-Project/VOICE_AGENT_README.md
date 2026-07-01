# AI Voice Banking Agent - Complete Documentation

## Overview

The **AI Voice Banking Agent** is a sophisticated voice-enabled banking assistant that allows users to interact with UBL Nexus AI using natural speech. It features speech-to-text recognition, AI-powered responses, and text-to-speech output for a complete hands-free banking experience.

---

## Features

### 1. Speech-to-Text Recognition
- Real-time voice transcription
- Continuous speech recognition
- Live transcript preview
- Support for natural language queries

### 2. AI Banking Assistant
- Intelligent query understanding
- Context-aware responses
- Mock banking data integration
- Natural conversation flow

### 3. Text-to-Speech Output
- Automated voice responses
- Adjustable speech rate and pitch
- Natural-sounding voice synthesis
- Tap to stop speaking

### 4. Professional UI
- Animated microphone button
- Visual state indicators (idle, listening, processing, speaking)
- Real-time chat history
- Smooth animations and transitions
- Dark mode optimized

---

## Supported Banking Queries

The voice assistant can handle:

### Account Information
- "What is my account balance?"
- "Show me my account number"
- "What's my current balance?"

### Loan Inquiries
- "Am I eligible for a loan?"
- "How much can I borrow?"
- "What are the interest rates?"

### Financial Health
- "What is my financial health score?"
- "How's my financial health?"
- "Show me my credit score"

### Fraud Detection
- "How do I report fraud?"
- "I received a suspicious message"
- "What should I do about a scam call?"

### Transactions
- "Show me recent transactions"
- "What was my last transaction?"
- "I need to transfer money"

### General Help
- "Hello" / "Hi" - Get a welcome message
- "What can you do?" - See available features
- "Help" - Get assistance

---

## Mock Banking Data

The system uses realistic mock data for demonstrations:

```typescript
{
  balance: Rs. 125,000
  financialScore: 82/100
  accountNumber: ****4567
  loanEligibility: {
    eligible: true
    maxAmount: Rs. 2,500,000
    interestRate: 9.5%
  }
}
```

---

## Architecture

### Component Structure

```
Voice Banking Agent
│
├── hooks/
│   └── useVoice.ts              (Voice management hook)
│       ├── Speech Recognition
│       ├── Speech Synthesis
│       ├── State Management
│       └── Message Handling
│
├── components/voice/
│   └── VoiceAgent.tsx           (Main UI component)
│       ├── Chat Interface
│       ├── Microphone Button
│       ├── State Indicators
│       └── Error Handling
│
├── app/api/voice-assistant/
│   └── route.ts                 (API endpoint)
│       ├── OpenAI Integration
│       ├── Mock Responses
│       └── Query Processing
│
└── app/voice-assistant/
    └── page.tsx                 (Page layout)
        ├── VoiceAgent
        ├── Features Sidebar
        └── Sample Queries
```

---

## Voice Flow

```
User speaks
    ↓
Speech-to-Text (Web Speech API)
    ↓
Display transcript in chat
    ↓
Send to API endpoint
    ↓
AI processes query (OpenAI or Mock)
    ↓
Return response text
    ↓
Display in chat
    ↓
Text-to-Speech output (Speech Synthesis API)
    ↓
User hears response
```

---

## Browser Compatibility

### Fully Supported ✅
- **Chrome** 33+ (Desktop & Mobile)
- **Edge** 79+ (Chromium-based)
- **Safari** 14.1+ (macOS & iOS)
- **Opera** 27+

### Not Supported ❌
- **Firefox** (No Web Speech API support)
- **Internet Explorer**
- **Older browsers**

**Note:** The component automatically detects browser support and displays an error message if not supported.

---

## API Documentation

### Endpoint: POST `/api/voice-assistant`

**Request Body:**
```json
{
  "query": "What is my account balance?"
}
```

**Response:**
```json
{
  "response": "Your current account balance is Rs. 125,000. Your account number is ****4567. Is there anything else I can help you with?",
  "timestamp": "2026-06-25T12:34:56.789Z"
}
```

**Error Response:**
```json
{
  "error": "Failed to process query. Please try again."
}
```

### With OpenAI API

If `OPENAI_API_KEY` is configured, the system uses GPT-4o-mini for enhanced responses:

- Context-aware understanding
- Natural conversation flow
- Personalized responses
- Better query interpretation

### Without OpenAI API

The system uses pattern-based mock responses:

- Keyword matching
- Predefined responses
- Banking data integration
- Still fully functional

---

## Voice States

### 1. Idle (Default)
- **Visual:** Gray microphone icon
- **Action:** Tap to start listening
- **State:** Ready for input

### 2. Listening
- **Visual:** Blue pulsing microphone
- **Animation:** Expanding rings
- **Display:** Live transcript preview
- **Action:** Tap to stop

### 3. Processing
- **Visual:** Amber spinning loader
- **Status:** "Processing..."
- **Action:** AI analyzing query
- **Duration:** 1-3 seconds

### 4. Speaking
- **Visual:** Green volume icon with pulse
- **Status:** "Speaking..."
- **Action:** Playing audio response
- **Interaction:** Tap to stop

---

## Usage Guide

### Step 1: Grant Microphone Permission
1. Navigate to `/voice-assistant`
2. Click the microphone button
3. Allow microphone access when prompted
4. Permission is saved for future visits

### Step 2: Start Voice Interaction
1. Tap the large microphone button
2. Wait for "Listening..." indicator
3. Speak your banking query clearly
4. The system shows live transcript

### Step 3: Receive Response
1. Query is processed automatically
2. Response appears in chat
3. AI speaks the response aloud
4. Continue conversation naturally

### Step 4: Additional Features
- **Clear Chat:** Remove all messages
- **Stop Speaking:** Tap microphone while speaking
- **Manual Stop:** Stop listening mid-speech

---

## Code Examples

### Using the useVoice Hook

```typescript
import { useVoice } from '@/hooks/useVoice';

function MyComponent() {
  const {
    isSupported,
    state,
    transcript,
    messages,
    startListening,
    speak,
    addMessage,
  } = useVoice();

  // Check browser support
  if (!isSupported) {
    return <div>Voice not supported</div>;
  }

  // Start listening
  const handleClick = () => {
    if (state === 'idle') {
      startListening();
    }
  };

  return (
    <button onClick={handleClick}>
      {state === 'listening' ? 'Listening...' : 'Start'}
    </button>
  );
}
```

### Custom Voice Integration

```typescript
// Add custom error handling
const voice = useVoice({
  onError: (error) => console.error(error),
  onTranscript: (text) => console.log('Heard:', text),
  onStateChange: (state) => console.log('State:', state),
});

// Speak custom text
voice.speak('Hello, welcome to UBL Bank!');

// Add message programmatically
voice.addMessage('assistant', 'How can I help?');
```

---

## Error Handling

### Common Errors

**1. No Microphone Permission**
```
Error: "Microphone permission denied. Please allow microphone access."
Solution: Grant permission in browser settings
```

**2. No Speech Detected**
```
Error: "No speech detected. Please try again."
Solution: Speak louder or check microphone
```

**3. Network Error**
```
Error: "Network error. Please check your connection."
Solution: Verify internet connection
```

**4. Browser Not Supported**
```
Error: "Speech recognition is not supported in this browser"
Solution: Use Chrome, Edge, or Safari
```

---

## Demo Scenarios

### Scenario 1: Balance Inquiry
**User:** "What is my account balance?"

**Expected Response:**
- Risk-free natural query
- Instant balance display: Rs. 125,000
- Account number: ****4567
- Voice output matches text

### Scenario 2: Loan Eligibility
**User:** "Am I eligible for a loan?"

**Expected Response:**
- Eligibility confirmation
- Maximum amount: Rs. 2,500,000
- Interest rate: 9.5%
- Application guidance

### Scenario 3: Financial Health
**User:** "What's my financial health score?"

**Expected Response:**
- Score: 82/100
- Category: "Good"
- Brief explanation
- Encouragement

### Scenario 4: Fraud Detection
**User:** "How do I report fraud?"

**Expected Response:**
- Security best practices
- UBL helpline: 111-825-888
- Never share OTP/PIN warning
- Report instructions

---

## Performance

### Metrics

- **Speech Recognition Latency:** <200ms
- **API Response Time:** 1-3 seconds (with OpenAI)
- **API Response Time:** <500ms (mock mode)
- **Speech Synthesis Start:** <100ms
- **Total Interaction Time:** 2-5 seconds

### Optimization Tips

1. **Use Mock Mode for Demos** - No API key needed
2. **Clear Chat Regularly** - Prevents memory buildup
3. **Short Queries** - Better recognition accuracy
4. **Quiet Environment** - Reduces background noise

---

## Configuration

### Environment Variables

```bash
# Optional: For AI-enhanced responses
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

### Speech Settings (Adjustable in code)

```typescript
// Speech Recognition
recognition.lang = 'en-US';          // Language
recognition.continuous = false;      // Single utterance
recognition.interimResults = true;   // Live preview

// Speech Synthesis
utterance.rate = 0.9;    // Speed (0.1 - 10)
utterance.pitch = 1;     // Pitch (0 - 2)
utterance.volume = 1;    // Volume (0 - 1)
utterance.lang = 'en-US'; // Language
```

---

## Troubleshooting

### Issue: Microphone Not Working

**Check:**
1. Browser permissions granted
2. Microphone hardware connected
3. System audio settings
4. Other apps not using microphone

**Fix:** Restart browser, grant permissions

---

### Issue: Voice Not Heard

**Check:**
1. System volume level
2. Speaker/headphone connection
3. Browser not muted
4. Page audio permissions

**Fix:** Unmute, increase volume

---

### Issue: Inaccurate Transcription

**Causes:**
- Background noise
- Unclear speech
- Accent issues
- Poor microphone quality

**Solutions:**
- Speak clearly and slowly
- Use in quiet environment
- Position microphone correctly
- Consider external mic

---

### Issue: API Errors

**Causes:**
- No internet connection
- Server down
- Invalid API key
- Rate limits

**Solutions:**
- Check network connection
- Verify API key in .env.local
- Use mock mode as fallback
- Wait and retry

---

## Security & Privacy

### Data Handling
- Voice data processed in browser
- Transcripts sent to API only
- No audio files stored
- No persistent logging

### Privacy Considerations
- Microphone access required
- Conversations not recorded
- Data encrypted in transit
- OpenAI privacy policy applies (if used)

### Best Practices
- Only use on trusted devices
- Don't share sensitive info over voice
- Clear chat after use
- Review microphone permissions

---

## Future Enhancements

### Planned Features
- [ ] Multi-language support (Urdu, Arabic)
- [ ] Voice authentication/biometrics
- [ ] Custom wake word ("Hey UBL")
- [ ] Offline mode
- [ ] Conversation history
- [ ] Voice profiles
- [ ] Integration with real banking APIs
- [ ] Voice commands for transactions
- [ ] Smart suggestions
- [ ] Voice shortcuts

---

## Production Deployment

### Checklist

- [ ] Configure OpenAI API key
- [ ] Test in target browsers
- [ ] Enable HTTPS (required for microphone)
- [ ] Set up error monitoring
- [ ] Configure rate limiting
- [ ] Add analytics tracking
- [ ] Test microphone permissions flow
- [ ] Verify speech synthesis works
- [ ] Load testing for API
- [ ] Backup mock mode available

### HTTPS Requirement

⚠️ **Important:** Web Speech API requires HTTPS in production

```bash
# Local development (http://localhost) is allowed
npm run dev

# Production must use HTTPS
https://your-domain.com
```

---

## Support

**UBL Helpline:** 111-825-888  
**Available:** 24/7

For technical issues:
- Check browser console for errors
- Review permissions
- Test microphone in browser settings
- Try clearing browser cache

---

## Credits

Built with:
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Web Speech API** - Voice capabilities
- **OpenAI API** - AI responses (optional)
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling

---

*Voice Banking Agent - Part of UBL Nexus AI*  
*Version 1.0 - June 2026*
