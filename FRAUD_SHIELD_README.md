# UBL Nexus AI - Fraud Shield Agent

## Overview

The **Fraud Shield Agent** is an AI-powered fraud detection system that helps banking users identify scams, phishing attempts, OTP fraud, suspicious transfers, fake banking messages, and social engineering attacks.

## Features

### 1. Multi-Channel Message Analysis
Analyze messages from multiple sources:
- SMS messages
- WhatsApp messages
- Email communications
- General banking queries
- Transfer issues

### 2. Intelligent Risk Scoring
- **Pattern-based detection** for instant analysis
- **AI-powered analysis** using OpenAI GPT-4
- Risk scores from 0-100
- Three threat levels:
  - **SAFE** (0-30): Low risk, legitimate queries
  - **SUSPICIOUS** (31-70): Requires caution and verification
  - **HIGH RISK** (71-100): Confirmed fraud patterns detected

### 3. Comprehensive Threat Detection
The system detects multiple fraud patterns:
- OTP/PIN/Password requests
- Urgent threatening language
- Suspicious links and phishing URLs
- Bank official impersonation
- Prize/lottery scams
- Account blocking threats
- Personal information requests
- Money transfer scams

### 4. Actionable Recommendations
Each analysis provides:
- Detailed threat assessment
- Specific reasons for the risk score
- Step-by-step recommendations
- UBL helpline contact information

## Setup

### 1. Install Dependencies

The required dependencies are already included in `package.json`:
- `openai` - For AI-powered fraud analysis
- `zod` - For request validation

### 2. Configure OpenAI API Key

Create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

**Note:** The system works without an API key using pattern-based detection, but AI-enhanced analysis requires a valid OpenAI API key.

### 3. Start Development Server

```bash
npm run dev
```

Navigate to: `http://localhost:3000/fraud-shield`

## Usage

### Interactive Analysis

1. **Select Message Type**
   - Choose from SMS, WhatsApp, Email, Query, or Transfer

2. **Paste Message Content**
   - Copy any suspicious message into the text area

3. **Click "Analyze for Fraud"**
   - Get instant results with risk assessment

4. **Review Results**
   - Risk Score (0-100)
   - Threat Level
   - AI Analysis
   - Detected Threats
   - Reasons
   - Actionable Recommendations

### Demo Scenarios

Four pre-configured scenarios are available:

1. **OTP Request Scam**
   - Classic phishing attempt
   - Expected: HIGH RISK (98/100)

2. **Prize/Lottery Scam**
   - Fake prize notification
   - Expected: HIGH RISK (85/100)

3. **Safe Query**
   - Legitimate balance inquiry
   - Expected: SAFE (15/100)

4. **Wrong Transfer**
   - Potential distress scenario
   - Expected: SUSPICIOUS (45/100)

## API Reference

### POST `/api/fraud-detect`

Analyze a message for fraud indicators.

**Request Body:**
```json
{
  "message": "string (required)",
  "type": "sms | whatsapp | email | query | transfer (required)",
  "useMock": "boolean (optional)",
  "mockScenario": "string (optional)"
}
```

**Response:**
```json
{
  "riskScore": 95,
  "threatLevel": "HIGH RISK | SUSPICIOUS | SAFE",
  "reasons": ["array of detection reasons"],
  "recommendations": ["array of recommended actions"],
  "analysis": "detailed AI analysis",
  "detectedThreats": ["array of detected threat patterns"],
  "timestamp": "ISO 8601 timestamp"
}
```

**Error Response:**
```json
{
  "error": "error message"
}
```

## Architecture

### Service Layer (`/lib/services/fraud-agent.ts`)

**Pattern Detection Engine:**
- 8 fraud pattern categories
- Keyword-based matching
- Severity scoring
- Accumulative risk calculation

**AI Analysis:**
- Lazy-loaded OpenAI client
- Fallback to pattern-based detection
- Context-aware prompts
- Pakistani banking context

**Risk Scoring:**
- Pattern matching: 0-100 points
- Multiple pattern detection
- Weighted scoring by severity
- Capped at 100

**Threat Level Determination:**
- 0-30: SAFE
- 31-70: SUSPICIOUS  
- 71-100: HIGH RISK

### API Layer (`/app/api/fraud-detect/route.ts`)

- Request validation
- Error handling
- Mock data support for demos
- RESTful design

### UI Layer (`/app/fraud-shield/page.tsx`)

- Interactive message analyzer
- Real-time risk visualization
- Animated results display
- Demo scenario loader
- Mobile-responsive design

## Security Tips

The system displays these important reminders:

✅ Banks NEVER ask for OTP, PIN, or passwords  
✅ Verify sender through official channels  
✅ Be cautious of urgent or threatening messages  
✅ Never click suspicious links  
✅ Contact UBL at 111-825-888 to verify  

## Mock Data

For demo purposes without OpenAI API:

The service includes pre-configured mock responses for all demo scenarios with realistic risk scores, threat levels, and recommendations.

## Technology Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **OpenAI API** - AI-powered analysis
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide Icons** - Icon library

## Production Deployment

### Environment Variables

Set these in your production environment:

```bash
OPENAI_API_KEY=your_production_key
OPENAI_MODEL=gpt-4o-mini
```

### Build

```bash
npm run build
npm start
```

### Performance

- Pattern-based detection: <100ms
- AI-enhanced analysis: 1-3 seconds
- Automatic fallback on API errors
- Cached responses for demos

## Future Enhancements

- Real-time transaction monitoring
- Historical fraud pattern learning
- Multi-language support (Urdu, English)
- SMS integration with carrier APIs
- Browser extension for email/web protection
- Machine learning model training on local fraud patterns
- Integration with UBL's fraud database

## Support

**UBL Helpline:** 111-825-888  
**Available:** 24/7 for fraud reporting and account security

## License

Part of UBL Nexus AI - Hackathon Project 2026
