import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import {
  CreateFileRequestSchema,
  CreateFileResponse,
  CreateFileResponseSchema,
} from './types';

import {
  ErrorResponse,
  ErrorResponseSchema,
  getValidationErrorMessage,
} from '@/src/api/error';
import { db } from '@/src/db';
import { chats, files } from '@/src/db/schema';

type RouteContext = {
  params: Promise<{ chatId: string }>;
};

/**
 * Create a new file in a chat
 */
export async function POST(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<CreateFileResponse | ErrorResponse>> {
  const { chatId } = await context.params;

  let validatedBody;
  try {
    const body = await request.json();
    validatedBody = CreateFileRequestSchema.parse(body);
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

  const { name, content } = validatedBody;

  // Check if chat exists
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
  });

  if (chat === undefined) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'Chat not found',
    });
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Check if file already exists
  const existingFile = await db.query.files.findFirst({
    where: and(eq(files.chatId, chatId), eq(files.name, name)),
  });

  if (existingFile !== undefined) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'File with this name already exists',
    });
    return NextResponse.json(errorResponse, { status: 409 });
  }

  // Create file and update chat timestamp
  const now = new Date();

  const newFile = {
    chatId,
    name,
    content,
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(files).values(newFile);

  // Update chat timestamp
  await db.update(chats).set({ updatedAt: now }).where(eq(chats.id, chatId));

  const response = CreateFileResponseSchema.parse({
    name,
    content,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  });

  return NextResponse.json(response, { status: 201 });
}
