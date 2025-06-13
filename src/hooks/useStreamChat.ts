import { useChat } from '@ai-sdk/react';
import { useMemo } from 'react';

export type TagHandler = {
  onOpen?: (isComplete: boolean) => string;
  onClose?: (content: string) => string;
};

export type TagHandlers = Record<string, TagHandler>;

function processStreamContent(
  content: string,
  tagHandlers: TagHandlers,
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

      const replacement = handler.onClose(innerContent);
      processedContent =
        processedContent.slice(0, endIndex) +
        replacement +
        processedContent.slice(endIndex + closeTag.length);
    }
  }

  return processedContent;
}

// Enhanced useChat options with tag processing
export type UseStreamChatOptions = Parameters<typeof useChat>[0] & {
  tagHandlers?: TagHandlers;
};

// Hook that enhances useChat with stream processing
export function useStreamChat(options: UseStreamChatOptions = {}) {
  const { tagHandlers, ...chatOptions } = options;

  const chat = useChat({
    ...chatOptions,
    onFinish: (message, finishOptions) => {
      // Process the final message content
      if (message.role === 'assistant' && tagHandlers !== undefined) {
        const processedContent = processStreamContent(
          message.content,
          tagHandlers,
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

  // Process messages in real-time during streaming
  const processedMessages = useMemo(() => {
    return chat.messages.map((message) => {
      if (message.role === 'assistant' && tagHandlers !== undefined) {
        const processedContent = processStreamContent(
          message.content,
          tagHandlers,
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
