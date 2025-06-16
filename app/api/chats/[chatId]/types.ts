import { z } from 'zod';

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
