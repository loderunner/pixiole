'use client';

import { Message } from '@ai-sdk/react';
import { StudentIcon } from '@phosphor-icons/react';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { transformerNotationDiff } from '@shikijs/transformers';
import throttle from 'lodash.throttle';
import { useEffect, useMemo, useRef } from 'react';
import { MarkdownHooks } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { createHighlighterCore, createOnigurumaEngine } from 'shiki';

import type { CreateMessageRequest } from '@/app/api/chats/[chatId]/messages/route';
import { CreateMessageResponseSchema } from '@/app/api/chats/[chatId]/messages/route';
import ChatArea from '@/src/ChatArea';
import { validateAPIResponse } from '@/src/api/validation';
import { useProject } from '@/src/project';
import { rehypeDiffPlugin } from '@/src/rehype-diff-plugin';
import { TagHandlers, useStreamChat } from '@/src/useStreamChat';

type Props = {
  chatId: string;
  initialMessages?: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
  }>;
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

function createTagHandlers(
  createFile: (name: string, content: string) => void,
  editFile: (name: string, content: string) => void,
): TagHandlers {
  return {
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
}

export default function Chat({ chatId, initialMessages }: Props) {
  const { createFile, editFile } = useProject();

  const tagHandlers = useMemo(
    () => createTagHandlers(createFile, editFile),
    [createFile, editFile],
  );

  const { messages, input, handleInputChange, handleSubmit, reload, stop } =
    useStreamChat({
      initialMessages: initialMessages?.map((msg) => ({
        ...msg,
        createdAt: new Date(msg.createdAt),
      })),
      tagHandlers,
      onFinish: async (message) => {
        // Save assistant message to database
        if (message.role === 'assistant') {
          try {
            const requestBody: CreateMessageRequest = {
              role: 'assistant',
              content: message.content,
            };

            const response = await fetch(`/api/chats/${chatId}/messages`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });

            await validateAPIResponse(response, CreateMessageResponseSchema);
          } catch (_error) {
            // TODO: Show error message to user
          }
        }
      },
    });

  // Custom submit handler to save user messages to database
  const handleChatSubmit = async (e: React.FormEvent) => {
    // Save user message to database
    if (input.trim() !== '') {
      try {
        const requestBody: CreateMessageRequest = {
          role: 'user',
          content: input,
        };

        const response = await fetch(`/api/chats/${chatId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        await validateAPIResponse(response, CreateMessageResponseSchema);
      } catch (_error) {
        // TODO: Show error message to user
      }
    }

    // Continue with normal submit
    handleSubmit(e);
  };

  useEffect(() => {
    // Auto-start generating response if there's only one user message
    if (initialMessages?.length === 1 && initialMessages[0].role === 'user') {
      reload();
    }
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
        onSubmit={handleChatSubmit}
      />
    </div>
  );
}

const scrollTo = throttle((element: HTMLElement, options: ScrollToOptions) => {
  element.scrollTo(options);
}, 500);
