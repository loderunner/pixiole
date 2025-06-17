import { z } from 'zod';

/**
 * Schema for a chat message (shared)
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
 * Schema for creating a new message
 */
export const CreateMessageRequestSchema = z.object({
  /** Role of the message sender - either user or assistant */
  role: z.enum(['user', 'assistant']),
  /** Content of the message - must not be empty */
  content: z.string().min(1, 'Content cannot be empty'),
});

/**
 * Schema for the response when creating a new message
 */
export const CreateMessageResponseSchema = MessageSchema;

/**
 * Schema for listing messages in a chat
 */
export const ListMessagesResponseSchema = z.object({
  /** Array of messages in the chat, ordered by creation time */
  messages: z.array(MessageSchema),
});

// Exported types
export type Message = z.infer<typeof MessageSchema>;
export type CreateMessageRequest = z.infer<typeof CreateMessageRequestSchema>;
export type CreateMessageResponse = z.infer<typeof CreateMessageResponseSchema>;
export type ListMessagesResponse = z.infer<typeof ListMessagesResponseSchema>;
