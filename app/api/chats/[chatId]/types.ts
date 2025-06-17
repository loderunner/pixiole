import { z } from 'zod';

import { ChatSchema } from '../types';

/**
 * Schema for a chat response
 */
export const ReadChatResponseSchema = ChatSchema;

// Exported types
export type ReadChatResponse = z.infer<typeof ReadChatResponseSchema>;
