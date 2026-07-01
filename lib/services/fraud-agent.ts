import OpenAI from 'openai';
import { FraudAnalysisRequest, FraudAnalysisResult, ThreatLevel } from '@/types';

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

// Fraud detection patterns
const FRAUD_PATTERNS = {
  OTP_REQUEST: {
    keywords: ['otp', 'one time password', 'verification code', 'pin', 'cvv', 'security code'],
    severity: 'high' as const,
    score: 95,
  },
  URGENT_LANGUAGE: {
    keywords: ['urgent', 'immediately', 'expire', 'suspended', 'blocked', 'limited time', 'act now', 'verify now'],
    severity: 'high' as const,
    score: 85,
  },
  SUSPICIOUS_LINKS: {
    keywords: ['click here', 'verify account', 'confirm identity', 'update details', 'http://', 'bit.ly', 'tinyurl'],
    severity: 'high' as const,
    score: 80,
  },
  IMPERSONATION: {
    keywords: ['bank representative', 'customer service', 'security team', 'fraud department', 'ubl official'],
    severity: 'high' as const,
    score: 90,
  },
  PRIZE_LOTTERY: {
    keywords: ['won', 'prize', 'lottery', 'reward', 'congratulations', 'claim now', 'winner'],
    severity: 'medium' as const,
    score: 70,
  },
  ACCOUNT_THREAT: {
    keywords: ['account blocked', 'account suspended', 'unauthorized activity', 'security alert', 'account closed'],
    severity: 'high' as const,
    score: 85,
  },
  PERSONAL_INFO_REQUEST: {
    keywords: ['card number', 'account number', 'password', 'mother name', 'cnic', 'date of birth', 'personal details'],
    severity: 'high' as const,
    score: 95,
  },
  MONEY_REQUEST: {
    keywords: ['send money', 'transfer funds', 'payment required', 'processing fee', 'tax payment', 'deposit'],
    severity: 'high' as const,
    score: 75,
  },
};

// Calculate risk score based on patterns
function calculateRiskScore(message: string): { score: number; detectedPatterns: string[] } {
  const lowerMessage = message.toLowerCase();
  let totalScore = 0;
  const detectedPatterns: string[] = [];
  const matchedPatterns = new Set<string>();

  for (const [patternName, pattern] of Object.entries(FRAUD_PATTERNS)) {
    const matchCount = pattern.keywords.filter(keyword =>
      lowerMessage.includes(keyword.toLowerCase())
    ).length;

    if (matchCount > 0 && !matchedPatterns.has(patternName)) {
      matchedPatterns.add(patternName);
      detectedPatterns.push(patternName.replace(/_/g, ' '));
      totalScore += pattern.score * Math.min(matchCount / pattern.keywords.length, 1);
    }
  }

  // Cap at 100
  return {
    score: Math.min(Math.round(totalScore), 100),
    detectedPatterns
  };
}

// Determine threat level based on risk score with 4 distinct levels
function determineThreatLevel(score: number): ThreatLevel {
  if (score >= 90) return 'CRITICAL';
  if (score >= 70) return 'HIGH RISK';
  if (score >= 35) return 'SUSPICIOUS';
  return 'SAFE';
}

