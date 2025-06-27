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
      <div className="terminal-window flex-1 border-blue-400 bg-gray-900/60 p-4">
        <div className="mb-2 text-xs tracking-wide text-blue-200 uppercase opacity-75">
          Toi
        </div>
        <div className="leading-relaxed text-blue-100">{message.content}</div>
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

const highlighter = await createHighlighterCore({
  themes: [pixioleTerminalTheme],
  langs: [import('@shikijs/langs/lua')],
  engine: createOnigurumaEngine(() => import('shiki/wasm')),
});

function AssistantMessage({ message }: { message: Message }) {
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
              theme: 'pixiole-terminal',
              transformers: [transformerNotationDiff()],
            },
          ],
        ]}
      >
        {message.content}
      </MarkdownHooks>
    );
  }, [message.content]);

  return (
    <div className="mb-6 flex flex-row items-start gap-4">
      <div className="glow-text flex-shrink-0 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 p-3 shadow-lg">
        <RobotIcon className="text-xl text-white" />
      </div>
      <div className="terminal-window flex-1 bg-gray-900/80 p-4">
        <div className="glow-text mb-2 text-xs tracking-wide text-emerald-400 uppercase opacity-75">
          Pixiole IA
        </div>
        <div className="prose tutorial prose-li:my-1 prose-p:my-3 prose-headings:text-emerald-300 prose-strong:text-emerald-200 prose-code:text-emerald-400 prose-code:bg-gray-900/60 prose-code:px-2 prose-code:py-1 prose-code:rounded max-w-none text-emerald-100">
          <div className="font-serif leading-relaxed">{content}</div>
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
