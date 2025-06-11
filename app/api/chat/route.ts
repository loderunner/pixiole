import { openai } from '@ai-sdk/openai';
import { CoreMessage, streamText } from 'ai';
import { NextRequest } from 'next/server';

import { mockModel } from './mock-model';
import { systemPrompt } from './prompt';

export const maxDuration = 30;

export type Request = {
  messages: CoreMessage[];
};

export async function POST(req: NextRequest) {
  const { messages }: Request = await req.json();
  messages.unshift({
    role: 'system',
    content: systemPrompt,
  });

  const result = streamText({
    model: openai('gpt-4.1-mini'),
    messages,
    maxTokens: 8192,
  });

  return result.toDataStreamResponse();
}
