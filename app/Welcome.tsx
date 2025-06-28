'use client';

import { useEffect, useState } from 'react';

import ChatArea from '@/src/ChatArea';

// Static list of 200 French game ideas
const GAME_IDEAS = [
  'Pilote un chat-astronaute qui collecte des étoiles en évitant les astéroïdes',
  'Gère une pizzeria où des robots préparent des commandes de plus en plus folles',
  'Navigue dans un labyrinthe de bonbons en résolvant des énigmes sucrées',
  'Fais courir ton escargot en collectant du sel pour le booster',
  'Plante et arrose des fleurs magiques qui dansent selon la musique',
  'Lance des boules de neige sur des bonshommes de neige qui ripostent',
  'Aide des fantômes timides à trouver les bons livres dans une bibliothèque',
  'Nourris des poissons volants tout en évitant qu\'ils s\'échappent de l\'aquarium',
  'Contrôle une machine qui fabrique des nuages de différentes couleurs',
  'Apprends des sorts simples en mémorisant des séquences de couleurs',
  'Projette des films pour des insectes en choisissant leurs genres préférés',
  'Crée des gâteaux impossibles en mélangeant des ingrédients magiques',
  'Répare une station spatiale en résolvant des puzzles mécaniques',
  'Explore une forêt où chaque arbre cache un mini-jeu différent',
  'Retrouve des objets perdus dans un musée en suivant des indices',
  'Allume et éteins un phare pour guider des bateaux colorés',
  'Construis une cabane en choisissant les bonnes branches et feuilles',
  'Saute d\'île en île flottante pour collecter des trésors cachés',
  'Dresse des créatures magiques pour qu\'elles fassent des numéros de cirque',
  'Empile des blocs colorés pour construire le château le plus haut',
  'Aide des sirènes à retrouver leurs écailles perdues sous l\'eau',
  'Escalade une montagne qui change constamment de forme',
  'Crée de la musique en marchant sur du sable qui sonne',
  'Nourris des dinosaures amicaux avec les bons fruits préhistoriques',
  'Saute et vole dans un parc où la gravité change de direction',
  'Mélange des potions en suivant des recettes de plus en plus bizarres',
  'Récolte des légumes géants avant qu\'ils ne deviennent trop gros',
  'Collecte des cristaux lumineux qui éclairent ton chemin dans la cave',
  'Monte une tour en construisant étage par étage jusqu\'aux nuages',
  'Traverse un pont qui bouge en évitant de tomber entre les mondes',
  'Achète des pouvoirs magiques avec des pièces spéciales',
  'Évite les statues gardienneq qui se réveillent quand tu bouges',
  'Navigue sur une rivière de chocolat en évitant les obstacles',
  'Fais chanter des fleurs en jouant les bonnes notes',
  'Glisse sur un glacier en collectant des flocons colorés',
  'Aide les habitants champignons à réparer leurs maisons',
  'Nage dans un océan de bulles sans les faire éclater',
  'Mange des morceaux de fromage spatial en évitant les trous',
  'Course dans un monde miniature où tout est très petit',
  'Tourne les pages d\'un livre magique pour changer l\'histoire',
  'Voyage dans le temps pour réparer des objets cassés',
  'Réveille des jouets endormis en résolvant leurs problèmes',
  'Franchis des obstacles ninja en sautant et en grimpant',
  'Construis des structures le plus vite possible avec des pièces qui tombent',
  'Suis des indices musicaux pour trouver un trésor caché',
  'Peins des murs tout en évitant de te faire éclabousser',
  'Photographie des créatures rares sans les effrayer',
  'Prépare des plats avec des amis mais tout tombe partout',
  'Assemble un puzzle géant en faisant tourner les pièces en 3D',
  'Fais courir des véhicules bizarres sur des pistes impossibles',
  'Contrôle des marionnettes pour qu\'elles racontent une histoire',
  'Trouve les bons ingrédients pour faire le sandwich ultime',
  'Grimpe une montagne de bonbons sans glisser sur le sucre',
  'Plonge dans un océan d\'étoiles pour collecter des constellations',
  'Bâtis des villes qui flottent en équilibrant les poids',
  'Danse avec des créatures étranges en copiant leurs mouvements',
  'Explore des grottes de cristal en éclairant ton chemin',
  'Cultive des plantes extraterrestres sur la surface de la lune',
  'Sauve des planètes en danger en résolvant leurs problèmes',
  'Pilote un ballon dirigeable en évitant les oiseaux et les nuages',
  'Crée des monstres rigolos en assemblant différentes parties',
  'Défends ton château de sable contre les vagues qui arrivent',
  'Livre des colis en trottinette en évitant les obstacles urbains',
  'Sculpte rapidement de la glace avant qu\'elle ne fonde',
  'Cherche un trésor de pirate avec une carte qui change',
  'Gère une fourmilière en dirigeant les fourmis vers leurs tâches',
  'Fais courir des tortues dans l\'espace en les boostant',
  'Mélange des odeurs pour créer des parfums magiques',
  'Survie sur une île déserte en construisant des objets rigolos',
  'Joue au ping-pong avec des balles qui se téléportent',
  'Élève des bébés dragons en leur apprenant à voler',
  'Résous une enquête dans un manoir plein de secrets',
  'Dévale un arc-en-ciel en luge en évitant les trous',
  'Lance des boules de coton sur des cibles moelleuses',
  'Assemble des jouets mécaniques qui bougent tout seuls',
  'Franchis des obstacles urbains en sautant de toit en toit',
  'Fais voler ton cerf-volant en contrôlant le vent',
  'Rétréci et explore le monde à travers un microscope',
  'Construis des ponts impossibles qui défient la gravité',
  'Attrape des papillons fluorescents avec un filet magique',
  'Fais courir des voitures à pédales sur des circuits fous',
  'Dessine des constellations en reliant les étoiles',
  'Bataille navale dans une baignoire avec des canards',
  'Explore une planète entièrement faite de bonbons',
  'Jongle avec des objets qui changent de forme en vol',
  'Sauve des chats perdus dans l\'espace intersidéral',
  'Rétrécis et course à l\'intérieur d\'un aspirateur géant',
  'Invente des machines complètement inutiles mais amusantes',
  'Combat à coups de polochons dans une chambre géante',
  'Franchis un parcours ninja sous l\'eau avec des bulles',
  'Fais le concours de la grimace la plus terrifiante',
  'Explore un monde microscopique dans une goutte d\'eau',
  'Construis des cabanes qui volent avec des ballons',
  'Course avec des limaces radioactives qui brillent',
  'Lance des confettis géants sur des cibles colorées',
  'Explore un frigo abandonné plein de nourriture bizarre',
  'Compose de la musique avec des pets de différents animaux',
  'Sauve des peluches perdues dans un parc d\'attractions',
  'Course en portant des chaussettes dépareillées qui glissent',
  'Sculpte des mondes miniatures en pâte à modeler',
  'Bataille aérienne avec des pizzas qui volent vraiment',
  'Guide des fourmis dans un parcours d\'obstacles',
  'Provoque des bâillements contagieux chez tes adversaires',
  'Voyage à l\'intérieur d\'un réveil cassé pour le réparer',
  'Construis des tours de spaghetti les plus hautes possible',
  'Attrape des bulles géantes avant qu\'elles n\'éclatent',
  'Combat à coups de coussins dans un salon moelleux',
  'Fouille dans un tiroir secret plein d\'objets mystérieux',
  'Apprends des danses robotiques de plus en plus complexes',
  'Sauve des crayons de couleur qui perdent leur couleur',
  'Navigue dans un labyrinthe de miroirs déformants',
  'Compose des symphonies en mélangeant les couleurs',
  'Lance des marshmallows géants avec une catapulte',
  'Entraîne des hamsters à faire des acrobaties',
  'Sculpte des formes bizarres avec des matériaux étranges',
  'Explore l\'intérieur d\'une machine à laver en marche',
  'Creuse des villes souterraines avec des tunnels secrets',
  'Fais glisser des rondelles de hockey sur une patinoire',
  'Lance des tartes à la crème sur des cibles mouvantes',
  'Découvre les secrets cachés dans un placard magique',
  'Compose des mélodies harmonieuses avec des rots',
  'Réunis des chaussettes orphelines avec leurs paires',
  'Vole sur des tapis volants qui tombent en panne',
  'Prépare des potions qui pétillent et changent de couleur',
  'Bataille de boules de papier dans un bureau géant',
  'Entraîne des escargots à franchir des parcours ninja',
  'Construis des structures fragiles avec des allumettes',
  'Voyage dans un livre de recettes pour trouver des ingrédients',
  'Construis des ponts en bonbons qui ne fondent pas',
  'Pilote des voitures téléguidées sur des circuits impossibles',
  'Combat avec des plumes qui chatouillent tes ennemis',
  'Explore un grenier poussiéreux plein de trésors oubliés',
  'Chante du karaoke en imitant différents cris d\'animaux',
  'Rattrape des biscuits qui s\'échappent de leur boîte',
  'Voyage dans un tube de dentifrice pour le nettoyer',
  'Cultive des jardins impossibles avec des plantes magiques',
  'Lance des ballons à eau sur des cibles qui bougent',
  'Traverse un parcours d\'obstacles en chaussons glissants',
  'Construis des châteaux de cartes qui résistent au vent',
  'Explore les circuits d\'une calculatrice géante',
  'Assemble des fusées en carton qui volent vraiment',
  'Course en patins à roulettes sur des pistes sinueuses',
  'Combat avec des cotons-tiges géants comme des épées',
  'Fouille dans un sac à dos magique aux poches infinies',
  'Concours d\'imitations d\'animaux de plus en plus bizarres',
  'Sauve des gommes à effacer qui perdent leur pouvoir',
  'Nage dans un tube à essai rempli de liquide coloré',
  'Invente des machines à rêves pour endormir les gens',
  'Duel de brosses à dents dans une salle de bain géante',
  'Entraîne des tortues à faire du parcours ninja lent',
  'Réalise des tours de magie qui échouent de façon drôle',
  'Explore les mots d\'un dictionnaire qui prennent vie',
  'Construis des igloos dans un environnement tropical',
  'Course en équilibrant des plateaux repas pleins',
  'Combat avec des éponges mouillées qui glissent',
  'Découvre les outils secrets cachés dans une boîte',
  'Sculpte rapidement du savon avant qu\'il ne glisse',
  'Récupère des élastiques perdus dans tous les coins',
  'Voyage dans un taille-crayon pour comprendre son mécanisme',
  'Crée des parfums nauséabonds pour faire fuir les ennemis',
  'Combat à coups de coussins qui font des bruits bizarres',
  'Traverse un parcours d\'obstacles en pantoufles géantes',
  'Construis des structures délicates avec des cure-dents',
  'Explore les boutons d\'une télécommande géante',
  'Équilibre des maisons de cartes dans le vent',
  'Fais rouler des bouchons de liège sur des parcours',
  'Combat avec des serviettes humides qui claquent',
  'Fouille dans une trousse d\'école pleine de surprises',
  'Forme des pyramides humaines avec des personnages',
  'Redresse des trombones déformés pour les rendre utiles',
  'Nage dans un bocal à poissons comme un poisson',
  'Invente des machines à bulles avec des formes spéciales',
  'Combat à coups d\'oreillers géants et moelleux',
  'Entraîne des coccinelles à voler en formation',
  'Fais semblant d\'être une statue sans bouger',
  'Voyage dans les pages d\'un agenda pour changer les rendez-vous',
  'Construis des tours de dominos qui font des parcours',
  'Lance des bouchons de bouteille sur des cibles précises',
  'Combat avec des gants de toilette mouillés et savonneux',
  'Explore tous les tiroirs secrets d\'une cuisine',
  'Réalise des acrobaties en pyjama sur un lit géant',
  'Sauve des agrafes rouillées en les nettoyant',
  'Nage dans un pot de confiture géant et collant',
  'Fabrique des instruments de musique avec des objets bizarres',
  'Combat avec des chaussettes sales qui puent',
  'Guide des fourmis perdues dans un labyrinthe',
  'Fais des grimaces devant un miroir qui les déforme',
  'Explore les pages d\'un carnet de notes magique',
  'Construis des châteaux avec des livres empilés',
  'Lance des capsules de bouteilles comme des frisbees',
  'Combat avec des mouchoirs en papier qui volent',
  'Découvre les trésors cachés dans une boîte de rangement',
  'Danse avec un balai comme partenaire de danse',
  'Récupère des punaises perdues avant qu\'elles ne piquent',
  'Voyage dans un tube de rouge à lèvres coloré',
  'Sculpte des œuvres d\'art avec de la nourriture',
  'Combat avec des torchons de cuisine qui voltigent',
  'Entraîne des lézards miniatures à faire de l\'escalade',
  'Construis des ponts fragiles avec des pailles',
  'Voyage dans les mois d\'un calendrier magique',
  'Construis des ponts de spaghetti qui supportent du poids',
  'Fais rebondir des bouchons en liège sur des trampolines',
  'Combat avec des lingettes démaquillantes glissantes'
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
