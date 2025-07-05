import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import type { ZodSchema } from 'zod';

import { validateAPIResponse } from './validation';

import {
  UpdateFileRequest,
  UpdateFileResponseSchema,
} from '@/app/api/chats/[chatId]/files/[filename]/types';
import type {
  CreateFileRequest,
  File,
  ListFilesResponse,
} from '@/app/api/chats/[chatId]/files/types';
import {
  CreateFileResponseSchema,
  FileSchema,
  ListFilesResponseSchema,
} from '@/app/api/chats/[chatId]/files/types';
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
  const { data, error, isLoading } = useSWR(`/api/chats/${chatId}`, (url) =>
    fetcher<ReadChatResponse>(url, ReadChatResponseSchema),
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
    `/api/chats/${chatId}/messages`,
    (url) => fetcher<ListMessagesResponse>(url, ListMessagesResponseSchema),
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
  const { mutate } = useSWRConfig();
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
        mutate('/api/chats');
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
 * Hook to delete a chat using SWR mutation
 */
export function useDeleteChat() {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating, error } = useSWRMutation(
    '/api/chats/delete',
    async (_url: string, { arg }: { arg: { chatId: string } }) => {
      const response = await fetch(`/api/chats/${arg.chatId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }

      return response.json();
    },
    {
      onSuccess: () => {
        mutate('/api/chats');
      },
    },
  );

  return {
    deleteChat: trigger,
    isDeleting: isMutating,
    error,
  };
}

/**
 * Hook to fetch all chats using SWR
 */
export function useChats() {
  const { data, error, isLoading } = useSWR('/api/chats', (url) =>
    fetcher<ListChatsResponse>(url, ListChatsResponseSchema),
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
  const { mutate } = useSWRConfig();
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
        mutate(`/api/chats/${chatId}/messages`);
        mutate(`/api/chats/${chatId}`);
      },
    },
  );

  return {
    createMessage: trigger,
    isCreating: isMutating,
    error,
  };
}

/**
 * Hook to fetch files for a chat using SWR
 */
export function useChatFiles(chatId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/chats/${chatId}/files`,
    (url) => fetcher<ListFilesResponse>(url, ListFilesResponseSchema),
  );

  return {
    files: data?.files ?? [],
    isLoading,
    error,
  };
}

/**
 * Hook to create a new file using SWR mutation
 */
export function useCreateFile(chatId: string) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating, error } = useSWRMutation(
    `/api/chats/${chatId}/files`,
    async (url: string, { arg }: { arg: CreateFileRequest }) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });

      return validateAPIResponse(response, CreateFileResponseSchema);
    },
    {
      onSuccess: () => {
        mutate(`/api/chats/${chatId}/files`);
        mutate(`/api/chats/${chatId}`);
      },
    },
  );

  return {
    createFile: trigger,
    isCreating: isMutating,
    error,
  };
}

/**
 * Hook to get a specific file using SWR
 */
export function useChatFile(
  chatId: string,
  fileName: string,
  initialData?: File,
) {
  const { data, error, isLoading, mutate } = useSWR(
    fileName !== ''
      ? `/api/chats/${chatId}/files/${encodeURIComponent(fileName)}`
      : null,
    (url) => fetcher<File>(url, FileSchema),
    {
      fallbackData: initialData,
    },
  );

  return {
    file: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * Hook to update a file using SWR mutation
 */
export function useUpdateChatFile(chatId: string, fileName: string) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating, error } = useSWRMutation(
    fileName !== ''
      ? `/api/chats/${chatId}/files/${encodeURIComponent(fileName)}`
      : null,
    async (url: string, { arg }: { arg: UpdateFileRequest }) => {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });

      return validateAPIResponse(response, UpdateFileResponseSchema);
    },
    {
      onSuccess: () => {
        // Invalidate the specific file cache
        mutate(`/api/chats/${chatId}/files/${encodeURIComponent(fileName)}`);
        // Invalidate the files list
        mutate(`/api/chats/${chatId}/files`);
        // Update chat timestamp
        mutate(`/api/chats/${chatId}`);
      },
    },
  );

  return {
    updateFile: trigger,
    isUpdating: isMutating,
    error,
  };
}

export function useFileUpdater(chatId: string) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating, error } = useSWRMutation(
    `/api/chats/${chatId}/files/...`,
    async (
      _url: string,
      {
        arg: { fileName, content },
      }: { arg: { fileName: string; content: string } },
    ) => {
      const response = await fetch(
        `/api/chats/${chatId}/files/${encodeURIComponent(fileName)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: content }),
        },
      );

      return validateAPIResponse(response, UpdateFileResponseSchema);
    },
    {
      onSuccess: (data) => {
        // Invalidate the specific file cache
        mutate(`/api/chats/${chatId}/files/${encodeURIComponent(data.name)}`);
        // Invalidate the files list
        mutate(`/api/chats/${chatId}/files`);
        // Update chat timestamp
        mutate(`/api/chats/${chatId}`);
      },
    },
  );

  return {
    updateFile: trigger,
    isUpdating: isMutating,
    error,
  };
}