// Generate recommendations based on threat level and patterns
function generateRecommendations(threatLevel: ThreatLevel, detectedPatterns: string[]): string[] {
  const recommendations: string[] = [];

  if (threatLevel === 'CRITICAL') {
    recommendations.push('🚨 CRITICAL THREAT - Do NOT engage with this message under any circumstances');
    recommendations.push('🚫 IMMEDIATELY cease all communication with the sender');
    recommendations.push('🔒 Do NOT share any OTP, PIN, password, card details, or personal information');
    recommendations.push('📞 Contact UBL Fraud Hotline immediately: 111-825-888');
    recommendations.push('🗑️ Delete this message and block the sender permanently');
    recommendations.push('📋 Report this incident to UBL Fraud Department and file a complaint');
    recommendations.push('⚠️ Alert family members about this scam pattern');
  } else if (threatLevel === 'HIGH RISK') {
    recommendations.push('🚫 Do NOT respond to this message or follow any instructions');
    recommendations.push('🔐 Never share OTP, PIN, CVV, passwords, or account credentials');
    recommendations.push('📞 Verify sender authenticity by calling UBL official helpline: 111-825-888');
    recommendations.push('🗑️ Delete this message immediately to prevent accidental interaction');
    recommendations.push('🚨 Report this suspected fraud attempt to UBL Fraud Department');
    recommendations.push('🔒 Block the sender and mark as spam');
  } else if (threatLevel === 'SUSPICIOUS') {
    recommendations.push('⚠️ Exercise extreme caution - this message shows suspicious characteristics');
    recommendations.push('✅ Independently verify sender identity through official UBL channels only');
    recommendations.push('📞 Call UBL helpline directly at 111-825-888 - do not use contact info from the message');
    recommendations.push('🔍 Carefully examine the message for spelling errors, unusual requests, or suspicious links');
    recommendations.push('❌ Do not click any links or download attachments without verification');
    recommendations.push('⏰ Take your time - legitimate banks never pressure for immediate action');
  } else {
    recommendations.push('✅ This message appears to be a legitimate banking inquiry');
    recommendations.push('🔒 For your security, always use official UBL channels (app, website, helpline)');
    recommendations.push('💡 Remember: Banks NEVER ask for OTP, PIN, CVV, or full card details');
    recommendations.push('📱 Enable transaction alerts and two-factor authentication');
    recommendations.push('🛡️ Stay vigilant - verify any unusual requests through official channels');
  }

  // Pattern-specific critical warnings
  if (detectedPatterns.some(p => p.includes('OTP') || p.includes('PERSONAL INFO'))) {
    recommendations.push('⛔ CRITICAL WARNING: UBL will NEVER ask for OTP, PIN, password, or CVV through SMS, email, WhatsApp, or phone calls');
  }

  if (detectedPatterns.some(p => p.includes('SUSPICIOUS LINKS'))) {
    recommendations.push('🔗 SECURITY ALERT: Do not click links in unsolicited messages - they may install malware or steal credentials');
  }

  if (detectedPatterns.some(p => p.includes('MONEY REQUEST') || p.includes('ACCOUNT THREAT'))) {
    recommendations.push('💰 FRAUD INDICATOR: Legitimate banks do not threaten account closure or request processing fees via messages');
  }

  return recommendations;
}

