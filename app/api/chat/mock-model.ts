import {
  LanguageModelV1Prompt,
  LanguageModelV1StreamPart,
  simulateReadableStream,
} from 'ai';
import { MockLanguageModelV1 } from 'ai/test';

// Mock responses for different scenarios
const chatCompletionResponse = `Super idée ! Un jeu de course de moto-laser façon TRON est un excellent projet pour apprendre la programmation sur PICO-8. Avant de commencer, réfléchissons ensemble aux différents éléments nécessaires pour réaliser ce jeu.

<Thinking>

Pour créer un jeu de moto-laser inspiré de TRON, il nous faut :

1. **Un plateau de jeu** : une grille où les motos se déplacent et laissent une traînée derrière elles.
2. **Deux motos** : une contrôlée par le joueur, l'autre par l'ordinateur (IA).
3. **Gestion des mouvements** : chaque moto avance en ligne droite et peut tourner à 90° (haut, bas, gauche, droite).
4. **Traînées** : chaque moto laisse une traînée derrière elle, qui devient un obstacle.
5. **Détection de collision** : si une moto touche une traînée (la sienne ou celle de l'adversaire) ou le bord du plateau, elle perd.
6. **IA** : l'ordinateur doit pouvoir contrôler une moto et prendre des décisions pour éviter les collisions.
7. **Interface utilisateur** : affichage du score, écran de démarrage, écran de fin de partie.
8. **Effets visuels et sonores** : pour rendre le jeu plus vivant.

Ces éléments interagiront ainsi :
- À chaque frame, les motos avancent et laissent une traînée.
- Le joueur contrôle sa moto avec les touches directionnelles.
- L'IA décide de la direction à prendre pour éviter les collisions.
- Si une collision est détectée, la partie s'arrête et on affiche le résultat.

</Thinking>

Voici un plan de cours détaillé pour t'accompagner pas à pas dans la création de ce jeu.

<LessonPlan>

1. Introduction et préparation du projet
    1. Présentation du jeu et des règles
    2. Mise en place de l'environnement PICO-8
2. Création du plateau de jeu
    1. Définition de la grille
    2. Affichage du plateau
3. Implémentation de la moto du joueur
    1. Représentation de la moto
    2. Contrôles du joueur
    3. Affichage de la moto et de sa traînée
4. Détection des collisions
    1. Gestion des bords du plateau
    2. Gestion des collisions avec les traînées
5. Ajout de la moto contrôlée par l'IA
    1. Représentation de la moto IA
    2. Mouvement automatique de base
    3. Affichage de la moto IA et de sa traînée
6. Amélioration de l'IA
    1. Évitement simple des obstacles
    2. Stratégies de survie
7. Gestion de la fin de partie et du score
    1. Détection de la victoire/défaite
    2. Affichage de l'écran de fin
8. Effets visuels et sonores
    1. Ajout d'effets graphiques
    2. Ajout de sons simples
9. Aller plus loin : idées d'améliorations
    1. Niveaux de difficulté
    2. Modes de jeu supplémentaires

</LessonPlan>

Veux-tu commencer avec le premier chapitre : **Introduction et préparation du projet** ?

<CreateFile name="fibonacci.lua">

\`\`\`lua
function fibonacci(n)
  if n <= 0 then return 0 end
  if n == 1 then return 1 end

  local a, b = 0, 1
  for i = 2, n do
    a, b = b, a + b
  end

  return b
end
\`\`\`

</CreateFile>

<EditFile name="fibonacci.lua">

\`\`\`diff
@@ -2,10 +2,5 @@
   if n <= 0 then return 0 end
   if n == 1 then return 1 end

-  local a, b = 0, 1
-  for i = 2, n do
-    a, b = b, a + b
-  end
-
-  return b
+  return fibonacci(n-1) + fibonacci(n-2)
 end
\`\`\`

</EditFile>`;

const titleResponse = 'Course de Moto-Laser';

function getResponseForPrompt(prompt: LanguageModelV1Prompt): string {
  const promptText = prompt
    .map((p) =>
      typeof p.content === 'string'
        ? p.content
        : p.content.map((c) => (c.type === 'text' ? c.text : '')).join(' '),
    )
    .join(' ');
  if (promptText.startsWith('Generate a short, creative title')) {
    return titleResponse;
  }

  return chatCompletionResponse;
}

function createStreamChunks(response: string): LanguageModelV1StreamPart[] {
  const chunks: LanguageModelV1StreamPart[] = response
    .split(' ')
    .map((s) => ({ type: 'text-delta', textDelta: s + ' ' }));

  chunks.push({
    type: 'finish',
    finishReason: 'stop',
    logprobs: undefined,
    usage: { completionTokens: response.length, promptTokens: 100 },
  });

  return chunks;
}

export const mockModel = new MockLanguageModelV1({
  doGenerate: async ({ prompt }) => {
    const response = getResponseForPrompt(prompt);
    return {
      text: response,
      rawCall: { rawPrompt: prompt, rawSettings: {} },
      finishReason: 'stop',
      usage: { completionTokens: response.length, promptTokens: 100 },
    };
  },
  doStream: async ({ prompt }) => {
    const response = getResponseForPrompt(prompt);
    const chunks = createStreamChunks(response);

    return {
      stream: simulateReadableStream({
        chunks,
        initialDelayInMs: 200,
        chunkDelayInMs: response.length < 50 ? 50 : 10, // Slower for short responses (titles)
      }),
      rawCall: { rawPrompt: prompt, rawSettings: {} },
    };
  },
});
