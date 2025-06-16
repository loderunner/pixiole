import { z } from 'zod';

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
export const CreateMessageResponseSchema = z.object({
  /** Unique identifier for the message */
  id: z.string(),
  /** Role of the message sender - either user or assistant */
  role: z.enum(['user', 'assistant']),
  /** Content of the message */
  content: z.string(),
  /** ISO string representing when the message was created */
  createdAt: z.string(),
});

// Exported types
export type CreateMessageRequest = z.infer<typeof CreateMessageRequestSchema>;
export type CreateMessageResponse = z.infer<typeof CreateMessageResponseSchema>;
