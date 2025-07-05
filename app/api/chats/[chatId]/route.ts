import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { ReadChatResponse, ReadChatResponseSchema } from './types';

import { ErrorResponse, ErrorResponseSchema } from '@/src/api/error';
import { db } from '@/src/db';
import { chats } from '@/src/db/schema';

type RouteContext = {
  params: Promise<{ chatId: string }>;
};

/**
 * Get a chat
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<ReadChatResponse | ErrorResponse>> {
  const { chatId } = await context.params;

  // Fetch chat from database
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
  });

  // Check if chat exists
  if (chat === null || chat === undefined) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'Chat not found',
    });
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const response = ReadChatResponseSchema.parse({
    id: chat.id,
    title: chat.title,
    createdAt: chat.createdAt.toISOString(),
    updatedAt: chat.updatedAt.toISOString(),
  });

  return NextResponse.json(response);
}

/**
 * Delete a chat
 */
export async function DELETE(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<{ success: boolean } | ErrorResponse>> {
  const { chatId } = await context.params;

  // Check if chat exists first
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
  });

  if (chat === null || chat === undefined) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'Chat not found',
    });
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Delete the chat (cascade will handle related messages and files)
  await db.delete(chats).where(eq(chats.id, chatId));

  return NextResponse.json({ success: true });
}
