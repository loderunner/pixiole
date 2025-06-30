import { applyPatch, parsePatch } from 'diff';

/**
 * Applies a diff patch to the original content
 * @param originalContent The original file content
 * @param diffContent The diff content to apply
 * @returns The updated content after applying the diff
 */
export function applyDiff(
  originalContent: string,
  diffContent: string,
): string {
  try {
    const patches = parsePatch(diffContent);

    if (patches.length === 0) {
      return originalContent;
    }

    let content = originalContent;
    for (const patch of patches) {
      const result = applyPatch(content, patch, {
        fuzzFactor: 2,
        compareLine(_lineNumber, line, _operation, patchContent) {
          return line.trim() === patchContent.trim();
        },
      });
      if (result !== false) {
        content = result;
      }
    }

    return content;
  } catch (_error) {
    return originalContent;
  }
}
