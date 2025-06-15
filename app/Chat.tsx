'use client';

import { Message } from '@ai-sdk/react';
import { StudentIcon } from '@phosphor-icons/react';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { transformerNotationDiff } from '@shikijs/transformers';
import { generateId } from 'ai';
import throttle from 'lodash.throttle';
import { useEffect, useRef } from 'react';
import { MarkdownHooks } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { createHighlighterCore, createOnigurumaEngine } from 'shiki';

import ChatArea from '@/src/ChatArea';
import { useProject } from '@/src/project';
import { rehypeDiffPlugin } from '@/src/rehype-diff-plugin';
import { TagHandlers, useStreamChat } from '@/src/useStreamChat';

type Props = {
  initialMessage: string;
};

function UserMessage({ message }: { message: Message }) {
  return (
    <div
      key={message.id}
      className="flex flex-row items-start gap-2 rounded-md bg-gray-200 p-4"
    >
      <div className="rounded-full bg-gray-800 p-2 text-white">
        <StudentIcon className="text-2xl" />
      </div>
      <div className="py-2">{message.content}</div>
    </div>
  );
}

const highlighter = await createHighlighterCore({
  themes: [import('@shikijs/themes/nord')],
  langs: [import('@shikijs/langs/lua')],
  engine: createOnigurumaEngine(() => import('shiki/wasm')),
});

function AssistantMessage({ message }: { message: Message }) {
  return (
    <div
      key={message.id}
      className="prose tutorial prose-li:my-0 max-w-none p-2"
    >
      <div className="font-serif">
        <MarkdownHooks
          rehypePlugins={[
            [rehypeRaw],
            [rehypeDiffPlugin],
            [
              rehypeShikiFromHighlighter,
              highlighter,
              { theme: 'nord', transformers: [transformerNotationDiff()] },
            ],
          ]}
        >
          {message.content}
        </MarkdownHooks>
      </div>
    </div>
  );
}

const initialMessageId = generateId();

export default function Chat({ initialMessage }: Props) {
  const { createFile, editFile } = useProject();

  const tagHandlers: TagHandlers = {
    Thinking: {
      onOpen: (isComplete: boolean) => {
        const thinkingText = isComplete
          ? 'Voir ma réflexion'
          : 'Je réfléchis...';
        const className = isComplete ? '' : ' class="animate-pulse"';
        return `<details><summary${className}>${thinkingText}</summary>`;
      },
      onClose: () => '</details>',
    },
    LessonPlan: {
      onOpen: () => '',
      onClose: () => '',
    },
    CreateFile: {
      onOpen: () => '',
      onClose: () => '',
      onComplete: (content: string, attributes: Record<string, string>) => {
        const name = attributes.name;

        if (name !== undefined) {
          const codeStartIndex = content.indexOf('```lua');
          const codeEndIndex = content.lastIndexOf('```');

          if (
            codeStartIndex !== -1 &&
            codeEndIndex !== -1 &&
            codeEndIndex > codeStartIndex
          ) {
            const fileContent = content.slice(codeStartIndex + 6, codeEndIndex); // +6 for "```lua\n";
            createFile(name, fileContent);
          }
        }
      },
    },
    EditFile: {
      onOpen: () => '',
      onClose: () => '',
      onComplete: (content: string, attributes: Record<string, string>) => {
        const name = attributes.name;

        if (name !== undefined) {
          const diffStartIndex = content.indexOf('```diff');
          const diffEndIndex = content.lastIndexOf('```');

          if (
            diffStartIndex !== -1 &&
            diffEndIndex !== -1 &&
            diffEndIndex > diffStartIndex
          ) {
            const diffContent = content.slice(diffStartIndex + 7, diffEndIndex); // +7 for "```diff\n"
            editFile(name, diffContent);
          }
        }
      },
    },
  };

  const { messages, input, handleInputChange, handleSubmit, reload, stop } =
    useStreamChat({
      initialMessages: [
        { id: initialMessageId, content: initialMessage, role: 'user' },
      ],
      tagHandlers,
    });

  useEffect(() => {
    reload();
    return stop;
  }, []);

  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesRef.current !== null) {
      scrollTo(messagesRef.current, {
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="mx-auto flex size-full max-w-3xl flex-col items-stretch py-8">
      <div
        className="min-h-0 grow overflow-auto not-last:mb-6"
        ref={messagesRef}
      >
        {messages.map((m) =>
          m.role === 'user' ? (
            <UserMessage key={m.id} message={m} />
          ) : (
            <AssistantMessage key={m.id} message={m} />
          ),
        )}
      </div>
      <ChatArea
        placeholder="Demande ce que tu veux à Pixiole"
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

const scrollTo = throttle((element: HTMLElement, options: ScrollToOptions) => {
  element.scrollTo(options);
}, 500);
