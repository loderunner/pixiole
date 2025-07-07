import { NextRequest } from 'next/server';

import { GET } from './get';
import { POST } from './post';

export { GET, POST };

/**
 * Delete messages after a specific message ID
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ chatId: string }> },
) {
  const { chatId } = await context.params;
  const { searchParams } = new URL(request.url);
  const afterMessageId = searchParams.get('afterMessageId');

  if (!afterMessageId) {
    return new Response(JSON.stringify({ error: 'afterMessageId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { db } = await import('@/src/db');
  const { messages, chats } = await import('@/src/db/schema');
  const { eq, and, gt } = await import('drizzle-orm');

  // Check if chat exists
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
  });

  if (!chat) {
    return new Response(JSON.stringify({ error: 'Chat not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get the timestamp of the target message
  const targetMessage = await db.query.messages.findFirst({
    where: and(eq(messages.chatId, chatId), eq(messages.id, afterMessageId)),
  });

  if (!targetMessage) {
    return new Response(JSON.stringify({ error: 'Message not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Delete all messages after the target message
  await db.delete(messages).where(
    and(
      eq(messages.chatId, chatId),
      gt(messages.createdAt, targetMessage.createdAt),
    ),
  );

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
