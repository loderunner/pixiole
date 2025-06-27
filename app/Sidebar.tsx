'use client';

import { ChatCircleIcon, PlusIcon, XIcon } from '@phosphor-icons/react';
import Link from 'next/link';

import { useChats } from '@/src/api/hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props) {
  const { chats, isLoading } = useChats();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`terminal-sidebar fixed top-0 left-0 z-50 h-full w-80 transform shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-emerald-500/50 bg-gray-900/50 p-4">
            <h2 className="terminal-text glow-text text-lg font-bold">
              PIXIOLE SESSIONS
            </h2>
            <button
              onClick={onClose}
              className="terminal-button rounded-full p-2"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="border-b border-emerald-500/30 bg-gray-900/30 p-4">
            <Link
              href="/"
              onClick={onClose}
              className="terminal-button flex w-full items-center gap-3 px-4 py-3"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Nouvelle session</span>
            </Link>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto bg-gray-900/20">
            {isLoading ? (
              <div className="p-4 text-center text-emerald-400">
                <div className="animate-pulse">Chargement des sessions...</div>
              </div>
            ) : chats.length === 0 ? (
              <div className="p-4 text-center text-emerald-300/70">
                <div className="mb-2 text-4xl">🚀</div>
                <div>Aucune session</div>
                <div className="mt-2 text-sm opacity-60">
                  Commence ta première aventure de code!
                </div>
              </div>
            ) : (
              <div className="p-2">
                {chats.map((chat) => (
                  <Link
                    key={chat.id}
                    href={`/chat/${chat.id}`}
                    onClick={onClose}
                    className="mb-2 flex w-full items-center gap-3 rounded-lg border border-transparent p-3 text-left transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:shadow-md hover:shadow-emerald-500/20"
                  >
                    <ChatCircleIcon className="h-5 w-5 text-emerald-400" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-emerald-300">
                        {chat.title ?? 'Session sans titre'}
                      </div>
                      <div className="text-xs text-emerald-400/60">
                        {new Date(chat.updatedAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-emerald-500/30 bg-gray-900/50 p-4">
            <div className="text-center text-xs text-emerald-400/60">
              🎮 Powered by Pixiole AI 🎮
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
