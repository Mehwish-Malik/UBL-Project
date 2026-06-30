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

// Determine threat level based on risk score
function determineThreatLevel(score: number): ThreatLevel {
  if (score >= 71) return 'HIGH RISK';
  if (score >= 31) return 'SUSPICIOUS';
  return 'SAFE';
}

// Generate recommendations based on threat level and patterns
function generateRecommendations(threatLevel: ThreatLevel, detectedPatterns: string[]): string[] {
  const recommendations: string[] = [];

  if (threatLevel === 'HIGH RISK') {
    recommendations.push('🚫 Do NOT respond to this message');
    recommendations.push('🚫 Do NOT share any personal information, OTP, PIN, or passwords');
    recommendations.push('📞 Contact UBL official helpline: 111-825-888');
    recommendations.push('🗑️ Delete this message immediately');
    recommendations.push('🚨 Report this message to UBL Fraud Department');
    recommendations.push('🔒 Block the sender');
  } else if (threatLevel === 'SUSPICIOUS') {
    recommendations.push('⚠️ Proceed with extreme caution');
    recommendations.push('✅ Verify the sender through official UBL channels');
    recommendations.push('📞 Call UBL helpline to confirm: 111-825-888');
    recommendations.push('🔍 Check the message for spelling errors or suspicious links');
    recommendations.push('❌ Do not click any links without verification');
  } else {
    recommendations.push('✅ This appears to be a legitimate query');
    recommendations.push('💡 Always verify important requests through official channels');
    recommendations.push('🔒 Never share OTP, PIN, or passwords with anyone');
    recommendations.push('📱 Enable two-factor authentication for added security');
  }

  // Pattern-specific recommendations
  if (detectedPatterns.some(p => p.includes('OTP') || p.includes('PERSONAL INFO'))) {
    recommendations.push('⚠️ CRITICAL: Banks NEVER ask for OTPs, PINs, or passwords');
  }

  if (detectedPatterns.some(p => p.includes('SUSPICIOUS LINKS'))) {
    recommendations.push('🔗 Never click on suspicious links or download attachments');
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
        // Create AI prompt for detailed analysis
        const systemPrompt = `You are a banking fraud detection expert for UBL Bank in Pakistan. Analyze messages for fraud, phishing, scams, OTP fraud, and social engineering attacks.

Key fraud indicators:
- OTP/PIN/Password requests (Banks NEVER ask for these)
- Urgent threatening language
- Suspicious links or attachments
- Impersonation of bank officials
- Prize/lottery scams
- Account blocking threats
- Personal information requests
- Unusual money transfer requests

Respond with a detailed analysis focusing on:
1. Why this is or isn't a fraud attempt
2. Specific red flags detected
3. User safety considerations

Be concise but thorough. Use Pakistani banking context.`;

        const userPrompt = `Analyze this ${type} message for fraud:

Message: "${message}"

Detected patterns: ${detectedPatterns.length > 0 ? detectedPatterns.join(', ') : 'None'}
Initial risk score: ${patternScore}/100

Provide detailed fraud analysis.`;

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.3,
          max_tokens: 800,
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
