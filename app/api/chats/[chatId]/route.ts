import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { ErrorResponse, ErrorResponseSchema } from '@/src/api/error';
import { db } from '@/src/db';
import { chats } from '@/src/db/schema';

/**
 * Schema for a chat message
 */
export const MessageSchema = z.object({
  /** Unique identifier for the message */
  id: z.string(),
  /** Role of the message sender - either user or assistant */
  role: z.enum(['user', 'assistant']),
  /** Content of the message */
  content: z.string(),
  /** ISO string representing when the message was created */
  createdAt: z.string(),
});

/**
 * Schema for a chat response that includes all messages
 */
export const ReadChatResponseSchema = z.object({
  /** Unique identifier for the chat */
  id: z.string(),
  /** Title of the chat, can be null if not set */
  title: z.string().nullable(),
  /** ISO string representing when the chat was created */
  createdAt: z.string(),
  /** ISO string representing when the chat was last updated */
  updatedAt: z.string(),
  /** Array of messages in the chat, ordered by creation time */
  messages: z.array(MessageSchema),
});

// Exported types
export type Message = z.infer<typeof MessageSchema>;
export type ReadChatResponse = z.infer<typeof ReadChatResponseSchema>;

type RouteContext = {
  params: Promise<{ chatId: string }>;
};

/**
 * Get a chat with its messages
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<ReadChatResponse | ErrorResponse>> {
  const { chatId } = await context.params;

  // Fetch chat with messages from database
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
    with: {
      messages: {
        orderBy: (messages, { asc }) => [asc(messages.createdAt)],
      },
    },
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
    messages: chat.messages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt.toISOString(),
    })),
  });

  return NextResponse.json(response);
}
