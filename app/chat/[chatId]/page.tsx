'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Chat from './Chat';

import type { ReadChatResponse } from '@/app/api/chats/[chatId]/types';
import { ReadChatResponseSchema } from '@/app/api/chats/[chatId]/types';
import { validateAPIResponse } from '@/src/api/validation';

export default function ChatPage() {
  const params = useParams();
  const chatId = params.chatId as string;
  const [chatData, setChatData] = useState<ReadChatResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chatId === '') return;

    const fetchChat = async () => {
      try {
        const response = await fetch(`/api/chats/${chatId}`);
        const data = await validateAPIResponse(
          response,
          ReadChatResponseSchema,
        );
        setChatData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [chatId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading chat...</div>
      </div>
    );
  }

  if (typeof error === 'string' && error !== '') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (chatData === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Chat not found</div>
      </div>
    );
  }

  return <Chat chatId={chatId} initialMessages={chatData.messages} />;
}