// Main fraud detection function using OpenAI
export async function analyzeFraudMessage(request: FraudAnalysisRequest): Promise<FraudAnalysisResult> {
  try {
    const { message, type } = request;

    // Calculate initial risk score using pattern matching
    const { score: patternScore, detectedPatterns } = calculateRiskScore(message);

    let aiAnalysis = 'Pattern-based analysis';

    // Try to use OpenAI if available
    const openai = getOpenAIClient();
    if (openai) {
      try {
        // Create comprehensive AI prompt for detailed fraud analysis
        const systemPrompt = `You are an elite fraud detection AI analyst for United Bank Limited (UBL), Pakistan's premier financial institution. Your expertise covers banking fraud, phishing, social engineering, OTP fraud, impersonation scams, and financial cyber threats.

CRITICAL FRAUD INDICATORS TO ANALYZE:

1. CREDENTIAL THEFT ATTEMPTS
   - Requests for OTP, PIN, CVV, passwords, or security codes
   - Remember: BANKS NEVER REQUEST THESE THROUGH ANY CHANNEL

2. IMPERSONATION & SOCIAL ENGINEERING
   - Claims to be bank officials, fraud departments, or customer service
   - Use of official-sounding but unverifiable titles
   - Pressure tactics and false authority

3. URGENCY & THREAT TACTICS
   - Account suspension/blocking threats
   - "Immediate action required" language
   - Artificial time constraints
   - Penalty or loss warnings

4. SUSPICIOUS TECHNICAL ELEMENTS
   - Shortened URLs (bit.ly, tinyurl, etc.)
   - Misspelled domain names or lookalike URLs
   - Links requesting to "verify", "confirm", or "update" account
   - Generic greetings instead of personalized communication

5. FINANCIAL SCAMS
   - Prize/lottery winnings you didn't enter
   - Processing fees or tax payments required
   - Money mule recruitment
   - Investment schemes with guaranteed returns

6. DATA HARVESTING
   - Requests for CNIC, date of birth, mother's name
   - Account or card number requests
   - Personal or family information queries

ANALYSIS REQUIREMENTS:
- Provide a professional, comprehensive threat assessment
- Identify specific fraud techniques employed
- Explain the attacker's likely objective and methodology
- Reference Pakistani banking regulations and customer protection guidelines where relevant
- Use clear, authoritative language appropriate for financial security communications

RESPONSE FORMAT:
1. Threat Assessment: Overall risk evaluation
2. Red Flags Identified: Specific suspicious elements
3. Attack Vector Analysis: How the scam operates
4. Customer Impact: Potential consequences if the user complies
5. Verification Steps: How to confirm legitimacy through official channels

Maintain professional tone. Focus on actionable intelligence. Be definitive when indicators are clear.`;

        const userPrompt = `FRAUD ANALYSIS REQUEST

Message Type: ${type.toUpperCase()}
Communication Channel: ${type === 'sms' ? 'SMS Text Message' : type === 'whatsapp' ? 'WhatsApp' : type === 'email' ? 'Email' : type === 'query' ? 'General Banking Query' : 'Transfer Request'}

MESSAGE CONTENT:
"${message}"

PATTERN DETECTION RESULTS:
${detectedPatterns.length > 0 ? `Detected Fraud Patterns: ${detectedPatterns.join(', ')}` : 'No automatic pattern matches'}
Computed Risk Score: ${patternScore}/100
Preliminary Threat Level: ${determineThreatLevel(patternScore)}

ANALYSIS REQUIRED:
Conduct a thorough fraud risk assessment of this message. Evaluate all fraud indicators, explain the threat mechanism if present, and provide professional security guidance. Consider the Pakistani banking context and UBL's customer protection protocols.`;

        // Call OpenAI API with enhanced configuration
        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.2, // Lower temperature for more consistent, factual analysis
          max_tokens: 1000,
          top_p: 0.9,
        });

        aiAnalysis = completion.choices[0].message.content || 'Unable to analyze message';
      } catch (aiError) {
        console.error('OpenAI API error:', aiError);
        aiAnalysis = 'AI analysis unavailable. Using pattern-based detection.';
      }
    } else {
      aiAnalysis = 'Using advanced pattern-based fraud detection. Configure OpenAI API key for enhanced AI analysis.';
    }

    // Extract reasons from AI analysis
    const reasons: string[] = [];

    if (detectedPatterns.length > 0) {
      detectedPatterns.forEach(pattern => {
        reasons.push(`${pattern} detected`);
      });
    }

    // Add context-specific reasons
    if (type === 'query' && patternScore < 30) {
      reasons.push('General banking inquiry');
      reasons.push('No suspicious patterns detected');
    }

    if (patternScore >= 70) {
      reasons.push('Multiple high-risk indicators present');
      reasons.push('Matches known fraud patterns');
    }

    // Determine final threat level
    const threatLevel = determineThreatLevel(patternScore);

    // Generate recommendations
    const recommendations = generateRecommendations(threatLevel, detectedPatterns);

    return {
      riskScore: patternScore,
      threatLevel,
      reasons: reasons.length > 0 ? reasons : ['Standard message patterns'],
      recommendations,
      analysis: aiAnalysis,
      detectedThreats: detectedPatterns,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Fraud analysis error:', error);

    // Fallback to pattern-based analysis if AI fails
    const { score, detectedPatterns } = calculateRiskScore(request.message);
    const threatLevel = determineThreatLevel(score);

    return {
      riskScore: score,
      threatLevel,
      reasons: detectedPatterns.length > 0
        ? detectedPatterns.map(p => `${p} detected`)
        : ['Pattern-based analysis only'],
      recommendations: generateRecommendations(threatLevel, detectedPatterns),
      analysis: 'AI analysis temporarily unavailable. Using pattern-based detection.',
      detectedThreats: detectedPatterns,
      timestamp: new Date().toISOString(),
    };
  }
}

