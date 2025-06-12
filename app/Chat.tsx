'use client';

import { Message, useChat } from '@ai-sdk/react';
import { StudentIcon } from '@phosphor-icons/react';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { generateId } from 'ai';
import throttle from 'lodash.throttle';
import { useEffect, useMemo, useRef } from 'react';
import { MarkdownHooks } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { createHighlighterCore, createOnigurumaEngine } from 'shiki';

import ChatArea from '@/src/components/ChatArea';

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
  langs: [import('@shikijs/langs/lua'), import('@shikijs/langs/diff')],
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
            [rehypeShikiFromHighlighter, highlighter, { theme: 'nord' }],
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
  const {
    messages: rawMessages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    stop,
  } = useChat({
    initialMessages: [
      { id: initialMessageId, content: initialMessage, role: 'user' },
    ],
  });
  const { messages } = useMemo(() => parseMessages(rawMessages), [rawMessages]);

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
  }, [rawMessages]);

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

function parseMessages(rawMessages: Message[]) {
  const messages: Message[] = [];
  let lessonPlan: List = [];
  for (const msg of rawMessages) {
    if (msg.role !== 'assistant') {
      messages.push(msg);
      continue;
    }

    let content = msg.content;
    let idx = content.indexOf('<Thinking>');
    if (idx !== -1) {
      idx = content.indexOf('</Thinking>');
      const thinkingText = idx === -1 ? 'Je réfléchis...' : 'Voir ma réflexion';
      const className = idx === -1 ? ' class="animate-pulse"' : '';
      content = content.replace(
        '<Thinking>',
        `<details><summary${className}>${thinkingText}</summary>`,
      );
      if (idx !== -1) {
        content = content.replace('</Thinking>', '</details>');
      } else {
        content += '</details>';
      }
    }

    const lessonStart = content.indexOf('<LessonPlan>');
    const lessonEnd = content.indexOf('</LessonPlan>');
    if (lessonStart !== -1 && lessonEnd !== -1) {
      const list = content
        .slice(lessonStart + '<LessonPlan>'.length, lessonEnd)
        .trim()
        .split('\n');

      lessonPlan = parseMarkdownNumberedList(list);

      // content =
      //   content.slice(0, lessonStart) +
      //   list.map(linkify).join('\n') +
      //   content.slice(lessonEnd + '</LessonPlan>'.length);
      content = content
        .replace('<LessonPlan>', '')
        .replace('</LessonPlan>', '');
    } else {
      content = content.replace('<LessonPlan>', '');
    }

    messages.push({
      ...msg,
      content,
    });
  }
  return { messages, lessonPlan };
}

type List = (string | [string, List])[];

function parseMarkdownNumberedList(lines: string[], depth = 0): List {
  const result: List = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^( *)\d+\.\s+(.+)$/);

    if (match === null) {
      i++;
      continue;
    }

    const [, indentation, content] = match;
    const currentDepth = indentation.length;

    if (currentDepth < depth) {
      // We've returned to a higher level, stop processing at this depth
      break;
    } else if (currentDepth === depth) {
      // Look ahead for children
      let nextIndex = i + 1;
      let childDepth = -1;

      // Find the next deeper level, if any
      while (nextIndex < lines.length) {
        const nextLine = lines[nextIndex];
        const nextMatch = nextLine.match(/^( *)(\d+)\.\s+(.+)$/);

        if (nextMatch === null) {
          nextIndex++;
          continue;
        }

        const nextIndent = nextMatch[1].length;

        if (nextIndent > currentDepth) {
          childDepth = nextIndent;
          break;
        } else if (nextIndent <= currentDepth) {
          // This is a sibling or higher-level item
          break;
        }

        nextIndex++;
      }

      // If we found children, parse them recursively
      if (childDepth !== -1) {
        const sublist = parseMarkdownNumberedList(
          lines.slice(nextIndex),
          childDepth,
        );

        // Add the sublist to our result
        if (sublist.length > 0) {
          result.push([content, sublist]);
        } else {
          result.push(content);
        }
      } else {
        result.push(content);
      }

      i++;
    } else {
      // This line is at a deeper level than we're currently processing
      i++;
    }
  }

  return result;
}
