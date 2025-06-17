import { z } from 'zod';

/**
 * Schema for a chat
 */
export const ChatSchema = z.object({
  /** Unique identifier for the chat */
  id: z.string(),
  /** Title of the chat, can be null if not set */
  title: z.string(),
  /** Status of the chat - awaiting_response or active */
  status: z.enum(['awaiting_response', 'active']),
  /** ISO string representing when the chat was created */
  createdAt: z.string(),
  /** ISO string representing when the chat was last updated */
  updatedAt: z.string(),
});

/**
 * Schema for creating a new chat
 */
export const CreateChatRequestSchema = z.object({
  /**
   * Optional title for the chat. If not provided, a title will be generated
   * based on the initial message
   */
  title: z.string().optional(),
  /** Initial message to start the chat with */
  initialMessage: z.string(),
});

/**
 * Schema for the chat response
 */
export const ChatResponseSchema = ChatSchema;

// Exported types
export type CreateChatRequest = z.infer<typeof CreateChatRequestSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
