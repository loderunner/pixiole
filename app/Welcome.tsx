'use client';

import { useEffect, useState } from 'react';

import ChatArea from '@/src/ChatArea';

// Static list of 200 French game ideas
const GAME_IDEAS = [
  'Un chat ninja qui saute sur les toits',
  'Collecte des étoiles dans un labyrinthe spatial',
  'Course de grenouilles sur des nénuphars',
  'Défends ton château contre des dragons',
  'Un pingouin qui surfe sur des icebergs',
  'Puzzle avec des cristaux magiques colorés',
  'Un robot qui nettoie une planète polluée',
  'Course de tortues dans un jardin enchanté',
  'Attrape des nuages avec un filet',
  'Un pirate cherche un trésor caché',
  'Saute de plateforme en plateforme dans les nuages',
  'Un magicien transforme les objets',
  'Course contre le temps dans un volcan',
  'Un alien découvre la Terre',
  'Défends ton jardin contre les escargots',
  'Un poisson voyage dans les océans',
  'Construis des ponts pour traverser des rivières',
  'Un hibou livre des lettres la nuit',
  'Collectionne des papillons dans une forêt',
  'Un astronaute explore des planètes inconnues',
  'Course de voitures dans le futur',
  'Un écureuil ramasse des noisettes',
  'Évite les obstacles dans un tunnel',
  "Un fantôme traverse les murs d'un château",
  'Plante des fleurs dans un désert',
  'Un chevalier combat des monstres',
  'Course de vélos dans les montagnes',
  'Un panda mange des bambous',
  'Navigue en bateau sur des rivières dangereuses',
  'Un lutin protège la forêt',
  'Résous des énigmes dans une pyramide',
  'Un koala grimpe aux arbres',
  'Défends une base spatiale',
  'Un renard traverse une ville moderne',
  'Collectionne des gemmes dans une mine',
  'Un dauphin nage avec des poissons tropicaux',
  "Évite les meteores dans l'espace",
  'Un hérisson roule à travers des obstacles',
  'Construis une ville sur une île',
  'Un loup hurle sous la pleine lune',
  'Course de drones dans le ciel',
  'Un ours polaire pêche des poissons',
  'Traverse un marécage plein de crocodiles',
  'Un singe balance de liane en liane',
  'Défends ton village contre les orcs',
  'Un phoque jongle avec des balles',
  'Résous des puzzles avec des lasers',
  'Un tigre chasse dans la jungle',
  'Course de skis sur des pistes glacées',
  'Un crabe explore les fonds marins',
  'Évite les pièges dans un temple ancien',
  'Un serpent mange des pommes',
  'Construis des tours dans les nuages',
  'Un aigle vole au-dessus des montagnes',
  'Collectionne des coquillages sur la plage',
  'Un hamster court dans sa roue',
  'Défends ton laboratoire contre les virus',
  'Un cerf traverse une forêt enchantée',
  'Course de motos dans le désert',
  'Un castor construit des barrages',
  'Navigue dans un labyrinthe aquatique',
  'Un corbeau collectionne des objets brillants',
  'Plante des arbres pour sauver la planète',
  "Un dinosaure évite l'extinction",
  'Course de chevaux dans les plaines',
  'Un flamant rose danse sur un lac',
  'Traverse des portails dimensionnels',
  'Un lynx chasse dans la neige',
  'Défends ton phare contre la tempête',
  'Un papillon migre vers des terres lointaines',
  "Résous des codes secrets d'espions",
  'Un sanglier cherche des truffes',
  'Course de ballons dans les airs',
  'Un orque nage dans les mers polaires',
  'Évite les robots dans une usine',
  'Un caméléon change de couleur',
  'Construis des cabanes dans les arbres',
  "Un kangourou saute dans l'outback",
  'Collectionne des flocons de neige uniques',
  'Un scarabée roule sa boule',
  'Défends ton potager contre les lapins',
  'Un colibri butine des fleurs exotiques',
  'Course de traîneaux tirés par des chiens',
  'Un morse se prélasse sur la banquise',
  "Traverse un pont suspendu qui s'effondre",
  'Un paon fait la roue dans un parc',
  'Résous des énigmes de machines anciennes',
  'Un raton laveur vole de la nourriture',
  'Course de ballons dirigeables',
  'Un hippopotame barboté dans la rivière',
  'Évite les stalactites dans une grotte',
  'Un zèbre galope dans la savane',
  "Construis des igloos dans l'Arctique",
  'Un perroquet répète des mots magiques',
  'Défends ton observatoire contre les aliens',
  'Un rhinocéros charge à travers la brousse',
  'Course de planches à roulettes urbaines',
  'Un escargot laisse une traîne colorée',
  'Navigue entre des icebergs flottants',
  'Un gecko grimpe sur tous les murs',
  'Collectionne des météorites précieuses',
  'Un bison traverse les grandes plaines',
  'Résous des puzzles de miroirs magiques',
  'Un tapir mange des fruits tropicaux',
  "Course de sous-marins dans l'abîme",
  'Un toucan vole entre les branches',
  'Évite les avalanches en montagne',
  'Un wombat creuse des galeries',
  'Défends ton musée contre les voleurs',
  'Un axolotl nage dans un lac souterrain',
  'Construis des maisons flottantes',
  'Un jaguar chasse au clair de lune',
  'Course de deltaplanes dans les canyons',
  'Un pangolin se roule en boule',
  'Traverse des champs de lave en fusion',
  'Un quetzal vole dans la canopée',
  'Collectionne des fossiles de dinosaures',
  'Un okapi broute dans la forêt dense',
  'Résous des énigmes de cadrans solaires',
  'Un narval nage sous la glace arctique',
  'Course de montgolfières colorées',
  'Un casoar court dans la jungle',
  "Évite les tourbillons dans l'océan",
  'Un ornithorynque nage dans les marais',
  'Défends ton laboratoire de cristaux',
  'Un fennec court dans les dunes',
  'Construis des ponts de glace',
  "Un anaconda nage dans l'Amazone",
  'Course de bobsleighs olympiques',
  'Un varan surveille son territoire',
  'Traverse des nuages orageux',
  'Un tapanuli grimpe aux bambous',
  'Collectionne des perles dans les huîtres',
  'Un binturong grimpe lentement',
  'Résous des codes de coffres-forts',
  'Un dhole chasse en meute',
  'Course de voiliers dans la tempête',
  'Un aye-aye cherche des insectes',
  'Évite les geysers bouillants',
  'Un saïga galope dans la steppe',
  'Défends ton satellite spatial',
  'Un margay grimpe silencieusement',
  'Construis des châteaux de sable géants',
  'Un kinkajou mange des fruits sucrés',
  'Course de traîneaux à chiens polaires',
  'Un capybara se détend au soleil',
  'Navigue dans des rapides tumultueux',
  'Un quoll chasse des insectes nocturnes',
  'Collectionne des champignons lumineux',
  'Un numbat mange des termites',
  'Résous des puzzles de runes anciennes',
  'Un bilby creuse dans le sable rouge',
  'Course de kayaks dans les fjords',
  'Un echidné cherche des fourmis',
  'Évite les éboulements rocheux',
  'Un potoroo saute entre les buissons',
  'Défends ton vaisseau contre les pirates',
  'Un tenrec explore la forêt malgache',
  'Construis des structures en bambou',
  'Un fossa chasse dans les arbres',
  'Course de bobsleighs futuristes',
  'Un gerboise saute dans le désert',
  'Traverse des ponts de lianes fragiles',
  'Un civette grimpe dans la nuit',
  'Collectionne des cristaux arc-en-ciel',
  'Un caracal bondit sur ses proies',
  'Résous des énigmes de totems tribaux',
  'Un serval chasse dans les hautes herbes',
  'Course de planeurs dans les thermals',
  'Un oncilla grimpe dans la canopée',
  'Évite les chutes de rochers volcaniques',
  'Un kodkod chasse de petites proies',
  'Défends ton temple contre les pilleurs',
  'Un chat-pêcheur attrape des poissons',
  'Construis des abris dans la toundra',
  'Un manul chasse dans les steppes',
  'Course de skis nautiques extrêmes',
  'Un sand cat survit dans le désert',
  'Navigue dans des canaux souterrains',
  'Un chat des sables court sur les dunes',
  "Collectionne des plumes d'oiseaux rares",
  'Un jaguarundi explore différents biomes',
  "Résous des mécanismes d'horlogerie",
  'Un margay descend la tête en bas',
  'Course de surfboards sur les vagues',
  'Un ocelot chasse au crépuscule',
  'Évite les tornades dans les plaines',
  'Un geoffroy grimpe aux cactus',
  'Défends ton avant-poste polaire',
  'Un tigre des neiges bondit sur les rochers',
  'Construis des jardins suspendus',
  'Un chat rubigineux chasse les insectes',
  'Course de parapentes dans les Alpes',
  "Un chat à pieds noirs court dans l'aride",
  'Traverse des grottes de cristal',
  'Un léopard nébuleux grimpe agilement',
  "Collectionne des œufs d'oiseaux exotiques",
  'Un chat doré asiatique chasse furtivement',
  'Résous des puzzles de constellations',
  'Un chat de Temminck patrouille son territoire',
  'Course de luges dans les gorges glacées',
  'Un chat de Bornéo nage parfaitement',
  'Évite les coulées de lave incandescente',
  'Un chat léopard grimpe aux palmiers',
  'Défends ton bunker souterrain',
  'Un chat des pampas chasse dans les prairies',
  'Construis des plateformes dans les arbres',
  'Un kodkod explore la forêt tempérée',
  'Course de wingsuit dans les canyons',
  'Un guigna grimpe aux araucarias',
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
