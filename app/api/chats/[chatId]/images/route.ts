import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import {
  CreateImageRequestSchema,
  CreateImageResponse,
  CreateImageResponseSchema,
  ListImagesResponse,
  ListImagesResponseSchema,
} from './types';

import {
  ErrorResponse,
  ErrorResponseSchema,
  getValidationErrorMessage,
} from '@/src/api/error';
import { db } from '@/src/db';
import { chats, images } from '@/src/db/schema';

type RouteContext = {
  params: Promise<{ chatId: string }>;
};

/**
 * Get all images for a chat
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<ListImagesResponse | ErrorResponse>> {
  const { chatId } = await context.params;

  // Check if chat exists
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
  });

  if (chat === undefined) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'Chat not found',
    });
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Fetch images for the chat
  const chatImages = await db.query.images.findMany({
    where: eq(images.chatId, chatId),
    orderBy: (images, { desc }) => [desc(images.createdAt)],
  });

  const response = ListImagesResponseSchema.parse({
    images: chatImages.map((image) => ({
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
    })),
  });

  return NextResponse.json(response);
}

/**
 * Create a new image
 */
export async function POST(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<CreateImageResponse | ErrorResponse>> {
  const { chatId } = await context.params;

  let validatedBody;
  try {
    const body = await request.json();
    validatedBody = CreateImageRequestSchema.parse(body);
  } catch (error) {
    const errorMessage =
      error instanceof ZodError
        ? getValidationErrorMessage(error)
        : 'Invalid request';

    const errorResponse = ErrorResponseSchema.parse({
      error: errorMessage,
    });
    return NextResponse.json(errorResponse, { status: 400 });
  }

  const { name, prompt, size } = validatedBody;

  // Check if chat exists
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
  });

  if (chat === undefined) {
    const errorResponse = ErrorResponseSchema.parse({
      error: 'Chat not found',
    });
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Create image record
  const imageId = nanoid(8);
  const now = new Date();

  const newImage = {
    id: imageId,
    chatId,
    name,
    prompt,
    size,
    status: 'pending' as const,
    imageUrl: null,
    errorMessage: null,
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(images).values(newImage);

  // Trigger image generation in the background
  // We'll create a separate endpoint for this
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/chats/${chatId}/images/${imageId}/generate`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Failed to trigger image generation:', error);
  }

  const response = CreateImageResponseSchema.parse({
    id: imageId,
    chatId,
    name,
    prompt,
    size,
    status: 'pending',
    imageUrl: null,
    errorMessage: null,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  });

  return NextResponse.json(response, { status: 201 });
}