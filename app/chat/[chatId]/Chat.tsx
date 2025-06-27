'use client';

import throttle from 'lodash.throttle';
import { useEffect, useMemo, useRef } from 'react';

import ChatMessages from './ChatMessages';

import type { CreateMessageRequest } from '@/app/api/chats/[chatId]/messages/types';
import ChatArea from '@/src/ChatArea';
import { useChatMessages, useCreateMessage } from '@/src/api/hooks';
import { useProject } from '@/src/project';
import { TagHandlers, useStreamChat } from '@/src/useStreamChat';

type Props = {
  chatId: string;
  title: string;
};

const scrollToBottom = throttle((element: HTMLElement) => {
  element.scrollTo({
    top: element.scrollHeight,
    behavior: 'smooth',
  });
}, 500);

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
    experimental_throttle: 50,
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

  // Ref to track if we've already triggered auto-response
  const hasTriggeredAutoResponse = useRef(false);
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

  // Keep latest stop function ref for cleanup
  const stopRef = useRef(stop);
  useEffect(() => (stopRef.current = stop), [stop]);
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
      scrollToBottom(messagesRef.current);
    }
  }, []);

  // TODO: Add a loading state
  // TODO: Add a error state

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col">
      {/* Terminal-style header */}
      <div className="terminal-window m-4 mb-2 flex-shrink-0 p-4">
        <div className="text-center">
          <div className="mb-2 text-sm text-emerald-600 opacity-75 dark:text-green-400">
            {'>>> SESSION ACTIVE <<<'}
          </div>
          <h1 className="terminal-text glow-text text-xl font-bold md:text-2xl">
            🎮 {title} 🎮
          </h1>
          <div className="mt-2 text-sm text-emerald-700 opacity-60 dark:text-green-300">
            Avec Pixiole, ton assistant de programmation
          </div>
        </div>
      </div>

      {/* Messages area - takes remaining space and scrolls */}
      <div className="terminal-window mx-4 my-2 min-h-0 flex-1 overflow-hidden p-4">
        <ChatMessages
          className="h-full overflow-auto pr-2"
          messages={messages}
          ref={messagesRef}
        />
      </div>

      {/* Input area */}
      <div className="mx-4 mt-2 mb-4 flex-shrink-0">
        <ChatArea
          placeholder="💬 Demande ce que tu veux à Pixiole..."
          value={input}
          onChange={handleInputChange}
          onSubmit={handleChatSubmit}
        />
      </div>
    </div>
  );
}
