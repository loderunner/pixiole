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

import type { CreateMessageRequest } from '@/app/api/chats/[chatId]/messages/types';
import ChatArea from '@/src/ChatArea';
import { useChatMessages, useCreateMessage } from '@/src/api/hooks';
import { useProject } from '@/src/project';
import { rehypeDiffPlugin } from '@/src/rehype-diff-plugin';
import { TagHandlers, useStreamChat } from '@/src/useStreamChat';

type Props = {
  chatId: string;
  title: string;
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

export default function Chat({ chatId, title }: Props) {
  const { createFile, editFile } = useProject();
  const { createMessage } = useCreateMessage(chatId);
  const {
    messages: apiMessages,
    isLoading: messagesLoading,
    error: messagesError,
  } = useChatMessages(chatId);

  const tagHandlers = useMemo(
    () => createTagHandlers(createFile, editFile),
    [createFile, editFile],
  );

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    stop,
  } = useStreamChat({
    tagHandlers,
    onFinish: async (message) => {
      if (message.role === 'assistant') {
        const requestBody: CreateMessageRequest = {
          role: 'assistant',
          content: message.content,
        };

        await createMessage(requestBody);
      }
    },
  });

  // Ref to track if we've already triggered auto-response
  const hasTriggeredAutoResponse = useRef(false);

  // Keep latest stop function ref for cleanup
  const stopRef = useRef(stop);
  useEffect(() => (stopRef.current = stop), [stop]);

  // Populate chat with messages once loaded from SWR
  useEffect(() => {
    if (!messagesLoading && apiMessages.length > 0 && messages.length === 0) {
      setMessages(
        apiMessages.map((msg) => ({
          ...msg,
          createdAt: new Date(msg.createdAt),
        })),
      );
    }
  }, [messagesLoading, apiMessages, messages.length, setMessages]);

  useEffect(() => {
    if (
      hasTriggeredAutoResponse.current ||
      messagesLoading ||
      messagesError !== undefined ||
      messages.length === 0
    ) {
      return;
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'user') {
      hasTriggeredAutoResponse.current = true;
      reload();
    }
  }, [messagesLoading, messagesError, messages, reload]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRef.current();
    };
  }, []);

  // Custom submit handler to save user messages to database
  const handleChatSubmit = async (e: React.FormEvent) => {
    // Save user message to database
    if (input.trim() !== '') {
      const requestBody: CreateMessageRequest = {
        role: 'user',
        content: input,
      };

      await createMessage(requestBody);
    }

    // Continue with normal submit
    handleSubmit(e);
  };

  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesRef.current !== null) {
      scrollTo(messagesRef.current, {
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  // TODO: Add a loading state
  // TODO: Add a error state

  return (
    <div className="mx-auto flex size-full max-w-3xl flex-col items-stretch">
      <h1 className="py-6 text-center text-2xl font-bold">{title}</h1>
      <div className="min-h-0 grow overflow-auto" ref={messagesRef}>
        {messages.map((m) =>
          m.role === 'user' ? (
            <UserMessage key={m.id} message={m} />
          ) : (
            <AssistantMessage key={m.id} message={m} />
          ),
        )}
      </div>
      <div className="py-4">
        <ChatArea
          placeholder="Demande ce que tu veux à Pixiole"
          value={input}
          onChange={handleInputChange}
          onSubmit={handleChatSubmit}
        />
      </div>
    </div>
  );
}

const scrollTo = throttle((element: HTMLElement, options: ScrollToOptions) => {
  element.scrollTo(options);
}, 500);
