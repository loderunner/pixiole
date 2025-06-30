import { z } from 'zod';

import { FileSchema } from '../types';

export const ReadFileResponseSchema = FileSchema;

/**
 * Schema for updating a file
 */
export const UpdateFileRequestSchema = z.object({
  /** Content of the file */
  content: z.string(),
});

/**
 * Schema for the response when updating a file
 */
export const UpdateFileResponseSchema = FileSchema;

export type ReadFileResponse = z.infer<typeof ReadFileResponseSchema>;
export type UpdateFileRequest = z.infer<typeof UpdateFileRequestSchema>;
export type UpdateFileResponse = z.infer<typeof UpdateFileResponseSchema>;
