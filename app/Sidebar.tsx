'use client';

import {
  MoonIcon,
  PlusIcon,
  SunIcon,
  XIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';

import ChatItem from './ChatItem';

import { useChats } from '@/src/api/hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
};

export default function Sidebar({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
}: Props) {
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
          <div className="flex items-center justify-between border-b border-emerald-600/50 bg-slate-100/50 p-4 dark:border-emerald-500/50 dark:bg-gray-900/50">
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
          <div className="border-b border-emerald-600/30 bg-slate-100/30 p-4 dark:border-emerald-500/30 dark:bg-gray-900/30">
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
          <div className="flex-1 overflow-y-auto bg-slate-100/20 dark:bg-gray-900/20">
            {isLoading ? (
              <div className="p-4 text-center text-emerald-600 dark:text-emerald-400">
                <div className="animate-pulse">Chargement des sessions...</div>
              </div>
            ) : chats.length === 0 ? (
              <div className="p-4 text-center text-emerald-700 dark:text-emerald-300/70">
                <div className="mb-2 text-4xl">🚀</div>
                <div>Aucune session</div>
                <div className="mt-2 text-sm opacity-60">
                  Commence ta première aventure de code!
                </div>
              </div>
            ) : (
              <div className="p-2">
                {chats.map((chat) => (
                  <ChatItem key={chat.id} chat={chat} onClose={onClose} />
                ))}
              </div>
            )}
          </div>

          {/* Footer with theme toggle */}
          <div className="border-t border-emerald-600/30 bg-slate-100/50 p-4 dark:border-emerald-500/30 dark:bg-gray-900/50">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 text-center text-xs text-emerald-600/60 dark:text-emerald-400/60">
                🎮 Powered by Pixiole AI 🎮
              </div>
              <button
                onClick={onToggleTheme}
                className="hamburger-button"
                aria-label="Basculer le thème"
                title={
                  isDark ? 'Passer en mode clair' : 'Passer en mode sombre'
                }
              >
                {isDark ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
