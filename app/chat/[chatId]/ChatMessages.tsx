'use client';

import { Message } from '@ai-sdk/react';
import { RobotIcon, StudentIcon } from '@phosphor-icons/react';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { transformerNotationDiff } from '@shikijs/transformers';
import { Ref, useMemo } from 'react';
import { MarkdownHooks } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { createHighlighterCore, createOnigurumaEngine } from 'shiki';

import { PropsWithClassName } from '@/src/PropsWithClassName';
import { rehypeDiffPlugin } from '@/src/rehype-diff-plugin';

function UserMessage({ message }: { message: Message }) {
  return (
    <div className="mb-6 flex flex-row items-start gap-4">
      <div className="flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-3 shadow-lg">
        <StudentIcon className="text-xl text-white" />
      </div>
      <div className="terminal-window flex-1 border-blue-600 bg-slate-100/60 p-4 dark:border-blue-400 dark:bg-gray-900/60">
        <div className="mb-2 text-xs tracking-wide text-blue-700 uppercase opacity-75 dark:text-blue-200">
          Toi
        </div>
        <div className="leading-relaxed text-blue-900 dark:text-blue-100">
          {message.content}
        </div>
      </div>
    </div>
  );
}

// Custom terminal theme that matches our emerald color scheme
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

const highlighter = await createHighlighterCore({
  themes: [pixioleTerminalTheme, pixioleLightTheme],
  langs: [import('@shikijs/langs/lua')],
  engine: createOnigurumaEngine(() => import('shiki/wasm')),
});

function AssistantMessage({ message }: { message: Message }) {
  // Detect if we're in dark mode by checking the document class
  const isDark =
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true;

  const content = useMemo(() => {
    return (
      <MarkdownHooks
        rehypePlugins={[
          [rehypeRaw],
          [rehypeDiffPlugin],
          [
            rehypeShikiFromHighlighter,
            highlighter,
            {
              theme: isDark ? 'pixiole-terminal' : 'pixiole-light',
              transformers: [transformerNotationDiff()],
            },
          ],
        ]}
      >
        {message.content}
      </MarkdownHooks>
    );
  }, [message.content, isDark]);

  return (
    <div className="mb-6 flex flex-row items-start gap-4">
      <div className="glow-text flex-shrink-0 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 p-3 shadow-lg">
        <RobotIcon className="text-xl text-white" />
      </div>
      <div className="terminal-window flex-1 bg-slate-100/80 p-4 dark:bg-gray-900/80">
        <div className="glow-text mb-2 text-xs tracking-wide text-emerald-700 uppercase opacity-75 dark:text-emerald-400">
          Pixiole IA
        </div>
        <div className="prose prose-code:before:content-none prose-code:after:content-none tutorial prose-li:my-1 prose-p:my-3 prose-headings:text-emerald-800 dark:prose-headings:text-emerald-300 prose-strong:text-emerald-900 dark:prose-strong:text-emerald-200 prose-code:text-emerald-800 dark:prose-code:text-emerald-400 prose-code:bg-slate-200/60 dark:prose-code:bg-gray-900/60 prose-code:py-1 prose-code:rounded max-w-none text-emerald-900 dark:text-emerald-100">
          <div className="leading-relaxed">{content}</div>
        </div>
      </div>
    </div>
  );
}

type Props = PropsWithClassName<{
  messages: Message[];
  ref?: Ref<HTMLDivElement>;
}>;

export default function ChatMessages({ className, messages, ref }: Props) {
  const messageElements = useMemo(() => {
    return messages.map((m) =>
      m.role === 'user' ? (
        <UserMessage key={m.id} message={m} />
      ) : (
        <AssistantMessage key={m.id} message={m} />
      ),
    );
  }, [messages]);

  return (
    <div className={className} ref={ref}>
      <div className="space-y-4">{messageElements}</div>
    </div>
  );
}
