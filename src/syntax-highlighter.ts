import { createHighlighterCore, createOnigurumaEngine } from 'shiki';

// Custom terminal theme that matches our emerald color scheme - Dark Mode
const pixioleTerminalTheme = {
  name: 'pixiole-terminal',
  type: 'dark' as const,
  fg: '#88dd99',
  bg: '#111111',
  colors: {
    'editor.background': '#111111',
    'editor.foreground': '#88dd99',
    'terminal.background': '#111111',
    'terminal.foreground': '#88dd99',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#66bb77',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['keyword', 'storage.type', 'storage.modifier'],
      settings: {
        foreground: '#22dd77',
        fontStyle: 'bold',
      },
    },
    {
      scope: ['keyword.control', 'keyword.operator'],
      settings: {
        foreground: '#33ee88',
      },
    },
    {
      scope: ['string', 'string.quoted'],
      settings: {
        foreground: '#77dd99',
      },
    },
    {
      scope: ['constant.numeric', 'constant.language'],
      settings: {
        foreground: '#99ddbb',
      },
    },
    {
      scope: ['variable', 'variable.parameter'],
      settings: {
        foreground: '#88dd99',
      },
    },
    {
      scope: ['entity.name.function', 'meta.function-call'],
      settings: {
        foreground: '#44ee77',
        fontStyle: 'bold',
      },
    },
    {
      scope: ['entity.name.type', 'entity.name.class'],
      settings: {
        foreground: '#55ff88',
      },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: {
        foreground: '#66cc88',
      },
    },
    {
      scope: ['operator', 'keyword.operator.arithmetic'],
      settings: {
        foreground: '#33ee88',
      },
    },
    {
      scope: ['constant.character.escape'],
      settings: {
        foreground: '#99ffaa',
      },
    },
    {
      scope: ['invalid', 'invalid.illegal'],
      settings: {
        foreground: '#ff6666',
        fontStyle: 'underline',
      },
    },
  ],
};

// Light theme variant for better readability
const pixioleLightTheme = {
  name: 'pixiole-light',
  type: 'light' as const,
  fg: '#1b5e20',
  bg: '#f8f9fa',
  colors: {
    'editor.background': '#f8f9fa',
    'editor.foreground': '#1b5e20',
    'terminal.background': '#f8f9fa',
    'terminal.foreground': '#1b5e20',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#4a7c59',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['keyword', 'storage.type', 'storage.modifier'],
      settings: {
        foreground: '#2d7d32',
        fontStyle: 'bold',
      },
    },
    {
      scope: ['keyword.control', 'keyword.operator'],
      settings: {
        foreground: '#388e3c',
      },
    },
    {
      scope: ['string', 'string.quoted'],
      settings: {
        foreground: '#1b5e20',
      },
    },
    {
      scope: ['constant.numeric', 'constant.language'],
      settings: {
        foreground: '#2e7d32',
      },
    },
    {
      scope: ['variable', 'variable.parameter'],
      settings: {
        foreground: '#1b5e20',
      },
    },
    {
      scope: ['entity.name.function', 'meta.function-call'],
      settings: {
        foreground: '#2d7d32',
        fontStyle: 'bold',
      },
    },
    {
      scope: ['entity.name.type', 'entity.name.class'],
      settings: {
        foreground: '#388e3c',
      },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: {
        foreground: '#4a7c59',
      },
    },
    {
      scope: ['operator', 'keyword.operator.arithmetic'],
      settings: {
        foreground: '#388e3c',
      },
    },
    {
      scope: ['constant.character.escape'],
      settings: {
        foreground: '#2d7d32',
      },
    },
    {
      scope: ['invalid', 'invalid.illegal'],
      settings: {
        foreground: '#d32f2f',
        fontStyle: 'underline',
      },
    },
  ],
};

/**
 * Get the language identifier from file extension
 */
function getLanguageFromFilename(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'lua':
      return 'lua';
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'py':
      return 'python';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'yaml':
    case 'yml':
      return 'yaml';
    case 'xml':
      return 'xml';
    case 'sh':
    case 'bash':
      return 'bash';
    case 'c':
      return 'c';
    case 'cpp':
    case 'cc':
    case 'cxx':
      return 'cpp';
    case 'java':
      return 'java';
    case 'php':
      return 'php';
    case 'rb':
      return 'ruby';
    case 'go':
      return 'go';
    case 'rs':
      return 'rust';
    case 'sql':
      return 'sql';
    case undefined:
    default:
      return 'lua'; // fallback to lua for pixiole
  }
}

/**
 * Dynamic language imports for shiki
 */
async function getLanguageLoader(lang: string) {
  switch (lang) {
    case 'lua':
      return import('@shikijs/langs/lua');
    case 'javascript':
      return import('@shikijs/langs/javascript');
    case 'typescript':
      return import('@shikijs/langs/typescript');
    case 'python':
      return import('@shikijs/langs/python');
    case 'html':
      return import('@shikijs/langs/html');
    case 'css':
      return import('@shikijs/langs/css');
    case 'json':
      return import('@shikijs/langs/json');
    case 'markdown':
      return import('@shikijs/langs/markdown');
    case 'yaml':
      return import('@shikijs/langs/yaml');
    case 'xml':
      return import('@shikijs/langs/xml');
    case 'bash':
      return import('@shikijs/langs/bash');
    case 'c':
      return import('@shikijs/langs/c');
    case 'cpp':
      return import('@shikijs/langs/cpp');
    case 'java':
      return import('@shikijs/langs/java');
    case 'php':
      return import('@shikijs/langs/php');
    case 'ruby':
      return import('@shikijs/langs/ruby');
    case 'go':
      return import('@shikijs/langs/go');
    case 'rust':
      return import('@shikijs/langs/rust');
    case 'sql':
      return import('@shikijs/langs/sql');
    default:
      return import('@shikijs/langs/lua');
  }
}

/**
 * Create syntax highlighter with pixiole themes
 */
async function createPixioleHighlighter(languages: string[] = ['lua']) {
  // Load language bundles dynamically
  const languageLoaders = await Promise.all(
    languages.map((lang) => getLanguageLoader(lang)),
  );

  return createHighlighterCore({
    themes: [pixioleTerminalTheme, pixioleLightTheme],
    langs: languageLoaders,
    engine: createOnigurumaEngine(() => import('shiki/wasm')),
  });
}

let highlighterInstance: Awaited<
  ReturnType<typeof createPixioleHighlighter>
> | null = null;

/**
 * Highlight code with syntax highlighting using pixiole themes
 */
export async function highlightCode(
  code: string,
  filename: string,
  isDark: boolean = true,
): Promise<string> {
  const language = getLanguageFromFilename(filename);

  // Create or reuse highlighter instance
  if (highlighterInstance === null) {
    highlighterInstance = await createPixioleHighlighter([language]);
  }

  // Check if we need to load a new language
  try {
    const theme = isDark ? 'pixiole-terminal' : 'pixiole-light';

    return highlighterInstance.codeToHtml(code, {
      lang: language,
      theme,
    });
  } catch (_error) {
    // If language isn't loaded, reload highlighter with new language
    highlighterInstance = await createPixioleHighlighter([language]);
    const theme = isDark ? 'pixiole-terminal' : 'pixiole-light';

    return highlighterInstance.codeToHtml(code, {
      lang: language,
      theme,
    });
  }
}

/**
 * Check if dark mode is active
 */
export function isDarkMode(): boolean {
  if (typeof document === 'undefined') return true;
  return document.documentElement.classList.contains('dark');
}
