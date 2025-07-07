import { openai } from '@ai-sdk/openai';
import { experimental_generateImage as generateImage } from 'ai';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

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
 * Generate an image using OpenAI's DALL-E API
 */
export async function POST(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<{ success: boolean } | ErrorResponse>> {
  const { chatId, imageId } = await context.params;

  try {
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

    // Update status to generating
    await db.update(images)
      .set({
        status: 'generating',
        updatedAt: new Date(),
      })
      .where(eq(images.id, imageId));

    // Convert size to DALL-E format
    const [width, height] = image.size.split('x').map(Number);
    let dalleSize: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
    
    // Map PICO-8 sizes to DALL-E sizes
    if (width <= 256 && height <= 256) {
      dalleSize = '256x256';
    } else if (width <= 512 && height <= 512) {
      dalleSize = '512x512';
    } else if (width > height) {
      dalleSize = '1792x1024';
    } else if (height > width) {
      dalleSize = '1024x1792';
    } else {
      dalleSize = '1024x1024';
    }

    // Generate the image using OpenAI's DALL-E through AI SDK
    const response = await generateImage({
      model: openai.image('dall-e-3'),
      prompt: `Pixel art sprite for a retro game: ${image.prompt}. Style: PICO-8 aesthetic, limited color palette, crisp pixels, ${image.size} resolution suitable for retro games.`,
      size: dalleSize,
    });

    if (!response.image.base64) {
      throw new Error('No image generated');
    }

    // Convert base64 to data URL
    const imageUrl = `data:image/png;base64,${response.image.base64}`;

    // Update the image record with the generated image URL
    await db.update(images)
      .set({
        status: 'completed',
        imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(images.id, imageId));

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Image generation failed:', error);
    
    // Update status to failed
    await db.update(images)
      .set({
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : 'Image generation failed',
        updatedAt: new Date(),
      })
      .where(eq(images.id, imageId));

    const errorResponse = ErrorResponseSchema.parse({
      error: 'Image generation failed',
    });
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export const maxDuration = 60; // Image generation can take time