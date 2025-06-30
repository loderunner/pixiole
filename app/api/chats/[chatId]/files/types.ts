import { z } from 'zod';

/**
 * Schema for a file
 */
export const FileSchema = z.object({
  /** Name of the file */
  name: z.string(),
  /** Content of the file */
  content: z.string(),
  /** ISO string representing when the file was created */
  createdAt: z.string(),
  /** ISO string representing when the file was last updated */
  updatedAt: z.string(),
});

/**
 * Schema for creating a new file
 */
export const CreateFileRequestSchema = z.object({
  /** Name of the file - must not be empty */
  name: z.string().min(1, 'File name cannot be empty'),
  /** Content of the file */
  content: z.string(),
});

/**
 * Schema for the response when creating a new file
 */
export const CreateFileResponseSchema = FileSchema;

/**
 * Schema for listing files in a chat
 */
export const ListFilesResponseSchema = z.object({
  /** Array of files in the chat, ordered by name */
  files: z.array(FileSchema),
});

// Exported types
export type File = z.infer<typeof FileSchema>;
export type CreateFileRequest = z.infer<typeof CreateFileRequestSchema>;
export type CreateFileResponse = z.infer<typeof CreateFileResponseSchema>;
export type ListFilesResponse = z.infer<typeof ListFilesResponseSchema>;
