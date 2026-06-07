import { NextRequest, NextResponse } from 'next/server';
import { generateWithGemini } from '@/lib/gemini';
import { buildSystemPrompt, buildUserMessage } from '@/lib/promptBuilder';
import { GenerateRequest, GenerateResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();
    const { thoughts, target } = body;

    if (!thoughts || thoughts.trim().length === 0) {
      return NextResponse.json<GenerateResponse>(
        { prompt: '', error: 'Please enter your thoughts before generating.' },
        { status: 400 }
      );
    }

    if (!target) {
      return NextResponse.json<GenerateResponse>(
        { prompt: '', error: 'Please select an AI target.' },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
      return NextResponse.json<GenerateResponse>(
        { prompt: '', error: 'API key not configured. Add OPENROUTER_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const systemPrompt = buildSystemPrompt(target);
    const userMessage = buildUserMessage(thoughts, target);
    const generatedPrompt = await generateWithGemini(systemPrompt, userMessage);

    return NextResponse.json<GenerateResponse>({ prompt: generatedPrompt });

  } catch (error: unknown) {
    console.error('Generation error:', error);

    let message = 'Unable to generate prompt. Please try again.';
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        message = 'Invalid API key. Please check OPENROUTER_API_KEY in .env.local.';
      } else if (error.message.includes('429') || error.message.includes('quota')) {
        message = 'Rate limit hit. Please try again in a moment.';
      } else if (error.message.includes('not set')) {
        message = 'OPENROUTER_API_KEY is missing from .env.local.';
      }
    }

    return NextResponse.json<GenerateResponse>(
      { prompt: '', error: message },
      { status: 500 }
    );
  }
}