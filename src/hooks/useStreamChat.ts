import { useChat } from '@ai-sdk/react';
import { useMemo } from 'react';

export type TagHandler = {
  onOpen?: (isComplete: boolean) => string;
  onClose?: (content: string) => string;
  onComplete?: (content: string) => void;
};

export type TagHandlers = Record<string, TagHandler>;

function processStreamContent(
  content: string,
  tagHandlers: TagHandlers,
  onFinish: boolean,
): string {
  let processedContent = content;

  for (const [tagName, handler] of Object.entries(tagHandlers)) {
    const openTag = `<${tagName}>`;
    const closeTag = `</${tagName}>`;

    let startIndex = processedContent.indexOf(openTag);
    if (startIndex === -1) {
      continue;
    }

    let endIndex = processedContent.indexOf(closeTag);
    const isComplete = endIndex !== -1;

    // Handle opening tag
    if (handler.onOpen !== undefined) {
      const replacement = handler.onOpen(isComplete);
      processedContent =
        processedContent.slice(0, startIndex) +
        replacement +
        processedContent.slice(startIndex + openTag.length);
      startIndex += replacement.length - openTag.length;
    }

    if (isComplete && handler.onClose !== undefined) {
      endIndex += processedContent.length - content.length;
      const innerContent = processedContent.slice(startIndex, endIndex);

      // Call onComplete callback if we're in the finish context
      if (onFinish && handler.onComplete !== undefined) {
        handler.onComplete(innerContent);
      }

      const replacement = handler.onClose(innerContent);
      processedContent =
        processedContent.slice(0, endIndex) +
        replacement +
        processedContent.slice(endIndex + closeTag.length);
    }
  }

  return processedContent;
}

export type UseStreamChatOptions = Parameters<typeof useChat>[0] & {
  tagHandlers?: TagHandlers;
};

export function useStreamChat(options: UseStreamChatOptions = {}) {
  const { tagHandlers, ...chatOptions } = options;

  const chat = useChat({
    ...chatOptions,
    onFinish: (message, finishOptions) => {
      if (message.role === 'assistant' && tagHandlers !== undefined) {
        const processedContent = processStreamContent(
          message.content,
          tagHandlers,
          true,
        );

        if (processedContent !== message.content) {
          // Update the message with processed content
          chat.setMessages((messages) =>
            messages.map((m) =>
              m.id === message.id ? { ...m, content: processedContent } : m,
            ),
          );
        }
      }

      // Call original onFinish if provided
      chatOptions.onFinish?.(message, finishOptions);
    },
  });

  const processedMessages = useMemo(() => {
    return chat.messages.map((message) => {
      if (message.role === 'assistant' && tagHandlers !== undefined) {
        const processedContent = processStreamContent(
          message.content,
          tagHandlers,
          false,
        );
        return { ...message, content: processedContent };
      }
      return message;
    });
  }, [chat.messages, tagHandlers]);

  return {
    ...chat,
    messages: processedMessages,
  };
}
