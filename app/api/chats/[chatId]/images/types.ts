import { z } from 'zod';

/**
 * Schema for an image resource
 */
export const ImageSchema = z.object({
  /** Unique identifier for the image */
  id: z.string(),
  /** Chat ID this image belongs to */
  chatId: z.string(),
  /** Name/identifier for the image */
  name: z.string(),
  /** Text prompt used to generate the image */
  prompt: z.string(),
  /** Size of the image (e.g., "256x256", "512x512") */
  size: z.string(),
  /** Generation status */
  status: z.enum(['pending', 'generating', 'completed', 'failed']),
  /** URL to the generated image (null if not yet generated) */
  imageUrl: z.string().nullable(),
  /** Error message if generation failed */
  errorMessage: z.string().nullable(),
  /** ISO string representing when the image was created */
  createdAt: z.string(),
  /** ISO string representing when the image was last updated */
  updatedAt: z.string(),
});

/**
 * Schema for creating a new image
 */
export const CreateImageRequestSchema = z.object({
  /** Name/identifier for the image */
  name: z.string().min(1, 'Name cannot be empty'),
  /** Text prompt for image generation */
  prompt: z.string().min(1, 'Prompt cannot be empty'),
  /** Size of the image to generate */
  size: z.string().regex(/^\d+x\d+$/, 'Size must be in format "widthxheight"'),
});

/**
 * Schema for updating an image's status
 */
export const UpdateImageStatusRequestSchema = z.object({
  /** New status for the image */
  status: z.enum(['pending', 'generating', 'completed', 'failed']),
  /** URL to the generated image (for completed status) */
  imageUrl: z.string().optional(),
  /** Error message (for failed status) */
  errorMessage: z.string().optional(),
});

/**
 * Schema for listing images in a chat
 */
export const ListImagesResponseSchema = z.object({
  /** Array of images in the chat */
  images: z.array(ImageSchema),
});

/**
 * Schema for the response when creating a new image
 */
export const CreateImageResponseSchema = ImageSchema;

/**
 * Schema for the response when updating an image
 */
export const UpdateImageStatusResponseSchema = ImageSchema;

// Exported types
export type Image = z.infer<typeof ImageSchema>;
export type CreateImageRequest = z.infer<typeof CreateImageRequestSchema>;
export type UpdateImageStatusRequest = z.infer<typeof UpdateImageStatusRequestSchema>;
export type ListImagesResponse = z.infer<typeof ListImagesResponseSchema>;
export type CreateImageResponse = z.infer<typeof CreateImageResponseSchema>;
export type UpdateImageStatusResponse = z.infer<typeof UpdateImageStatusResponseSchema>;