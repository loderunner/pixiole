'use client';

import { FolderIcon } from '@phosphor-icons/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import Chat from './Chat';
import FilesPanel from './FilesPanel';

import { useChat } from '@/src/api/hooks';
import { ProjectProvider } from '@/src/project';

export default function ChatPage() {
  const params = useParams();
  const chatId = params.chatId as string;
  const { chat, isLoading, error } = useChat(chatId);

  // State for files panel
  const [isFilesPanelOpen, setIsFilesPanelOpen] = useState(false);

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

  return (
    <ProjectProvider chatId={chatId}>
      {/* Files button - positioned like hamburger menu */}
      {!isFilesPanelOpen && (
        <button
          onClick={() => setIsFilesPanelOpen(!isFilesPanelOpen)}
          className="hamburger-button fixed top-4 right-4 z-20 rounded-full p-2"
          title="Afficher le panneau de fichiers"
        >
          <FolderIcon className="h-5 w-5" />
        </button>
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Main chat area */}
        <Chat
          className={`mx-auto flex-1 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl ${isFilesPanelOpen ? 'pl-16' : 'px-16'}`}
          chatId={chatId}
          title={chat.title}
        />

        {/* Files Panel Container */}
        {isFilesPanelOpen && (
          <div className="fixed top-0 right-0 z-20 h-full w-full lg:relative lg:w-120">
            <FilesPanel
              chatId={chatId}
              onClose={() => setIsFilesPanelOpen(false)}
            />
          </div>
        )}

        {/* Mobile backdrop */}
        {isFilesPanelOpen && (
          <div
            className="bg-opacity-50 fixed inset-0 z-30 bg-black lg:hidden"
            onClick={() => setIsFilesPanelOpen(false)}
          />
        )}
      </div>
    </ProjectProvider>
  );
}
