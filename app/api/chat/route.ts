import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { ZodError } from 'zod';

import { mockModel } from './mock-model';
import { systemPrompt } from './prompt';
import { ChatRequestSchema } from './types';

import {
  ErrorResponseSchema,
  getValidationErrorMessage,
} from '@/src/api/error';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  let validatedBody;
  try {
    const body = await req.json();
    validatedBody = ChatRequestSchema.parse(body);
  } catch (error) {
    const errorMessage =
      error instanceof ZodError
        ? getValidationErrorMessage(error)
        : 'Invalid request';

    const errorResponse = ErrorResponseSchema.parse({
      error: errorMessage,
    });
    return new Response(JSON.stringify(errorResponse), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages } = validatedBody;

  const result = streamText({
    model: mockModel, // openai('gpt-4.1'),
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...messages,
    ],
    maxTokens: 8192,
  });

  return result.toDataStreamResponse();
}
