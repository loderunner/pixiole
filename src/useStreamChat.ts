import { UseChatOptions, useChat } from '@ai-sdk/react';
import { useCallback, useMemo } from 'react';

/**
 * Handler for processing custom tags in stream content
 */
export type TagHandler = {
  /**
   * Called when an opening tag is encountered
   * @param isComplete - Whether the tag has a matching closing tag
   * @param attributes - Parsed attributes from the opening tag
   * @returns String to replace the opening tag with
   */
  onOpen?: (
    isComplete: boolean,
    attributes: Record<string, string>,
  ) => string | null;

  /**
   * Called when a closing tag is encountered
   * @param content - The content between the opening and closing tags
   * @param attributes - Parsed attributes from the opening tag
   * @returns Either a string to replace the closing tag with, or a tuple of [content replacement, closing tag replacement]
   */
  onClose?: (
    content: string,
    attributes: Record<string, string>,
  ) => string | [string, string] | null;

  /**
   * Called when stream processing is complete
   * @param content - The final content between the opening and closing tags
   * @param attributes - Parsed attributes from the opening tag
   */
  onComplete?: (content: string, attributes: Record<string, string>) => void;
};

export type TagHandlers = Record<string, TagHandler>;

function parseTagAttributes(tagText: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  tagText = tagText.slice(1, -1);
  const attributeRegex = /(\w+)="([^"]*)"/g;

  // Loop through all attribute pairs using RegExp.exec() which returns next
  // match each time
  let match: RegExpExecArray | null;
  while ((match = attributeRegex.exec(tagText)) !== null) {
    attributes[match[1]] = match[2];
  }

  return attributes;
}

function processStreamContent(
  content: string,
  tagHandlers: TagHandlers,
  onFinish: boolean,
): string {
  let processedContent = content;

  for (const [tagName, handler] of Object.entries(tagHandlers)) {
    // Use regex to find opening tags with possible attributes
    const openTagRegex = new RegExp(`<${tagName}(?:\\s[^>]*)?>`);
    const closeTag = `</${tagName}>`;

    const openTagMatch = processedContent.match(openTagRegex);
    if (openTagMatch === null || openTagMatch.index === undefined) {
      continue;
    }

    let startIndex = openTagMatch.index;
    const openTagFullText = openTagMatch[0];
    const openTagLength = openTagFullText.length;
    const attributes = parseTagAttributes(openTagFullText);

    let endIndex = processedContent.indexOf(
      closeTag,
      startIndex + openTagLength,
    );
    const isComplete = endIndex !== -1;

    // Handle opening tag
    if (handler.onOpen !== undefined) {
      const replacement = handler.onOpen(isComplete, attributes);
      if (replacement !== null) {
        processedContent =
          processedContent.slice(0, startIndex) +
          replacement +
          processedContent.slice(startIndex + openTagLength);

        startIndex += replacement.length;
        endIndex += replacement.length - openTagLength;
      }
    }

    if (isComplete && handler.onClose !== undefined) {
      const innerContent = processedContent.slice(startIndex, endIndex);

      // Call onComplete callback if we're in the finish context
      if (onFinish && handler.onComplete !== undefined) {
        handler.onComplete(innerContent, attributes);
      }

      const replacement = handler.onClose(innerContent, attributes);
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
  const { tagHandlers, onFinish: onFinishOption, ...chatOptions } = options;

  const onFinish = useCallback<NonNullable<UseChatOptions['onFinish']>>(
    (message, finishOptions) => {
      if (message.role === 'assistant' && tagHandlers !== undefined) {
        processStreamContent(message.content, tagHandlers, true);
      }

      // Call original onFinish if provided
      onFinishOption?.(message, finishOptions);
    },
    [onFinishOption, tagHandlers],
  );

  const chat = useChat({
    ...chatOptions,
    onFinish,
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
