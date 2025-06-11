'use client';

import { useState } from 'react';

import ChatArea from '@/src/components/ChatArea';

type Props = {
  onSubmit: (msg: string) => void;
};

export default function Welcome({ onSubmit }: Props) {
  const [description, setDescription] = useState('');
  return (
    <div className="mx-auto mt-80 flex size-full max-w-3xl flex-col items-center gap-6">
      <h1 className="text-center text-4xl font-extrabold">
        {"Bonjour! Qu'est-ce qu'on fabrique aujourd'hui?"}
      </h1>
      <ChatArea
        className="mt-4 w-full"
        placeholder="Décris ici un jeu que tu veux apprendre à fabriquer avec PICO-8..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onSubmit={() => onSubmit(description)}
      />
    </div>
  );
}
