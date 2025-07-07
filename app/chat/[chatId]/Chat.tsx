'use client';

import { createPatch } from 'diff';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ChatMessages from './ChatMessages';

import type { CreateMessageRequest } from '@/app/api/chats/[chatId]/messages/types';
import { PropsWithClassName } from '@/src/PropsWithClassName';
import { useChatMessages, useCreateMessage, useDeleteMessagesAfter } from '@/src/api/hooks';
import ChatArea from '@/src/components/ChatArea';
import { useProject } from '@/src/project';
import { TagHandlers, useStreamChat } from '@/src/useStreamChat';

type Props = PropsWithClassName<{
  chatId: string;
  title: string;
}>;

function createTagHandlers(
  createFile: (name: string, content: string) => Promise<void>,
  editFile: (name: string, content: string) => Promise<void>,
  setSuggestions: (suggestions: string[]) => void,
  getFileContent: (name: string) => string,
): TagHandlers {
  // Cache to store original file content before edits
  const originalContentCache = new Map<string, string>();

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
    Suggestions: {
      onOpen: () => '',
      onClose: () => ['', ''],
      onComplete: (content: string) => {
        // Parse suggestions from content - each line is a suggestion
        const suggestions = content
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        setSuggestions(suggestions);
      },
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
            const fileContent = content.slice(codeStartIndex + 7, codeEndIndex); // +6 for "```lua\n";
            createFile(name, fileContent);
          }
        }
      },
    },
    EditFile: {
      onOpen: (isComplete: boolean, attributes: Record<string, string>) => {
        const name = attributes.name;
        if (name !== undefined && !isComplete) {
          // Cache the original content before any modifications
          originalContentCache.set(name, getFileContent(name));
        }
        return '';
      },
      onClose: (content: string, attributes: Record<string, string>) => {
        const name = attributes.name;

        if (name !== undefined) {
          const codeStartIndex = content.indexOf('```lua');
          const codeEndIndex = content.lastIndexOf('```');

          if (
            codeStartIndex !== -1 &&
            codeEndIndex !== -1 &&
            codeEndIndex > codeStartIndex
          ) {
            const newContent = content.slice(codeStartIndex + 7, codeEndIndex); // +7 for "```lua\n"
            // Use cached original content if available, otherwise get current content
            const oldContent =
              originalContentCache.get(name) ?? getFileContent(name);

            // Generate diff for display
            const diff = createPatch(name, oldContent, newContent)
              .split('\n')
              .slice(5)
              .join('\n');

            // Return the diff content for display
            return [`\`\`\`diff\n${diff}\n\`\`\``, ''];
          }
        }

        return '';
      },
      onComplete: async (
        content: string,
        attributes: Record<string, string>,
      ) => {
        const name = attributes.name;
        if (name !== undefined) {
          const codeStartIndex = content.indexOf('```lua');
          const codeEndIndex = content.lastIndexOf('```');

          if (
            codeStartIndex !== -1 &&
            codeEndIndex !== -1 &&
            codeEndIndex > codeStartIndex
          ) {
            const newContent = content.slice(codeStartIndex + 7, codeEndIndex); // +7 for "```lua\n"
            // Apply the file change
            await editFile(name, newContent);
            // Clean up cache after edit is complete
            originalContentCache.delete(name);
          }
        }
      },
    },
  };
}

export default function Chat({ className, chatId, title }: Props) {
  const { createFile, editFile, project } = useProject();
  const { createMessage } = useCreateMessage(chatId);
  const { deleteMessagesAfter } = useDeleteMessagesAfter(chatId);
  const {
    messages: apiMessages,
    isLoading: messagesLoading,
    error: messagesError,
  } = useChatMessages(chatId);

  // State for storing suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Helper function to get file content
  const getFileContent = useCallback(
    (name: string) => {
      const file = project.files.find((f) => f.name === name);
      return file?.content ?? '';
    },
    [project.files],
  );

  const tagHandlers = useMemo(
    () =>
      createTagHandlers(createFile, editFile, setSuggestions, getFileContent),
    [createFile, editFile, getFileContent],
  );

  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    reload,
    stop,
    status,
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

        setMessages([...messages.slice(0, -1), message]);
      }
    },
  });

  // Handle resending a message
  const handleResend = useCallback(
    async (messageId: string) => {
      // Find the message index
      const messageIndex = messages.findIndex((m) => m.id === messageId);
      if (messageIndex === -1) return;

      // Delete messages after this one from the database
      await deleteMessagesAfter({ afterMessageId: messageId });

      // Update local state: keep messages up to and including the target message
      const truncatedMessages = messages.slice(0, messageIndex + 1);
      setMessages(truncatedMessages);

      // Clear input and suggestions
      setInput('');
      setSuggestions([]);

      // Restart the conversation from this point
      setTimeout(() => {
        reload();
      }, 100);
    },
    [messages, deleteMessagesAfter, setMessages, setInput, setSuggestions, reload],
  );

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  // Populate chat with messages once loaded from SWR
  useEffect(() => {
    if (!messagesLoading && apiMessages.length > 0 && messages.length === 0) {
      setMessages(
        apiMessages.map((msg) => ({
          ...msg,
          createdAt: new Date(msg.createdAt),
        })),
      );

      // Scroll to bottom after DOM has been updated with the messages
      setTimeout(() => {
        if (messagesRef.current !== null) {
          messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, 0);
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

    // Clear suggestions when submitting
    setSuggestions([]);

    // Continue with normal submit
    handleSubmit(e);
  };

  const messagesRef = useRef<HTMLDivElement>(null);
  const lastMessageHeight = useMemo(() => {
    return messagesRef.current?.lastElementChild?.clientHeight ?? 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  useEffect(() => {
    if (messagesRef.current !== null) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [lastMessageHeight]);

  // TODO: Add a loading state
  // TODO: Add a error state

  return (
    <div className={`flex h-full flex-col ${className}`}>
      {/* Terminal-style header */}
      <div className="terminal-window m-4 mb-2 flex-shrink-0 p-4">
        <div className="relative text-center">
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
          onResend={handleResend}
          ref={messagesRef}
        />
      </div>

      {/* Input area with integrated suggestions */}
      <div className="mx-4 mt-2 mb-4 flex-shrink-0">
        <ChatArea
          placeholder="💬 Demande ce que tu veux à Pixiole..."
          value={input}
          onChange={handleInputChange}
          onSubmit={handleChatSubmit}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
          isLoading={status !== 'ready' && status !== 'error'}
        />
      </div>
    </div>
  );
}
