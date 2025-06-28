'use client';

import { useEffect, useState } from 'react';

import ChatArea from '@/src/ChatArea';

// Static list of 200 French game ideas
const GAME_IDEAS = [
  'Un chat-astronaute collecte des étoiles en évitant les astéroïdes',
  'Une pizzeria où des robots préparent des commandes de plus en plus folles',
  'Un labyrinthe de bonbons avec des énigmes sucrées à résoudre',
  'Course d\'escargots qui mangent du sel pour aller plus vite',
  'Des fleurs magiques qui dansent selon la musique qu\'on joue',
  'Bataille de boules de neige contre des bonshommes qui ripostent',
  'Des fantômes timides cherchent les bons livres dans une bibliothèque',
  'Des poissons volants à nourrir sans qu\'ils s\'échappent de l\'aquarium',
  'Une machine qui fabrique des nuages de différentes couleurs',
  'École de magie où on apprend des sorts avec des séquences de couleurs',
  'Un cinéma pour insectes avec différents genres de films',
  'Pâtisserie de gâteaux impossibles avec des ingrédients magiques',
  'Une station spatiale à réparer avec des puzzles mécaniques',
  'Une forêt où chaque arbre cache un mini-jeu différent',
  'Un musée d\'objets perdus avec des indices à suivre',
  'Un phare qui guide des bateaux colorés qu\'on allume et éteint',
  'Construction de cabane avec le bon choix de branches et feuilles',
  'Des îles flottantes avec des trésors cachés à collecter',
  'Un cirque de créatures magiques à dresser pour leurs numéros',
  'Construction du château le plus haut avec des blocs colorés',
  'Des sirènes qui cherchent leurs écailles perdues sous l\'eau',
  'Une montagne qui change constamment de forme à escalader',
  'Du sable musical qui sonne quand on marche dessus',
  'Des dinosaures amicaux à nourrir avec les bons fruits préhistoriques',
  'Un parc antigravité où la gravité change de direction',
  'Un laboratoire de potions avec des recettes de plus en plus bizarres',
  'Une ferme de légumes géants à récolter avant qu\'ils deviennent trop gros',
  'Une cave avec des cristaux lumineux qui éclairent le chemin',
  'Une tour à construire étage par étage jusqu\'aux nuages',
  'Un pont qui bouge entre deux mondes avec des chutes à éviter',
  'Un marché magique où on achète des pouvoirs avec des pièces spéciales',
  'Des statues gardiennes qui se réveillent quand on bouge',
  'Une rivière de chocolat avec des obstacles à éviter',
  'Des fleurs qui chantent quand on joue les bonnes notes',
  'Un glacier avec des flocons colorés à collecter en glissant',
  'Un village de champignons dont les maisons sont à réparer',
  'Un océan de bulles où il faut nager sans les faire éclater',
  'Une planète de fromage spatial avec des trous à éviter',
  'Un monde miniature où tout est très petit pour courir dedans',
  'Un livre magique dont les pages changent l\'histoire',
  'Une machine à voyager dans le temps pour réparer des objets cassés',
  'Des jouets endormis à réveiller en résolvant leurs problèmes',
  'Un parcours ninja avec des obstacles à franchir en sautant et grimpant',
  'Un jeu de construction rapide avec des pièces qui tombent',
  'Une chasse au trésor avec des indices musicaux à suivre',
  'Un atelier de peinture où on évite de se faire éclabousser',
  'Un safari photo de créatures rares qu\'il ne faut pas effrayer',
  'Une cuisine collaborative chaotique où tout tombe partout',
  'Un puzzle géant en 3D avec des pièces qui tournent',
  'Des véhicules bizarres qui courent sur des pistes impossibles',
  'Un théâtre de marionnettes qui racontent une histoire',
  'Une quête du sandwich ultime avec les bons ingrédients à trouver',
  'Une montagne de bonbons à grimper sans glisser sur le sucre',
  'Un océan d\'étoiles où on plonge pour collecter des constellations',
  'Des villes flottantes à construire en équilibrant les poids',
  'Des créatures étranges avec qui danser en copiant leurs mouvements',
  'Des grottes de cristal à explorer en éclairant son chemin',
  'Un jardin de plantes extraterrestres à cultiver sur la lune',
  'Des planètes en danger à sauver en résolvant leurs problèmes',
  'Un ballon dirigeable à piloter en évitant oiseaux et nuages',
  'Un atelier de création de monstres rigolos à assembler',
  'Un château de sable à défendre contre les vagues qui arrivent',
  'Livraison de colis en trottinette avec des obstacles urbains à éviter',
  'Sculpture rapide de glace avant qu\'elle ne fonde',
  'Une chasse au trésor de pirate avec une carte qui change',
  'Une fourmilière à gérer en dirigeant les fourmis vers leurs tâches',
  'Des tortues spatiales à faire courir en les boostant',
  'Un laboratoire de parfums magiques créés en mélangeant des odeurs',
  'Survie sur île déserte rigolote en construisant des objets bizarres',
  'Un ping-pong avec des balles qui se téléportent',
  'Un élevage de bébés dragons à qui apprendre à voler',
  'Une enquête dans un manoir plein de secrets à résoudre',
  'Une descente d\'arc-en-ciel en luge avec des trous à éviter',
  'Un concours de lancer de boules de coton sur des cibles moelleuses',
  'Des jouets mécaniques qui bougent tout seuls à assembler',
  'Un parkour urbain en sautant de toit en toit',
  'Un cerf-volant à faire voler en contrôlant le vent',
  'Une exploration du monde microscopique à travers un microscope',
  'Des ponts impossibles qui défient la gravité à construire',
  'Une chasse aux papillons fluorescents avec un filet magique',
  'Des voitures à pédales qui courent sur des circuits fous',
  'Un dessin de constellations en reliant les étoiles',
  'Une bataille navale dans une baignoire avec des canards',
  'Une planète entièrement faite de bonbons à explorer',
  'Un numéro de jonglage avec des objets qui changent de forme en vol',
  'Des chats perdus dans l\'espace intersidéral à sauver',
  'Une course à l\'intérieur d\'un aspirateur géant en étant rétréci',
  'Un atelier d\'invention de machines complètement inutiles mais amusantes',
  'Un combat à coups de polochons dans une chambre géante',
  'Un parcours ninja sous l\'eau avec des bulles à franchir',
  'Un concours de la grimace la plus terrifiante',
  'Un monde microscopique dans une goutte d\'eau à explorer',
  'Des cabanes qui volent avec des ballons à construire',
  'Une course avec des limaces radioactives qui brillent',
  'Un concours de lancer de confettis géants sur des cibles colorées',
  'Un frigo abandonné plein de nourriture bizarre à explorer',
  'Un concert de pets de différents animaux pour composer de la musique',
  'Des peluches perdues dans un parc d\'attractions à sauver',
  'Une course en portant des chaussettes dépareillées qui glissent',
  'Des mondes miniatures à sculpter en pâte à modeler',
  'Une bataille aérienne avec des pizzas qui volent vraiment',
  'Un parcours d\'obstacles pour fourmis à guider',
  'Un concours de bâillements contagieux à provoquer chez les adversaires',
  'Un voyage à l\'intérieur d\'un réveil cassé pour le réparer',
  'Des tours de spaghetti les plus hautes possible à construire',
  'Des bulles géantes à attraper avant qu\'elles n\'éclatent',
  'Un combat à coups de coussins dans un salon moelleux',
  'Un tiroir secret plein d\'objets mystérieux à fouiller',
  'Des danses robotiques de plus en plus complexes à apprendre',
  'Des crayons de couleur qui perdent leur couleur à sauver',
  'Un labyrinthe de miroirs déformants où naviguer',
  'Des symphonies à composer en mélangeant les couleurs',
  'Un concours de lancer de marshmallows géants avec une catapulte',
  'Des hamsters à entraîner pour faire des acrobaties',
  'Des formes bizarres à sculpter avec des matériaux étranges',
  'L\'intérieur d\'une machine à laver en marche à explorer',
  'Des villes souterraines avec des tunnels secrets à creuser',
  'Des rondelles de hockey à faire glisser sur une patinoire',
  'Un concours de lancer de tartes à la crème sur des cibles mouvantes',
  'Un placard magique avec des secrets cachés à découvrir',
  'Des mélodies harmonieuses à composer avec des rots',
  'Des chaussettes orphelines à réunir avec leurs paires',
  'Des tapis volants qui tombent en panne sur lesquels voler',
  'Des potions qui pétillent et changent de couleur à préparer',
  'Une bataille de boules de papier dans un bureau géant',
  'Des escargots à entraîner pour franchir des parcours ninja',
  'Des structures fragiles avec des allumettes à construire',
  'Un voyage dans un livre de recettes pour trouver des ingrédients',
  'Des ponts en bonbons qui ne fondent pas à construire',
  'Des voitures téléguidées à piloter sur des circuits impossibles',
  'Un combat avec des plumes qui chatouillent les ennemis',
  'Un grenier poussiéreux plein de trésors oubliés à explorer',
  'Du karaoke en imitant différents cris d\'animaux',
  'Des biscuits qui s\'échappent de leur boîte à rattraper',
  'Un voyage dans un tube de dentifrice pour le nettoyer',
  'Des jardins impossibles avec des plantes magiques à cultiver',
  'Un concours de lancer de ballons à eau sur des cibles qui bougent',
  'Un parcours d\'obstacles à traverser en chaussons glissants',
  'Des châteaux de cartes qui résistent au vent à construire',
  'Les circuits d\'une calculatrice géante à explorer',
  'Des fusées en carton qui volent vraiment à assembler',
  'Une course en patins à roulettes sur des pistes sinueuses',
  'Un combat avec des cotons-tiges géants comme des épées',
  'Un sac à dos magique aux poches infinies à fouiller',
  'Un concours d\'imitations d\'animaux de plus en plus bizarres',
  'Des gommes à effacer qui perdent leur pouvoir à sauver',
  'Une nage dans un tube à essai rempli de liquide coloré',
  'Des machines à rêves pour endormir les gens à inventer',
  'Un duel de brosses à dents dans une salle de bain géante',
  'Des tortues à entraîner pour faire du parcours ninja lent',
  'Des tours de magie qui échouent de façon drôle à réaliser',
  'Un dictionnaire dont les mots prennent vie à explorer',
  'Des igloos à construire dans un environnement tropical',
  'Une course en équilibrant des plateaux repas pleins',
  'Un combat avec des éponges mouillées qui glissent',
  'Une boîte avec des outils secrets cachés à découvrir',
  'De la sculpture rapide de savon avant qu\'il ne glisse',
  'Des élastiques perdus dans tous les coins à récupérer',
  'Un voyage dans un taille-crayon pour comprendre son mécanisme',
  'Des parfums nauséabonds à créer pour faire fuir les ennemis',
  'Un combat à coups de coussins qui font des bruits bizarres',
  'Un parcours d\'obstacles à traverser en pantoufles géantes',
  'Des structures délicates avec des cure-dents à construire',
  'Une télécommande géante dont les boutons sont à explorer',
  'Des maisons de cartes à équilibrer dans le vent',
  'Des bouchons de liège à faire rouler sur des parcours',
  'Un combat avec des serviettes humides qui claquent',
  'Une trousse d\'école pleine de surprises à fouiller',
  'Des pyramides humaines avec des personnages à former',
  'Des trombones déformés à redresser pour les rendre utiles',
  'Une nage dans un bocal à poissons comme un poisson',
  'Des machines à bulles avec des formes spéciales à inventer',
  'Un combat à coups d\'oreillers géants et moelleux',
  'Des coccinelles à entraîner pour voler en formation',
  'Un jeu de statue où il faut faire semblant sans bouger',
  'Un voyage dans les pages d\'un agenda pour changer les rendez-vous',
  'Des tours de dominos qui font des parcours à construire',
  'Un concours de lancer de bouchons de bouteille sur des cibles précises',
  'Un combat avec des gants de toilette mouillés et savonneux',
  'Tous les tiroirs secrets d\'une cuisine à explorer',
  'Des acrobaties en pyjama sur un lit géant à réaliser',
  'Des agrafes rouillées à sauver en les nettoyant',
  'Une nage dans un pot de confiture géant et collant',
  'Des instruments de musique avec des objets bizarres à fabriquer',
  'Un combat avec des chaussettes sales qui puent',
  'Des fourmis perdues dans un labyrinthe à guider',
  'Un concours de grimaces devant un miroir qui les déforme',
  'Un carnet de notes magique dont les pages sont à explorer',
  'Des châteaux avec des livres empilés à construire',
  'Un concours de lancer de capsules de bouteilles comme des frisbees',
  'Un combat avec des mouchoirs en papier qui volent',
  'Une boîte de rangement avec des trésors cachés à découvrir',
  'Une danse avec un balai comme partenaire de danse',
  'Des punaises perdues à récupérer avant qu\'elles ne piquent',
  'Un voyage dans un tube de rouge à lèvres coloré',
  'Des œuvres d\'art avec de la nourriture à sculpter',
  'Un combat avec des torchons de cuisine qui voltigent',
  'Des lézards miniatures à entraîner pour faire de l\'escalade',
  'Des ponts fragiles avec des pailles à construire',
  'Un voyage dans les mois d\'un calendrier magique',
  'Des ponts de spaghetti qui supportent du poids à construire',
  'Des bouchons en liège à faire rebondir sur des trampolines',
  'Un combat avec des lingettes démaquillantes glissantes'
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
