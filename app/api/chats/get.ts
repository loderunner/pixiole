import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { CreateChatResponseSchema, ListChatsResponse } from './types';

import { ErrorResponse, ErrorResponseSchema } from '@/src/api/error';
import { db } from '@/src/db';
import { chats } from '@/src/db/schema';

/**
 * Get all chats
 */
export async function GET(): Promise<
  NextResponse<ListChatsResponse | ErrorResponse>
> {
  try {
    const allChats = await db
      .select()
      .from(chats)
      .orderBy(desc(chats.updatedAt));

    const chatResponses = allChats.map((chat) =>
      CreateChatResponseSchema.parse({
        id: chat.id,
        title: chat.title,
        createdAt: chat.createdAt.toISOString(),
        updatedAt: chat.updatedAt.toISOString(),
      }),
    );

    return NextResponse.json(chatResponses);
  } catch (_error) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'Failed to fetch chats',
    });
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
