'use client';

import { useEffect, useState } from 'react';

import ChatArea from '@/src/ChatArea';

// Static list of 200 French game ideas
const GAME_IDEAS = [
  'Un chat qui sauve la galaxie',
  'Une pizzeria gérée par des robots',
  'Labyrinthe de bonbons magiques',
  'Course de escargots turbo',
  'Jardin secret de plantes dansantes',
  'Bataille de boules de neige éternelle',
  'Libraire pour fantômes timides',
  'Aquarium de poissons volants',
  'Usine de nuages colorés',
  'École de magie pour débutants',
  'Cinéma pour insectes',
  'Boulangerie de gâteaux impossibles',
  'Station spatiale abandonnée',
  'Forêt enchantée pleine de mystères',
  'Musée des objets perdus',
  'Phare au bout du monde',
  'Cabane dans un arbre géant',
  'Île flottante aux trésors cachés',
  'Cirque de créatures magiques',
  'Château fait de blocs colorés',
  'Ville sous-marine de sirènes',
  'Montagne qui change de forme',
  'Désert de sable musical',
  'Vallée des dinosaures amicaux',
  'Parc de jeux antigravité',
  'Laboratoire de potions bizarres',
  'Ferme de légumes géants',
  'Cave aux cristaux lumineux',
  'Tour qui monte vers les nuages',
  'Pont suspendu entre deux mondes',
  'Marché aux pouvoirs magiques',
  'Temple gardé par des statues',
  'Rivière de chocolat chaud',
  'Prairie où les fleurs chantent',
  'Glacier aux couleurs arc-en-ciel',
  'Village de maisons champignons',
  'Océan de bulles de savon',
  'Planète faite de fromage',
  'Course dans un monde miniature',
  'Aventure dans un livre ouvert',
  'Machine à voyager dans le temps',
  'Royaume des jouets vivants',
  'Parcours ninja pour débutants',
  'Concours de construction rapide',
  'Chasse au trésor musicale',
  'Bataille de peinture colorée',
  'Safari photo de créatures rares',
  'Cuisine collaborative chaotique',
  'Puzzle géant en 3D',
  'Course de véhicules improbables',
  'Théâtre de marionnettes magiques',
  'Quête du sandwich parfait',
  'Escalade de montagne de bonbons',
  'Plongée dans un océan de stars',
  'Construction de villes flottantes',
  'Danse avec des créatures étranges',
  'Exploration de grottes cristallines',
  'Jardinage sur la lune',
  'Sauvetage de planètes en danger',
  'Course de ballons dirigeables',
  'Atelier de création de monstres',
  'Bataille de châteaux de sable',
  'Livraison express en trottinette',
  'Concours de sculpture sur glace',
  'Aventure pirate moderne',
  'Simulation de fourmilière géante',
  'Course de tortues spatiales',
  'Création de parfums magiques',
  'Survie sur île déserte rigolote',
  'Tournoi de ping-pong quantique',
  'Élevage de dragons miniatures',
  'Enquête dans un manoir hanté',
  'Course de luge sur arc-en-ciel',
  'Bataille de boules de coton',
  'Fabrication de jouets mécaniques',
  'Parcours parkour urbain',
  'Concours de cerf-volant géant',
  'Aventure sous un microscope',
  'Construction de ponts impossible',
  'Chasse aux papillons fluorescents',
  'Course de voitures à pédales',
  'Création de constellations',
  'Bataille navale en baignoire',
  'Exploration de planète bonbon',
  'Concours de jonglage chaotique',
  'Sauvetage de chats cosmiques',
  'Course dans un aspirateur géant',
  'Création de machines inutiles',
  'Bataille de polochons épique',
  'Parcours ninja aquatique',
  'Concours de grimaces terrifiantes',
  'Aventure dans une goutte d\'eau',
  'Construction de cabanes volantes',
  'Course de limaces radioactives',
  'Bataille de confettis géants',
  'Exploration de frigo abandonné',
  'Concours de pets musicaux',
  'Sauvetage de peluches perdues',
  'Course de chaussettes dépareillées',
  'Création de mondes en pâte à modeler',
  'Bataille de pizzas volantes',
  'Parcours obstacle pour fourmis',
  'Concours de bâillements contagieux',
  'Aventure dans un réveil cassé',
  'Construction de tours de spaghetti',
  'Course de bulles géantes',
  'Bataille de coussins moelleux',
  'Exploration de tiroir secret',
  'Concours de danse robotique',
  'Sauvetage de crayons de couleur',
  'Course dans un labyrinthe de miroirs',
  'Création de symphonies colorées',
  'Bataille de marshmallows géants',
  'Parcours acrobatique pour hamsters',
  'Concours de sculptures bizarres',
  'Aventure dans une machine à laver',
  'Construction de villes souterraines',
  'Course de rondelles de hockey',
  'Bataille de tartes à la crème',
  'Exploration de placard magique',
  'Concours de rots en harmonie',
  'Sauvetage de chaussettes orphelines',
  'Course de tapis volants défaillants',
  'Création de potions qui pétillent',
  'Bataille de boules de papier',
  'Parcours ninja pour escargots',
  'Concours de construction en allumettes',
  'Aventure dans un livre de recettes',
  'Construction de ponts en bonbons',
  'Course de voitures téléguidées',
  'Bataille de plumes chatouillantes',
  'Exploration de grenier poussiéreux',
  'Concours de karaoke animal',
  'Sauvetage de biscuits en fuite',
  'Course dans un tube de dentifrice',
  'Création de jardins impossibles',
  'Bataille de ballons à eau',
  'Parcours obstacles en chaussons',
  'Concours de châteaux de cartes',
  'Aventure dans une calculatrice',
  'Construction de fusées en carton',
  'Course de patins à roulettes',
  'Bataille de cotons-tiges géants',
  'Exploration de sac à dos magique',
  'Concours de imitations d\'animaux',
  'Sauvetage de gommes à effacer',
  'Course dans un tube à essai',
  'Création de machines à rêves',
  'Bataille de brosses à dents',
  'Parcours ninja pour tortues',
  'Concours de tours de magie ratées',
  'Aventure dans un dictionnaire',
  'Construction de igloos tropicaux',
  'Course de plateaux repas',
  'Bataille de éponges mouillées',
  'Exploration de boîte à outils',
  'Concours de sculptures en savon',
  'Sauvetage de élastiques perdus',
  'Course dans un taille-crayon',
  'Création de parfums nauséabonds',
  'Bataille de coussins pets',
  'Parcours obstacle en pantoufles',
  'Concours de constructions en cure-dents',
  'Aventure dans une télécommande',
  'Construction de maisons en cartes',
  'Course de bouchons de liège',
  'Bataille de serviettes humides',
  'Exploration de trousse d\'école',
  'Concours de pyramides humaines',
  'Sauvetage de trombone déformés',
  'Course dans un bocal à poissons',
  'Création de machines à bulles',
  'Bataille de oreillers géants',
  'Parcours ninja pour coccinelles',
  'Concours de statues vivantes',
  'Aventure dans un agenda',
  'Construction de tours en dominos',
  'Course de bouchons de bouteille',
  'Bataille de gants de toilette',
  'Exploration de tiroir de cuisine',
  'Concours de acrobaties en pyjama',
  'Sauvetage de agrafes rouillées',
  'Course dans un pot de confiture',
  'Création de instruments bizarres',
  'Bataille de chaussettes sales',
  'Parcours obstacle pour fourmis',
  'Concours de grimaces dans miroir',
  'Aventure dans un carnet de notes',
  'Construction de châteaux de livres',
  'Course de capsules de bouteilles',
  'Bataille de mouchoirs en papier',
  'Exploration de boîte de rangement',
  'Concours de danse avec balai',
  'Sauvetage de punaises perdues',
  'Course dans un tube de rouge',
  'Création de sculptures alimentaires',
  'Bataille de torchons de cuisine',
  'Parcours ninja pour lézards',
  'Concours de constructions en pailles',
  'Aventure dans un calendrier',
  'Construction de ponts en spaghetti',
  'Course de bouchons en liège',
  'Bataille de lingettes démaquillantes'
];

type Props = {
  onSubmit: (msg: string) => void;
};

export default function Welcome({ onSubmit }: Props) {
  const [description, setDescription] = useState('');
  const [randomIdeas, setRandomIdeas] = useState<string[]>([]);

  // Generate 3 random game ideas on component mount
  useEffect(() => {
    const getRandomIdeas = () => {
      const shuffled = [...GAME_IDEAS].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };
    setRandomIdeas(getRandomIdeas());
  }, []);

  const handleIdeaClick = (idea: string) => {
    setDescription(idea);
  };

  const generateNewIdeas = () => {
    const shuffled = [...GAME_IDEAS].sort(() => 0.5 - Math.random());
    setRandomIdeas(shuffled.slice(0, 3));
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
        />

        {/* Random game idea suggestions */}
        {randomIdeas.length > 0 && (
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
                  🎮 {idea}
                </button>
              ))}
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
