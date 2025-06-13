import { useChat } from '@ai-sdk/react';
import { useMemo } from 'react';

/**
 * Handler for processing custom tags in stream content
 */
export type TagHandler = {
  /**
   * Called when an opening tag is encountered
   * @param isComplete - Whether the tag has a matching closing tag
   * @returns String to replace the opening tag with
   */
  onOpen?: (isComplete: boolean) => string | null;

  /**
   * Called when a closing tag is encountered
   * @param content - The content between the opening and closing tags
   * @returns Either a string to replace the closing tag with, or a tuple of [content replacement, closing tag replacement]
   */
  onClose?: (content: string) => string | [string, string] | null;

  /**
   * Called when stream processing is complete
   * @param content - The final content between the opening and closing tags
   */
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
      if (replacement !== null) {
        processedContent =
          processedContent.slice(0, startIndex) +
          replacement +
          processedContent.slice(startIndex + openTag.length);
        startIndex += replacement.length;
        endIndex += replacement.length - openTag.length;
      }
    }

    if (isComplete && handler.onClose !== undefined) {
      const innerContent = processedContent.slice(startIndex, endIndex);

      // Call onComplete callback if we're in the finish context
      if (onFinish && handler.onComplete !== undefined) {
        handler.onComplete(innerContent);
      }

      const replacement = handler.onClose(innerContent);
      if (Array.isArray(replacement)) {
        // Replace the tag content and closing tag with the handler's
        // replacement texts.
        // The first element is the replacement for the tag content,
        // the second element is the replacement for the closing tag.
        processedContent =
          processedContent.slice(0, startIndex) +
          replacement[0] +
          replacement[1] +
          processedContent.slice(endIndex + closeTag.length);
      } else if (replacement !== null) {
        // Replace the closing tag with the handler's replacement text
        processedContent =
          processedContent.slice(0, endIndex) +
          replacement +
          processedContent.slice(endIndex + closeTag.length);
      }
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
        processStreamContent(message.content, tagHandlers, true);
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
