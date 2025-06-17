import { generateText } from 'ai';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { mockModel } from '../chat/mock-model';

import {
  CreateChatRequestSchema,
  CreateChatResponse,
  CreateChatResponseSchema,
} from './types';

import {
  ErrorResponse,
  ErrorResponseSchema,
  getValidationErrorMessage,
} from '@/src/api/error';
import { db } from '@/src/db';
import { chats, messages } from '@/src/db/schema';

/**
 * Create a new chat
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateChatResponse | ErrorResponse>> {
  let validatedBody;
  try {
    const body = await request.json();
    validatedBody = CreateChatRequestSchema.parse(body);
  } catch (error) {
    const errorMessage =
      error instanceof ZodError
        ? getValidationErrorMessage(error)
        : 'Invalid request';

    const errorResponse = ErrorResponseSchema.parse({
      error: errorMessage,
    });
    return NextResponse.json(errorResponse, { status: 400 });
  }

  const { title, initialMessage } = validatedBody;

  const chatId = nanoid(8);
  const now = new Date();

  const hasInitialMessage = initialMessage.trim() !== '';

  // Generate title based on initial message if not provided
  let finalTitle = title;
  if (typeof title !== 'string' || title.trim() === '') {
    if (hasInitialMessage) {
      try {
        const result = await generateText({
          model: mockModel,
          prompt: `Generate a short, creative title IN FRENCH (2-6 words) for a PICO-8 game development conversation based on this user message: "${initialMessage}". The title should be engaging and related to the specific game concept mentioned. The title MUST BE in French. Just return the title, nothing else.`,
          maxTokens: 20,
        });
        finalTitle = result.text.trim().replace(/['"]/g, '');
      } catch (_error) {
        // Fallback to a default title if LLM call fails
        finalTitle = 'Nouveau projet';
      }
    } else {
      finalTitle = 'Nouveau projet';
    }
  }

  // Create the chat and initial message in database
  const newChat = {
    id: chatId,
    title: finalTitle,
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(chats).values(newChat);

  if (hasInitialMessage) {
    const messageId = nanoid(8);
    await db.insert(messages).values({
      id: messageId,
      chatId,
      role: 'user',
      content: initialMessage.trim(),
      createdAt: now,
    });
  }

  const response = CreateChatResponseSchema.parse({
    id: chatId,
    title: newChat.title,
    createdAt: newChat.createdAt.toISOString(),
    updatedAt: newChat.updatedAt.toISOString(),
  });

  return NextResponse.json(response);
}
