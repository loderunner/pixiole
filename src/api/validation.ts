import { z } from 'zod';

import { ErrorResponseSchema } from './error';

/**
 * Validates an API response using the provided Zod schema
 * @param response - The fetch response object
 * @param successSchema - Zod schema for successful response
 * @returns Promise resolving to the validated response data
 * @throws Error if the response is not ok or contains an error
 */
export async function validateAPIResponse<T>(
  response: Response,
  successSchema: z.ZodSchema<T>,
): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    // Try to parse as error response
    const errorParseResult = ErrorResponseSchema.safeParse(data);
    if (errorParseResult.success) {
      throw new Error(errorParseResult.data.error);
    }

    // Fallback to generic error
    throw new Error(response.statusText);
  }

  // Validate successful response
  const parseResult = successSchema.safeParse(data);
  if (!parseResult.success) {
    throw new Error('Invalid response from API');
  }

  return parseResult.data;
}
