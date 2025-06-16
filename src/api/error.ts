import { ZodError, z } from 'zod';

/**
 * Standard error response schema for all API endpoints
 */
export const ErrorResponseSchema = z.object({
  /** Error message describing what went wrong */
  error: z.string(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

/**
 * Get appropriate error message from any error, with special handling for ZodError
 * @param error - The error to process
 * @returns Formatted error message string
 */
export function getValidationErrorMessage(error: ZodError): string {
  const issues = error.issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join('.')}: ` : '';
    return `${path}${issue.message}`;
  });
  return issues.join('; ');
}
