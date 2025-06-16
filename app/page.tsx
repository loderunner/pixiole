'use client';

import { useRouter } from 'next/navigation';

import Welcome from './Welcome';
import type { CreateChatRequest } from './api/chats/route';
import { ChatResponseSchema } from './api/chats/route';

import { validateAPIResponse } from '@/src/api/validation';

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (message: string) => {
    try {
      // Create a new chat with initial message
      const requestBody: CreateChatRequest = {
        initialMessage: message,
      };

      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const chat = await validateAPIResponse(response, ChatResponseSchema);

      // Navigate to the chat page (no need for query params)
      router.push(`/chat/${chat.id}`);
    } catch (_error) {
      // TODO: Show error message to user
    }
  };

  return <Welcome onSubmit={handleSubmit} />;
}
