'use client';

import { useEffect, useState } from 'react';

import ChatArea from '@/src/components/ChatArea';
import { getRandomGameIdeas, type GameIdea } from '@/src/gameIdeas';

type Props = {
  onSubmit: (msg: string) => void;
  isLoading: boolean;
};

export default function Welcome({ onSubmit, isLoading }: Props) {
  const [description, setDescription] = useState('');
  const [randomIdeas, setRandomIdeas] = useState<GameIdea[]>([]);

  // Generate 3 random game ideas on component mount
  useEffect(() => {
    setRandomIdeas(getRandomGameIdeas(3));
  }, []);

  const handleIdeaClick = (idea: GameIdea) => {
    setDescription(idea.long);
  };

  const generateNewIdeas = () => {
    setRandomIdeas(getRandomGameIdeas(3));
  };

  return (
    <div className="mx-auto mt-20 flex max-w-4xl flex-col items-center gap-8 p-6">
      <div className="terminal-window w-full max-w-2xl p-8">
        <div className="mb-8 text-center">
          <div className="glow-text mb-2 text-2xl font-bold">
            {'>>> PIXIOLE TERMINAL v1.0 <<<'}
          </div>
          <div className="text-sm text-emerald-600 opacity-75 dark:text-green-400">
            Système d&apos;apprentissage de programmation initialisé...
          </div>
        </div>

        <h1 className="terminal-text mb-6 text-center text-3xl leading-tight font-bold md:text-4xl">
          {'Salut, futur·e développeur·se! 🚀'}
          <br />
          <span className="text-2xl text-emerald-600 md:text-3xl dark:text-green-400">
            {"Qu'est-ce qu'on code aujourd'hui?"}
          </span>
        </h1>

        <div className="mb-8 space-y-2 text-center text-emerald-700 dark:text-green-300">
          <div className="text-lg">
            ✨ Crée des jeux incroyables avec PICO-8
          </div>
          <div className="text-sm opacity-75">
            Décris ton idée et je t&apos;aide à la transformer en code!
          </div>
        </div>

        <ChatArea
          className="mt-6 w-full"
          placeholder="💡 Décris ta prochaine idée de jeu..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onSubmit={() => onSubmit(description)}
          isLoading={isLoading}
        />

        {/* Random game idea suggestions */}
        {randomIdeas.length > 0 && !isLoading && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-emerald-600 dark:text-green-400">
                💡 Ou choisis une de ces idées:
              </div>
              <button
                onClick={generateNewIdeas}
                className="flex items-center gap-1 rounded-md border border-emerald-600/40 bg-emerald-600/15 px-3 py-1 text-xs text-emerald-700 transition-all hover:border-emerald-600/60 hover:bg-emerald-600/25 dark:border-green-400/40 dark:bg-green-400/15 dark:text-green-300 dark:hover:border-green-400/60 dark:hover:bg-green-400/25"
              >
                🎲 Nouvelles idées
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {randomIdeas.map((idea, index) => (
                <button
                  key={index}
                  onClick={() => handleIdeaClick(idea)}
                  className="rounded-lg border border-emerald-600/30 bg-emerald-600/10 px-4 py-2 text-sm text-emerald-700 transition-all hover:border-emerald-600/50 hover:bg-emerald-600/20 dark:border-green-400/30 dark:bg-green-400/10 dark:text-green-300 dark:hover:border-green-400/50 dark:hover:bg-green-400/20"
                >
                  🎮 {idea.short}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-600/40 bg-emerald-600/15 px-4 py-2 text-emerald-700 dark:border-green-400/40 dark:bg-green-400/15 dark:text-green-300">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600/20 border-t-emerald-600 dark:border-green-400/20 dark:border-t-green-400"></div>
              <span className="text-sm">
                🚀 Création de ton chat en cours...
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <div className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text font-bold text-transparent dark:from-green-400 dark:to-green-600">
            🎮 Prêt·e à devenir un·e pro du code? 🎮
          </div>
        </div>
      </div>
    </div>
  );
}
