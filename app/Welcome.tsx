'use client';

import { useEffect, useState } from 'react';

import ChatArea from '@/src/ChatArea';

// Static list of 200 French game ideas
const GAME_IDEAS = [
  'Transforme ta chambre en labyrinthe géant',
  'Cuisine des potions magiques qui explosent',
  'Dirige un orchestre de robots dysfonctionnels',
  'Peins des graffitis qui prennent vie',
  'Gère une pizzeria sur Mars',
  'Résous des crimes avec des indices sonores',
  'Plonge dans les rêves des autres',
  'Contrôle la météo avec tes émotions',
  'Répare des jouets cassés dans une usine',
  'Dance pour réveiller des statues endormies',
  'Photographie des fantômes invisibles',
  'Jongle avec des planètes miniatures',
  'Nettoie les vitres de gratte-ciels volants',
  'Enseigne le français à des aliens',
  'Livre des colis dans des dimensions parallèles',
  'Compose de la musique avec des couleurs',
  'Élève des nuages comme des animaux de compagnie',
  'Répare des ponts qui flottent dans le vide',
  'Dessine des cartes de mondes imaginaires',
  'Collectionne des souvenirs perdus',
  'Dirige la circulation dans une ville de fourmis',
  'Fabrique des arcs-en-ciels sur commande',
  'Enquête sur des disparitions de chaussettes',
  'Organise des courses de bulles de savon',
  'Cultive un jardin de cristaux chantants',
  'Répare les cauchemars des enfants',
  "Navigue dans un océan de sirop d'érable",
  'Construis des maisons avec des notes de musique',
  'Dresse des dragons pour le service postal',
  'Manages une bibliothèque de livres vivants',
  'Organise des mariages entre couleurs',
  'Récupère des mots éparpillés par le vent',
  'Dirige un taxi pour voyageurs temporels',
  "Crée des parfums à partir d'émotions",
  "Répare des horloges qui marchent à l'envers",
  'Traduis les langages secrets des machines',
  'Organise des fêtes pour les objets solitaires',
  'Collecte des éclats de rire cristallisés',
  'Gère un hôtel pour les personnages de contes',
  "Fabrique des miroirs qui montrent l'avenir",
  'Entraine des ombres à danser le ballet',
  'Répare des télescopes pour voir les souvenirs',
  'Organise des déménagements entre galaxies',
  'Crée des vêtements tissés avec de la lumière',
  'Dirige une chorale de machines à laver',
  'Collectionne des fragments de conversations',
  'Gère une pharmacie de remèdes impossibles',
  'Construit des toboggans entre les nuages',
  'Enseigne la politesse aux virus informatiques',
  'Organise des concours de beauté pour cailloux',
  'Répare des cœurs brisés avec de la colle magique',
  'Dirige un restaurant où on mange du temps',
  'Collectionne des secrets murmurés par le vent',
  "Fabrique des parapluies contre la pluie d'étoiles",
  'Gère une blanchisserie pour les uniformes de super-héros',
  "Organise des tournois d'échecs avec des fantômes",
  'Répare des réveils qui sonnent dans le passé',
  'Cultive des plantes qui poussent vers le bas',
  'Dirige un cirque de particules subatomiques',
  'Collectionne des applaudissements dans des bocaux',
  "Fabrique des lunettes pour voir l'invisible",
  'Gère un spa pour robots fatigués',
  'Organise des courses de gouttes de pluie',
  'Répare des boussoles qui pointent vers les rêves',
  'Enseigne le yoga aux meubles stressés',
  "Dirige une agence de voyage vers l'enfance",
  'Collectionne des bâillements perdus',
  'Fabrique des coussins rembourrés de souvenirs',
  'Gère une école de vol pour chaussures',
  'Organise des concours de cache-cache cosmique',
  "Répare des téléphones qui appellent l'au-delà",
  'Cultive des légumes en forme de lettres',
  'Dirige un zoo de formes géométriques',
  'Collectionne des frissons dans des flacons',
  'Fabrique des escaliers vers nulle part',
  'Gère une piscine remplie de confettis',
  'Organise des spectacles pour un public de miroirs',
  'Répare des claviers qui tapent en poésie',
  'Enseigne la natation aux poissons en papier',
  'Dirige un cinéma qui projette des souvenirs',
  'Collectionne des silences dans des boîtes',
  "Fabrique des chaussures pour marcher sur l'eau",
  'Gère un parking pour nuages en visite',
  "Organise des fêtes d'anniversaire pour les nombres",
  'Répare des montres qui comptent les battements de cœur',
  "Cultive des fleurs qui fleurissent à l'envers",
  'Dirige une poste pour lettres non-écrites',
  "Collectionne des étincelles d'inspiration",
  'Fabrique des bridges entre les saisons',
  'Gère un garage pour véhicules imaginaires',
  'Organise des concours de sculpture avec des bulles',
  'Répare des compas qui indiquent le bonheur',
  'Enseigne la lecture aux panneaux routiers',
  'Dirige un tribunal pour conflits entre couleurs',
  'Collectionne des échos perdus dans des cavernes',
  "Fabrique des fenêtres vers d'autres époques",
  'Gère une laverie pour costumes de carnaval',
  'Organise des courses de papillons mécaniques',
  "Répare des thermomètres qui mesurent l'amour",
  'Cultive un potager de mini-planètes',
  "Dirige une banque d'émotions recyclées",
  'Collectionne des reflets dans des mares',
  'Fabrique des hamacs suspendus aux étoiles',
  'Gère un salon de coiffure pour poupées',
  'Organise des marathons de tortues turbo',
  'Répare des calculatrices qui comptent en rimes',
  'Enseigne la patience aux feux de circulation',
  'Dirige une agence de casting pour ombres',
  'Collectionne des parfums de saisons perdues',
  'Fabrique des toits ouvrants pour igloos',
  'Gère un refuge pour objets abandonnés',
  'Organise des bal masqués pour insectes',
  'Répare des pendules qui sonnent des mélodies',
  'Cultive des arbres qui produisent des bulles',
  'Dirige une fabrique de rêves sur mesure',
  'Collectionne des murmures dans des coquillages',
  'Fabrique des tapis volants de poche',
  'Gère un vestiaire pour déguisements magiques',
  'Organise des concours de ricochets sur les nuages',
  'Répare des balances qui pèsent les intentions',
  'Enseigne la danse aux réverbères timides',
  'Dirige une chocolaterie aux saveurs impossibles',
  'Collectionne des sourires dans des médaillons',
  "Fabrique des portes qui s'ouvrent sur l'été",
  'Gère un pressing pour costumes de théâtre',
  'Organise des tournois de pierre-papier-ciseaux temporels',
  'Répare des microscopes qui grossissent les sentiments',
  'Cultive des champignons lumineux dansants',
  'Dirige un orchestre de gouttes de rosée',
  'Collectionne des rayons de soleil en bocaux',
  'Fabrique des ascenseurs pour fourmis pressées',
  'Gère une crèche pour bébés dragons',
  'Organise des défilés de mode pour épouvantails',
  'Répare des loupes qui révèlent les secrets',
  "Enseigne l'origami aux feuilles d'automne",
  'Dirige un laboratoire de création de coïncidences',
  "Collectionne des battements d'ailes de papillon",
  'Fabrique des aimants à attrape-bonheur',
  'Gère un drive-in pour escargots motorisés',
  'Organise des concours de sculpture sur glace temporelle',
  "Répare des kaléidoscopes qui montrent l'âme",
  'Cultive des légumes qui chantent en chœur',
  'Dirige une académie de vol pour tapis',
  'Collectionne des éclaboussures de joie',
  'Fabrique des parachutes pour chute de confiance',
  'Gère un spa pour crayons de couleur usés',
  'Organise des courses de limaces turbo',
  'Répare des sabliers qui comptent les fou-rires',
  'Enseigne la méditation aux abeilles hyperactives',
  "Dirige une usine de fabrication d'arc-en-ciels",
  'Collectionne des chuchotements dans des fioles',
  'Fabrique des échelles pour atteindre les nuages',
  'Gère un refuge pour parapluies cassés',
  'Organise des concours de dessin avec les pieds',
  "Répare des boussoles qui pointent vers l'amitié",
  'Cultive des fleurs qui éclosent au rythme de la musique',
  'Dirige un cabinet de consultation pour objets déprimés',
  'Collectionne des chatouillements dans des plumes',
  'Fabrique des lunettes de soleil pour vampires',
  'Gère une école de conduite pour trottinettes volantes',
  "Organise des tournois de cache-cache avec l'invisible",
  'Répare des réveille-matin qui sonnent en chantant',
  "Enseigne l'art du mime aux statues",
  "Dirige une pâtisserie spécialisée en gâteaux d'anniversaire pour robots",
  'Collectionne des ombres colorées au coucher du soleil',
  "Fabrique des trampolines pour sauter jusqu'aux étoiles",
  'Gère un hôtel pour personnages de bande dessinée en vacances',
  'Organise des marathons de lecture pour livres timides',
  'Répare des télescopes qui espionnent les rêves nocturnes',
  'Cultive un jardin de cactus qui font des câlins',
  "Dirige une troupe de théâtre composée d'ombres chinoises",
  'Collectionne des fous rires contagieux dans des bulles',
  'Fabrique des chaussettes qui ne se perdent jamais',
  'Gère un parking souterrain pour monstres sous le lit',
  'Organise des concours de beatbox pour robots',
  'Répare des horloges qui retardent le temps pour les amoureux',
  'Enseigne la politesse aux notifications smartphones',
  'Dirige une agence matrimoniale pour chaussettes célibataires',
  'Collectionne des pets de licorne dans des sachets parfumés',
  "Fabrique des toboggans en spirale vers d'autres dimensions",
  "Gère un service de livraison express pour lettres d'amour",
  'Organise des concours de jonglage avec des bulles de savon',
  'Répare des machines à café qui servent des souvenirs liquides',
  'Cultive des arbres dont les feuilles sont des partitions musicales',
  'Dirige un zoo où les visiteurs sont en cage',
  'Collectionne des bâillements synchronisés dans des aquariums',
  'Fabrique des ailes détachables pour pingouins aventuriers',
  'Gère une pharmacie vendant des pilules anti-nostalgie',
  'Organise des courses de relais entre générations',
  'Répare des GPS qui donnent des directions vers le bonheur',
  'Enseigne le breakdance aux mannequins de magasin',
  'Dirige un service de nettoyage de conscience',
  "Collectionne des applaudissements d'une seule main",
  'Fabrique des grille-pain qui impriment des poèmes sur les tartines',
  'Gère un cinéma drive-in pour fantômes nostalgiques',
  'Organise des olympiades de procrastination créative',
  'Répare des dictionnaires qui inventent de nouveaux mots',
  'Cultive des pastèques carrées qui poussent dans des cubes',
  'Dirige une école de magie pour prestidigitateurs ratés',
  'Collectionne des moments de silence parfait',
  'Fabrique des couvertures tissées avec des berceuses',
  'Gère un service de dépannage pour cauchemars récurrents',
  'Organise des concours de grimaces pour miroirs déformants',
  'Répare des montres qui ralentissent pendant les vacances',
  'Enseigne la natation synchronisée aux canards en plastique',
  'Dirige un restaurant où on mange avec les oreilles',
  'Collectionne des éternuements dans des mouchoirs magiques',
  "Fabrique des clés qui ouvrent des portes vers l'enfance",
  'Gère un atelier de réparation pour peluches déprimées',
  'Organise des séances de thérapie de groupe pour crayons cassés',
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
