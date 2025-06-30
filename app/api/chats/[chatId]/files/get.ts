import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { ListFilesResponse, ListFilesResponseSchema } from './types';

import { ErrorResponse, ErrorResponseSchema } from '@/src/api/error';
import { db } from '@/src/db';
import { chats, files } from '@/src/db/schema';

type RouteContext = {
  params: Promise<{ chatId: string }>;
};

/**
 * Get all files for a chat
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<ListFilesResponse | ErrorResponse>> {
  const { chatId } = await context.params;

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

  // Fetch files for the chat
  const chatFiles = await db.query.files.findMany({
    where: eq(files.chatId, chatId),
    orderBy: (files, { asc }) => [asc(files.name)],
  });

  const response = ListFilesResponseSchema.parse({
    files: chatFiles.map((file) => ({
      name: file.name,
      content: file.content,
      createdAt: file.createdAt.toISOString(),
      updatedAt: file.updatedAt.toISOString(),
    })),
  });

  return NextResponse.json(response);
}
