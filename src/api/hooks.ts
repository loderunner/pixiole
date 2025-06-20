import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

import { validateAPIResponse } from './validation';

import type {
  CreateMessageRequest,
  ListMessagesResponse,
} from '@/app/api/chats/[chatId]/messages/types';
import {
  CreateMessageResponseSchema,
  ListMessagesResponseSchema,
} from '@/app/api/chats/[chatId]/messages/types';
import type { ReadChatResponse } from '@/app/api/chats/[chatId]/types';
import { ReadChatResponseSchema } from '@/app/api/chats/[chatId]/types';
import type {
  CreateChatRequest,
  ListChatsResponse,
} from '@/app/api/chats/types';
import {
  CreateChatResponseSchema,
  ListChatsResponseSchema,
} from '@/app/api/chats/types';

/**
 * Custom fetcher function that validates API responses
 */
const fetcher = async <T>(url: string, schema: ZodSchema<T>): Promise<T> => {
  const response = await fetch(url);
  return validateAPIResponse(response, schema);
};

/**
 * Hook to fetch chat data using SWR (without messages)
 */
export function useChat(chatId: string) {
  const { data, error, isLoading } = useSWR(
    [`/api/chats/${chatId}`, ReadChatResponseSchema],
    ([url, schema]) => fetcher<ReadChatResponse>(url, schema),
  );

  return {
    chat: data,
    isLoading,
    error,
  };
}

/**
 * Hook to fetch messages for a chat using SWR
 */
export function useChatMessages(chatId: string) {
  const { data, error, isLoading } = useSWR(
    [`/api/chats/${chatId}/messages`, ListMessagesResponseSchema],
    ([url, schema]) => fetcher<ListMessagesResponse>(url, schema),
  );

  return {
    messages: data?.messages ?? [],
    isLoading,
    error,
  };
}

/**
 * Hook to create a new chat using SWR mutation
 */
export function useCreateChat() {
  const { trigger, isMutating, error } = useSWRMutation(
    '/api/chats',
    async (url: string, { arg }: { arg: CreateChatRequest }) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });

      return validateAPIResponse(response, CreateChatResponseSchema);
    },
    {
      onSuccess: () => {
        mutate(['/api/chats', ListChatsResponseSchema]);
      },
    },
  );

  return {
    createChat: trigger,
    isCreating: isMutating,
    error,
  };
}

/**
 * Hook to fetch all chats using SWR
 */
export function useChats() {
  const { data, error, isLoading } = useSWR(
    ['/api/chats', ListChatsResponseSchema],
    ([url, schema]) => fetcher<ListChatsResponse>(url, schema),
  );

  return {
    chats: data ?? [],
    isLoading,
    error,
  };
}

/**
 * Hook to create a new message using SWR mutation
 */
export function useCreateMessage(chatId: string) {
  const { trigger, isMutating, error } = useSWRMutation(
    `/api/chats/${chatId}/messages`,
    async (url: string, { arg }: { arg: CreateMessageRequest }) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });

      return validateAPIResponse(response, CreateMessageResponseSchema);
    },
    {
      onSuccess: () => {
        mutate([`/api/chats/${chatId}/messages`, ListMessagesResponseSchema]);
        mutate([`/api/chats/${chatId}`, ReadChatResponseSchema]);
      },
    },
  );

  return {
    createMessage: trigger,
    isCreating: isMutating,
    error,
  };
}
