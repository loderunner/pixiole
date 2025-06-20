import { Element, Root } from 'hast';
import type { Parent } from 'unist';
import { visit } from 'unist-util-visit';

type DiffLine = {
  type: 'added' | 'removed' | 'unchanged' | 'context';
  content: string;
  originalLine: string;
};

type DiffRange = {
  oldStart: number;
  oldCount: number;
  newStart: number;
  newCount: number;
  context?: string;
};

type DiffMetadata = {
  oldFilename?: string;
  newFilename?: string;
  ranges: DiffRange[];
};

interface HastNode {
  type: string;
  value?: string;
  children?: HastNode[];
}

function parseRangeLine(line: string): DiffRange | null {
  // Parse lines like: @@ -12,8 +12,10 @@ function Player:new(name, x, y)
  const rangeMatch = line.match(
    /^@@\s+-(\d+)(?:,(\d+))?\s+\+(\d+)(?:,(\d+))?\s+@@(.*)$/,
  );

  if (rangeMatch === null) {
    return null;
  }

  const [, oldStartStr, oldCountStr, newStartStr, newCountStr, context] =
    rangeMatch;

  return {
    oldStart: parseInt(oldStartStr, 10),
    oldCount: oldCountStr !== undefined ? parseInt(oldCountStr, 10) : 1,
    newStart: parseInt(newStartStr, 10),
    newCount: newCountStr !== undefined ? parseInt(newCountStr, 10) : 1,
    context:
      context !== undefined && context.trim().length > 0
        ? context.trim()
        : undefined,
  };
}

function parseDiffContent(content: string): {
  lines: DiffLine[];
  metadata: DiffMetadata;
} {
  const lines = content.split('\n');
  const diffLines: DiffLine[] = [];
  const metadata: DiffMetadata = {
    ranges: [],
  };

  for (const line of lines) {
    // Handle filename headers
    if (line.startsWith('---')) {
      const filename = line.slice(4).trim();
      if (filename !== '/dev/null') {
        metadata.oldFilename = filename;
      }
      continue; // Skip this line in output
    }

    if (line.startsWith('+++')) {
      const filename = line.slice(4).trim();
      if (filename !== '/dev/null') {
        metadata.newFilename = filename;
      }
      continue; // Skip this line in output
    }

    // Handle range headers
    if (line.startsWith('@@')) {
      const range = parseRangeLine(line);
      if (range !== null) {
        metadata.ranges.push(range);
      }
      continue; // Skip this line in output
    }

    let type: DiffLine['type'] = 'unchanged';
    let content = line;

    if (line.startsWith('+')) {
      type = 'added';
      content = line.slice(1);
    } else if (line.startsWith('-')) {
      type = 'removed';
      content = line.slice(1);
    } else if (line.startsWith(' ')) {
      type = 'context';
      content = line.slice(1);
    }

    diffLines.push({
      type,
      content,
      originalLine: line,
    });
  }

  return { lines: diffLines, metadata };
}

function createDiffElement(lines: DiffLine[]): Element {
  // Convert diff lines to use Shiki's notation format
  const processedLines = lines.map((line) => {
    let content = line.content;

    // Add Shiki diff notation based on line type
    if (line.type === 'added') {
      content = content + ' -- [!code ++]';
    } else if (line.type === 'removed') {
      content = content + ' -- [!code --]';
    }

    return content;
  });

  // Always use Lua as the language
  const languageClass = 'language-lua';

  // Create a code element that will be processed by Shiki
  return {
    type: 'element',
    tagName: 'pre',
    properties: {},
    children: [
      {
        type: 'element',
        tagName: 'code',
        properties: { className: [languageClass] },
        children: [
          {
            type: 'text',
            value: processedLines.join('\n'),
          },
        ],
      },
    ],
  };
}

export function rehypeDiffPlugin() {
  return function transformer(tree: Root) {
    visit(tree, 'element', (node: Element, index?: number, parent?: Parent) => {
      if (
        node.tagName === 'pre' &&
        node.children !== undefined &&
        node.children.length > 0 &&
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'code'
      ) {
        const codeElement = node.children[0];
        const className = codeElement.properties?.className;

        if (Array.isArray(className) && className.includes('language-diff')) {
          // Extract text content from the code element
          let textContent = '';
          function extractText(node: HastNode): void {
            if (node.type === 'text' && node.value !== undefined) {
              textContent += node.value;
            } else if (node.children !== undefined) {
              node.children.forEach(extractText);
            }
          }

          codeElement.children.forEach(extractText);

          const { lines } = parseDiffContent(textContent);
          const diffElement = createDiffElement(lines);

          // Replace the pre element with our custom diff element
          if (parent !== undefined && typeof index === 'number') {
            parent.children[index] = diffElement;
          }
        }
      }
    });
  };
}
