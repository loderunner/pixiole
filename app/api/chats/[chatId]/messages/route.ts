import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import {
  CreateMessageRequestSchema,
  CreateMessageResponse,
  CreateMessageResponseSchema,
} from './types';

import {
  ErrorResponse,
  ErrorResponseSchema,
  getValidationErrorMessage,
} from '@/src/api/error';
import { db } from '@/src/db';
import { chats, messages } from '@/src/db/schema';

type RouteContext = {
  params: Promise<{ chatId: string }>;
};

/**
 * Add a message to a chat
 */
export async function POST(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<CreateMessageResponse | ErrorResponse>> {
  const { chatId } = await context.params;

  // Parse and validate request body
  const body = await request.json();

  let validatedBody;
  try {
    validatedBody = CreateMessageRequestSchema.parse(body);
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

  const { role, content } = validatedBody;

  // Check if chat exists
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
  });

  if (chat === null || chat === undefined) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'Chat not found',
    });
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Create message and update chat timestamp
  const messageId = nanoid(8);
  const now = new Date();

  const newMessage = {
    id: messageId,
    chatId,
    role,
    content,
    createdAt: now,
  };

  await db.insert(messages).values(newMessage);
  await db.update(chats).set({ updatedAt: now }).where(eq(chats.id, chatId));

  const response = CreateMessageResponseSchema.parse({
    id: messageId,
    role,
    content,
    createdAt: now.toISOString(),
  });

  return NextResponse.json(response);
}
