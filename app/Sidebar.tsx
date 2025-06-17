'use client';

import { ChatCircleIcon, PlusIcon, XIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

import { useChats } from '@/src/api/hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { chats, isLoading } = useChats();

  const handleNewChat = () => {
    router.push('/');
    onClose();
  };

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-80 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Conversations</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="border-b p-4">
            <button
              onClick={handleNewChat}
              className="flex w-full items-center gap-3 rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Nouvelle conversation</span>
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Chargement...</div>
            ) : chats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Aucune conversation
              </div>
            ) : (
              <div className="p-2">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatClick(chat.id)}
                    className="mb-2 flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-gray-50"
                  >
                    <ChatCircleIcon className="h-5 w-5 text-gray-400" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">
                        {chat.title ?? 'Sans titre'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(chat.updatedAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
