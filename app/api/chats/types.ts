import { z } from 'zod';

/**
 * Schema for a chat
 */
export const ChatSchema = z.object({
  /** Unique identifier for the chat */
  id: z.string(),
  /** Title of the chat, can be null if not set */
  title: z.string().nullable(),
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
 * Schema for the created chat response
 */
export const CreateChatResponseSchema = ChatSchema;

/**
 * Schema for the list of chats response
 */
export const ListChatsResponseSchema = z.array(CreateChatResponseSchema);

// Exported types
export type CreateChatRequest = z.infer<typeof CreateChatRequestSchema>;
export type CreateChatResponse = z.infer<typeof CreateChatResponseSchema>;
export type ListChatsResponse = z.infer<typeof ListChatsResponseSchema>;
