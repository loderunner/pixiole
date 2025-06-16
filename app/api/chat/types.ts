import { z } from 'zod';

/**
 * Schema for a chat message compatible with CoreMessage from 'ai' package
 */
export const MessageSchema = z.object({
  /** Role of the message sender */
  role: z.enum(['user', 'assistant']),
  /** Content of the message */
  content: z.string(),
});

/**
 * Schema for the chat request payload
 */
export const ChatRequestSchema = z.object({
  /** Array of messages for the chat conversation */
  messages: z.array(MessageSchema).min(1, 'At least one message is required'),
});

// Exported types
export type Message = z.infer<typeof MessageSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
