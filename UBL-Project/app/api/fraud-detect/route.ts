import { NextRequest, NextResponse } from 'next/server';
import { analyzeFraudMessage, getMockFraudAnalysis } from '@/lib/services/fraud-agent';
import { FraudAnalysisRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: FraudAnalysisRequest & { useMock?: boolean; mockScenario?: string } = await request.json();

    // Validate request
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!body.type) {
      return NextResponse.json(
        { error: 'Message type is required' },
        { status: 400 }
      );
    }

    // Check if using mock data for demo
    if (body.useMock && body.mockScenario) {
      const result = await getMockFraudAnalysis(body.mockScenario);
      return NextResponse.json(result);
    }

    // Perform actual fraud analysis
    const result = await analyzeFraudMessage({
      message: body.message,
      type: body.type,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Fraud detection API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze message. Please try again.' },
      { status: 500 }
    );
  }
}
