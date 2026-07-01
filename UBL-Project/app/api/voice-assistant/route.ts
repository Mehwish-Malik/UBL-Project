import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Mock banking data
const MOCK_BANKING_DATA = {
  balance: 125000,
  financialScore: 82,
  accountNumber: '****4567',
  loanEligibility: {
    eligible: true,
    maxAmount: 2500000,
    interestRate: 9.5,
  },
  recentTransactions: [
    { date: '2026-06-24', description: 'Salary Credit', amount: 150000 },
    { date: '2026-06-23', description: 'Utility Bill', amount: -12000 },
  ],
};

// Lazy-loaded OpenAI client
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

// Generate AI response
async function generateAIResponse(query: string): Promise<string> {
  const client = getOpenAIClient();

  if (client) {
    try {
      const systemPrompt = `You are a professional AI banking assistant for UBL Bank in Pakistan. You are helpful, concise, and friendly.

Customer Banking Data:
- Account Balance: Rs. ${MOCK_BANKING_DATA.balance.toLocaleString()}
- Financial Health Score: ${MOCK_BANKING_DATA.financialScore}/100
- Account Number: ${MOCK_BANKING_DATA.accountNumber}
- Loan Eligible: Yes, up to Rs. ${MOCK_BANKING_DATA.loanEligibility.maxAmount.toLocaleString()} at ${MOCK_BANKING_DATA.loanEligibility.interestRate}% interest

Guidelines:
- Keep responses under 100 words for voice delivery
- Use Pakistani currency format (Rs. or PKR)
- Be conversational and natural
- Provide specific numbers from the customer data
- If asked about services not in the data, provide general UBL information
- For sensitive operations (transfers, password changes), tell them to use the app or visit a branch

Answer the customer's banking query naturally and professionally.`;

      const completion = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query },
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      return completion.choices[0].message.content || generateMockResponse(query);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return generateMockResponse(query);
    }
  }

  return generateMockResponse(query);
}

// Generate mock response based on query
function generateMockResponse(query: string): string {
  const lowerQuery = query.toLowerCase();

  // Balance inquiry
  if (lowerQuery.includes('balance') || lowerQuery.includes('account')) {
    return `Your current account balance is Rs. ${MOCK_BANKING_DATA.balance.toLocaleString()}. Your account number is ${MOCK_BANKING_DATA.accountNumber}. Is there anything else I can help you with?`;
  }

  // Loan inquiry
  if (lowerQuery.includes('loan') || lowerQuery.includes('eligible') || lowerQuery.includes('borrow')) {
    return `Good news! You're eligible for a loan of up to Rs. ${MOCK_BANKING_DATA.loanEligibility.maxAmount.toLocaleString()} at an interest rate of ${MOCK_BANKING_DATA.loanEligibility.interestRate}% per annum. Would you like me to help you apply?`;
  }

  // Financial health
  if (lowerQuery.includes('financial') || lowerQuery.includes('health') || lowerQuery.includes('score')) {
    return `Your financial health score is ${MOCK_BANKING_DATA.financialScore} out of 100, which is considered Good. This score is based on your credit history, debt-to-income ratio, and savings rate. Keep up the good work!`;
  }

  // Fraud detection
  if (lowerQuery.includes('fraud') || lowerQuery.includes('scam') || lowerQuery.includes('suspicious')) {
    return `UBL takes security seriously. If you've received a suspicious message or call, never share your OTP, PIN, or password. Banks never ask for these details. You can report fraud by calling our helpline at 111-825-888. Stay safe!`;
  }

  // Recent transactions
  if (lowerQuery.includes('transaction') || lowerQuery.includes('recent') || lowerQuery.includes('last')) {
    const lastTransaction = MOCK_BANKING_DATA.recentTransactions[0];
    return `Your most recent transaction was a ${lastTransaction.description} of Rs. ${Math.abs(lastTransaction.amount).toLocaleString()} on ${lastTransaction.date}. Would you like to see more transactions?`;
  }

  // Transfer/payment
  if (lowerQuery.includes('transfer') || lowerQuery.includes('send') || lowerQuery.includes('pay')) {
    return `For security reasons, money transfers should be done through the UBL mobile app or internet banking. I can guide you through the process if you'd like. What type of transfer do you need to make?`;
  }

  // Greeting
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return `Hello! I'm your UBL AI Banking Assistant. I can help you check your balance, loan eligibility, financial health score, and answer security questions. What would you like to know today?`;
  }

  // Thank you
  if (lowerQuery.includes('thank') || lowerQuery.includes('thanks')) {
    return `You're very welcome! Is there anything else I can help you with today?`;
  }

  // Help
  if (lowerQuery.includes('help') || lowerQuery.includes('what can you')) {
    return `I can help you with: checking your account balance, loan eligibility, financial health score, recent transactions, and fraud detection. I can also answer general banking questions. What would you like to know?`;
  }

  // Default response
  return `I'm here to help with your banking needs. You can ask me about your account balance, loan eligibility, financial health score, or any banking questions. What would you like to know?`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const response = await generateAIResponse(query);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Voice assistant API error:', error);
    return NextResponse.json(
      { error: 'Failed to process query. Please try again.' },
      { status: 500 }
    );
  }
}