// Mock responses for demo scenarios
export async function getMockFraudAnalysis(scenario: string): Promise<FraudAnalysisResult> {
  const mockScenarios: Record<string, FraudAnalysisResult> = {
    otp_request: {
      riskScore: 98,
      threatLevel: 'HIGH RISK',
      reasons: [
        'OTP request detected',
        'Impersonation attempt',
        'Urgent language detected',
      ],
      recommendations: [
        '🚫 Do NOT share your OTP',
        '🚫 Do NOT respond to this message',
        '📞 Contact UBL helpline: 111-825-888',
        '🔒 Block sender immediately',
        '⚠️ CRITICAL: Banks NEVER ask for OTPs, PINs, or passwords',
      ],
      analysis: 'This is a classic OTP phishing attempt. The sender is impersonating a bank representative to steal your one-time password. Banks never ask for OTPs through any channel.',
      detectedThreats: ['OTP REQUEST', 'IMPERSONATION', 'URGENT LANGUAGE'],
      timestamp: new Date().toISOString(),
    },
    prize_scam: {
      riskScore: 85,
      threatLevel: 'HIGH RISK',
      reasons: [
        'Prize/lottery scam detected',
        'Urgent action required',
        'Suspicious link present',
      ],
      recommendations: [
        '🚫 Do NOT click any links',
        '🗑️ Delete this message',
        '🚨 This is a known scam pattern',
        '💡 You cannot win a contest you didn\'t enter',
      ],
      analysis: 'This is a prize/lottery scam designed to steal personal information or money. Legitimate banks do not notify winners through unsolicited messages.',
      detectedThreats: ['PRIZE LOTTERY', 'SUSPICIOUS LINKS', 'URGENT LANGUAGE'],
      timestamp: new Date().toISOString(),
    },
    balance_inquiry: {
      riskScore: 15,
      threatLevel: 'SAFE',
      reasons: [
        'Standard banking query',
        'No suspicious patterns detected',
        'Legitimate account inquiry',
      ],
      recommendations: [
        '✅ This appears to be a legitimate query',
        '💡 Use official UBL app or call 111-825-888 for balance inquiry',
        '🔒 Never share OTP, PIN, or passwords with anyone',
      ],
      analysis: 'This is a standard balance inquiry with no fraud indicators. For secure balance checking, use the official UBL mobile app or call the helpline.',
      detectedThreats: [],
      timestamp: new Date().toISOString(),
    },
    wrong_transfer: {
      riskScore: 45,
      threatLevel: 'SUSPICIOUS',
      reasons: [
        'Money transfer mentioned',
        'Potential distress scenario',
        'Requires verification',
      ],
      recommendations: [
        '⚠️ Proceed with caution',
        '📞 Contact UBL helpline immediately: 111-825-888',
        '🔍 Report transaction details to bank',
        '⏱️ Act quickly - transfers can sometimes be reversed',
        '📝 Keep all transaction records',
      ],
      analysis: 'If you genuinely made a wrong transfer, contact UBL immediately. However, be cautious of scammers who claim you transferred money to them by mistake.',
      detectedThreats: ['MONEY REQUEST'],
      timestamp: new Date().toISOString(),
    },
  };

  return mockScenarios[scenario] || mockScenarios.balance_inquiry;
}
