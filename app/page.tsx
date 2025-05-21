'use client';

import { PencilSimpleLineIcon } from '@phosphor-icons/react/dist/ssr';
import { useMemo, useState } from 'react';

export default function Page() {
  const [description, setDescription] = useState('');
  const rows = useMemo(() => {
    let count = 1;
    for (const c of description) {
      if (c === '\n') {
        count++;
      }
    }
    return count;
  }, [description]);

  return (
    <div className="mx-auto mt-80 flex size-full max-w-3xl flex-col items-center gap-6">
      <h1 className="text-center text-4xl font-extrabold">
        {"Bonjour! Qu'est-ce qu'on fabrique aujourd'hui?"}
      </h1>
      <div className="mt-4 flex w-full flex-row items-start justify-start gap-3 rounded-lg border border-gray-300 p-3 transition has-focus:border-gray-400 has-focus:shadow-xl">
        <textarea
          className="grow resize-none p-3 outline-none"
          rows={rows}
          placeholder="Décris ici un jeu que tu veux apprendre à fabriquer avec PICO-8..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="rounded-full bg-gray-700 p-3 text-white hover:bg-gray-500">
          <PencilSimpleLineIcon className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
