'use client';

import { ChatCircleIcon, XIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useDeleteChat } from '@/src/api/hooks';

type Chat = {
  id: string;
  title: string | null;
  updatedAt: string;
};

type Props = {
  chat: Chat;
  onClose: () => void;
};

export default function ChatItem({ chat, onClose }: Props) {
  const { deleteChat, isDeleting } = useDeleteChat(chat.id);
  const router = useRouter();

  const handleDeleteChat = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (confirm('Êtes-vous sûr de vouloir supprimer cette session?')) {
      await deleteChat();

      // If we're currently viewing this chat, redirect to home
      if (window.location.pathname === `/chat/${chat.id}`) {
        router.push('/');
      }
    }
  };

  return (
    <div className="group relative mb-2 flex w-full items-center rounded-lg border border-transparent transition-all duration-200 hover:border-emerald-600/30 hover:bg-emerald-600/10 hover:shadow-md hover:shadow-emerald-600/20 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/10 dark:hover:shadow-emerald-500/20">
      <Link
        href={`/chat/${chat.id}`}
        onClick={onClose}
        className="flex flex-1 items-center gap-3 p-3 pr-10 text-left"
      >
        <ChatCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {chat.title ?? 'Session sans titre'}
          </div>
          <div className="truncate text-xs text-emerald-600/60 dark:text-emerald-400/60">
            {new Date(chat.updatedAt).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </Link>
      <button
        onClick={handleDeleteChat}
        disabled={isDeleting}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 text-emerald-600/60 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-500 disabled:opacity-50 dark:text-emerald-400/60 dark:hover:text-red-400"
        title="Supprimer cette session"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
