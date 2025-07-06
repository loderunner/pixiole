import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse, ErrorResponseSchema } from '@/src/api/error';
import { db } from '@/src/db';
import { chats } from '@/src/db/schema';

type RouteContext = {
  params: Promise<{ chatId: string }>;
};

/**
 * Delete a chat
 */
export async function DELETE(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<ErrorResponse> | NextResponse<never>> {
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

  return new NextResponse(null, { status: 204 });
}
