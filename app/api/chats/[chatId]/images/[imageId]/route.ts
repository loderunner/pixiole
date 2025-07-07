import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { ImageSchema } from '../types';

import {
  ErrorResponse,
  ErrorResponseSchema,
} from '@/src/api/error';
import { db } from '@/src/db';
import { images } from '@/src/db/schema';

type RouteContext = {
  params: Promise<{ chatId: string; imageId: string }>;
};

/**
 * Get a specific image by ID
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<typeof ImageSchema._output | ErrorResponse>> {
  const { chatId, imageId } = await context.params;

  // Get the image record
  const image = await db.query.images.findFirst({
    where: eq(images.id, imageId),
  });

  if (!image || image.chatId !== chatId) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'Image not found',
    });
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const response = ImageSchema.parse({
    id: image.id,
    chatId: image.chatId,
    name: image.name,
    prompt: image.prompt,
    size: image.size,
    status: image.status,
    imageUrl: image.imageUrl,
    errorMessage: image.errorMessage,
    createdAt: image.createdAt.toISOString(),
    updatedAt: image.updatedAt.toISOString(),
  });

  return NextResponse.json(response);
}