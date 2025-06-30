import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { FileSchema } from '../types';

import { ReadFileResponse } from './types';

import { ErrorResponse, ErrorResponseSchema } from '@/src/api/error';
import { db } from '@/src/db';
import { chats, files } from '@/src/db/schema';

type RouteContext = {
  params: Promise<{ chatId: string; filename: string }>;
};

/**
 * Get a specific file from a chat
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<ReadFileResponse | ErrorResponse>> {
  const { chatId, filename } = await context.params;

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

  // Find the file
  const file = await db.query.files.findFirst({
    where: and(eq(files.chatId, chatId), eq(files.name, filename)),
  });

  if (file === undefined) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'File not found',
    });
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const response = FileSchema.parse({
    name: file.name,
    content: file.content,
    createdAt: file.createdAt.toISOString(),
    updatedAt: file.updatedAt.toISOString(),
  });

  return NextResponse.json(response);
}
