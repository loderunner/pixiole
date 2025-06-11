'use client';

import { useState } from 'react';

import Chat from './Chat';
import Welcome from './Welcome';

const mockMessage = `Un jeu de course de moto-laser similaire à celle dans TRON. Je veux pouvoir jouer contre l'ordinateur, donc il faut ajouter un IA.`;

export default function Page() {
  const [message, setMessage] = useState('');

  return message === '' ? (
    <Welcome onSubmit={(m) => setMessage(m)} />
  ) : (
    <Chat initialMessage={message} />
  );
}
