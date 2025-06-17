'use client';

import { useParams } from 'next/navigation';

import Chat from './Chat';

import { useChat } from '@/src/api/hooks';

export default function ChatPage() {
  const params = useParams();
  const chatId = params.chatId as string;
  const { chat, isLoading, error } = useChat(chatId);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading chat...</div>
      </div>
    );
  }

  if (error !== undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-red-600">
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  if (chat === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Chat not found</div>
      </div>
    );
  }

  return <Chat chatId={chatId} />;
}
