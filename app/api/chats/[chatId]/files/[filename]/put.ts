import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import {
  UpdateFileRequestSchema,
  UpdateFileResponse,
  UpdateFileResponseSchema,
} from './types';

import {
  ErrorResponse,
  ErrorResponseSchema,
  getValidationErrorMessage,
} from '@/src/api/error';
import { db } from '@/src/db';
import { chats, files } from '@/src/db/schema';

type RouteContext = {
  params: Promise<{ chatId: string; filename: string }>;
};

/**
 * Update a specific file in a chat
 */
export async function PUT(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<UpdateFileResponse | ErrorResponse>> {
  const { chatId, filename } = await context.params;

  let validatedBody;
  try {
    const body = await request.json();
    validatedBody = UpdateFileRequestSchema.parse(body);
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

  const { content } = validatedBody;

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

  // Check if file exists
  const existingFile = await db.query.files.findFirst({
    where: and(eq(files.chatId, chatId), eq(files.name, filename)),
  });

  if (existingFile === undefined) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'File not found',
    });
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Update file and chat timestamp
  const now = new Date();

  await db
    .update(files)
    .set({ content, updatedAt: now })
    .where(and(eq(files.chatId, chatId), eq(files.name, filename)));

  // Update chat timestamp
  await db.update(chats).set({ updatedAt: now }).where(eq(chats.id, chatId));

  const response = UpdateFileResponseSchema.parse({
    name: filename,
    content,
    createdAt: existingFile.createdAt.toISOString(),
    updatedAt: now.toISOString(),
  });

  return NextResponse.json(response);
}
