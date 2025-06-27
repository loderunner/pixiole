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
        <div className="terminal-window p-8 text-center">
          <div className="glow-text mb-4 text-2xl">
            {'>>> CHARGEMENT EN COURS <<<'}
          </div>
          <div className="animate-pulse text-green-400">
            Initialisation de la session...
          </div>
          <div className="mt-2 text-sm text-green-300 opacity-60">
            🚀 Prépare-toi à coder!
          </div>
        </div>
      </div>
    );
  }

  if (error !== undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="terminal-window border-red-500 p-8 text-center">
          <div className="glow-text mb-4 text-2xl text-red-400">
            {'>>> ERREUR SYSTÈME <<<'}
          </div>
          <div className="mb-4 text-red-300">
            Erreur: {error instanceof Error ? error.message : 'Erreur inconnue'}
          </div>
          <div className="text-sm text-red-200 opacity-60">
            💥 Oups! Quelque chose a mal tourné...
          </div>
        </div>
      </div>
    );
  }

  if (chat === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="terminal-window border-yellow-500 p-8 text-center">
          <div className="glow-text mb-4 text-2xl text-yellow-400">
            {'>>> SESSION INTROUVABLE <<<'}
          </div>
          <div className="mb-4 text-yellow-300">
            Cette session n&apos;existe pas ou a été supprimée
          </div>
          <div className="text-sm text-yellow-200 opacity-60">
            🔍 Retourne à l&apos;accueil pour créer une nouvelle session!
          </div>
        </div>
      </div>
    );
  }

  return <Chat chatId={chatId} title={chat.title} />;
}
