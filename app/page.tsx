'use client';

import { useRouter } from 'next/navigation';

import Welcome from './Welcome';
import type { CreateChatRequest } from './api/chats/types';

import { useCreateChat } from '@/src/api/hooks';

export default function Page() {
  const router = useRouter();
  const { createChat } = useCreateChat();

  const handleSubmit = async (message: string) => {
    const requestBody: CreateChatRequest = {
      initialMessage: message,
    };

    const chat = await createChat(requestBody);

    router.push(`/chat/${chat.id}`);
  };

  // TODO: Add a loading state
  // TODO: Add a error state

  return <Welcome onSubmit={handleSubmit} />;
}
