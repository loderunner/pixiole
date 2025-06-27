'use client';

import { useState } from 'react';

import ChatArea from '@/src/ChatArea';

type Props = {
  onSubmit: (msg: string) => void;
};

export default function Welcome({ onSubmit }: Props) {
  const [description, setDescription] = useState('');
  return (
    <div className="mx-auto mt-20 flex size-full max-w-4xl flex-col items-center gap-8 p-6">
      <div className="terminal-window w-full max-w-2xl p-8">
        <div className="mb-8 text-center">
          <div className="glow-text mb-2 text-2xl font-bold">
            {'>>> PIXIOLE TERMINAL v1.0 <<<'}
          </div>
          <div className="text-sm text-green-400 opacity-75">
            Système d&apos;apprentissage de programmation initialisé...
          </div>
        </div>

        <h1 className="terminal-text mb-6 text-center text-3xl leading-tight font-bold md:text-4xl">
          {'Salut, futur·e développeur·se! 🚀'}
          <br />
          <span className="text-2xl text-green-400 md:text-3xl">
            {"Qu'est-ce qu'on code aujourd'hui?"}
          </span>
        </h1>

        <div className="mb-8 space-y-2 text-center text-green-300">
          <div className="text-lg">
            ✨ Crée des jeux incroyables avec PICO-8
          </div>
          <div className="text-sm opacity-75">
            Décris ton idée et je t&apos;aide à la transformer en code!
          </div>
        </div>

        <ChatArea
          className="mt-6 w-full"
          placeholder="💡 Exemple: 'Un jeu où un petit robot collecte des cristaux magiques dans l'espace!' "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onSubmit={() => onSubmit(description)}
        />

        <div className="mt-6 text-center">
          <div className="inline-block bg-gradient-to-r from-green-400 to-green-600 bg-clip-text font-bold text-transparent">
            🎮 Prêt·e à devenir un·e pro du code? 🎮
          </div>
        </div>
      </div>
    </div>
  );
}
