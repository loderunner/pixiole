/**
 * Type pour les idées de jeux avec label court et description détaillée
 */
export type GameIdea = {
  label: string;
  description: string;
};

/**
 * Collection d'idées de jeux simples pour PICO-8
 * Chaque idée contient un label court et une description détaillée des mécaniques
 */
export const GAME_IDEAS: GameIdea[] = [
  {
    label: "Snake classique",
    description: "Un serpent qui grandit en mangeant des pommes sur un écran fermé. Le joueur contrôle le serpent avec les flèches pour collecter les pommes qui apparaissent aléatoirement. À chaque pomme mangée, le serpent grandit d'un segment et le score augmente. Le défi est d'éviter les bords de l'écran et son propre corps qui devient de plus en plus encombrant."
  },
  {
    label: "Breakout casse-briques",
    description: "Une balle qui rebondit pour détruire un mur de briques colorées. Le joueur contrôle une raquette en bas de l'écran pour renvoyer la balle vers les briques. Chaque brique détruite rapporte des points et certaines couleurs donnent des bonus. La balle accélère progressivement et le jeu se termine si elle tombe en bas de l'écran."
  },
  {
    label: "Tetris classique",
    description: "Des pièces de formes différentes tombent et doivent être empilées intelligemment. Le joueur fait tourner et déplace les pièces pour former des lignes complètes horizontales. Quand une ligne est complète, elle disparaît et rapporte des points. Le jeu accélère progressivement et se termine quand les pièces atteignent le haut de l'écran."
  },
  {
    label: "Pac-Man dans un labyrinthe",
    description: "Un personnage rond mange des points en évitant les fantômes colorés. Le joueur navigue dans un labyrinthe pour collecter tous les points tout en évitant les fantômes. Des super-pastilles permettent temporairement de manger les fantômes pour des bonus. Le niveau se termine quand tous les points sont collectés."
  },
  {
    label: "Frogger traverse la route",
    description: "Une grenouille traverse une route dangereuse en évitant les voitures. Le joueur doit chronométrer les mouvements pour passer entre les véhicules qui bougent. Il faut aussi traverser une rivière en sautant sur des rondins flottants. Le but est d'atteindre l'autre côté sans se faire écraser ou tomber à l'eau."
  },
  {
    label: "Space Invaders",
    description: "Un vaisseau tire sur des aliens qui descendent en formation. Le joueur contrôle le vaisseau en bas de l'écran qui peut se déplacer et tirer. Les aliens descendent lentement tout en tirant vers le joueur. Le but est d'éliminer tous les envahisseurs avant qu'ils n'atteignent le bas de l'écran."
  },
  {
    label: "Pong tennis",
    description: "Deux raquettes se renvoient une balle comme au tennis de table. Le joueur contrôle une raquette avec les flèches pour renvoyer la balle vers l'adversaire. Le premier à manquer la balle perd le point. La balle accélère et change d'angle selon l'endroit où elle touche la raquette."
  },
  {
    label: "Centipede qui descend",
    description: "Un mille-pattes descend en zigzag et il faut le détruire segment par segment. Le joueur contrôle un tireur en bas de l'écran qui peut se déplacer et tirer vers le haut. Le mille-pattes change de direction quand il touche un champignon ou un bord. Des araignées et des puces ajoutent des dangers supplémentaires."
  },
  {
    label: "Donkey Kong plateforme",
    description: "Un personnage grimpe des échelles en évitant les tonneaux qui roulent. Le joueur doit atteindre le sommet en sautant par-dessus les obstacles. Mario peut ramasser des marteaux pour détruire les tonneaux temporairement. Le but est de sauver la princesse en haut de la structure."
  },
  {
    label: "Missile Command défense",
    description: "Des missiles attaquent des villes qu'il faut protéger en tirant dessus. Le joueur contrôle des batteries de missiles pour intercepter les attaques ennemies. Les explosions créent des zones de destruction temporaires. Le jeu se termine quand toutes les villes sont détruites."
  },
  {
    label: "Asteroids dans l'espace",
    description: "Un vaisseau navigue dans un champ d'astéroïdes qu'il peut détruire. Le joueur contrôle un vaisseau qui peut tourner, avancer et tirer dans toutes les directions. Les gros astéroïdes se divisent en plus petits quand ils sont touchés. Des soucoupes volantes apparaissent parfois et tirent sur le joueur."
  },
  {
    label: "Pitfall aventure jungle",
    description: "Un aventurier court dans la jungle en évitant les obstacles et les animaux. Le joueur doit sauter par-dessus les fosses et éviter les crocodiles et les serpents. Des lianes permettent de se balancer au-dessus des dangers. L'objectif est de collecter tous les trésors dans un temps limité."
  },
  {
    label: "Dig Dug creuse tunnels",
    description: "Un personnage creuse des tunnels sous terre pour attraper des ennemis. Le joueur peut creuser dans toutes les directions pour créer des passages. Les ennemis peuvent être gonflés jusqu'à exploser ou écrasés par des rochers. Le niveau se termine quand tous les ennemis sont éliminés."
  },
  {
    label: "Q*bert saute sur cubes",
    description: "Un personnage orange saute sur des cubes pour changer leur couleur. Le joueur doit visiter tous les cubes d'une pyramide en sautant de l'un à l'autre. Des ennemis pourchassent Q*bert et peuvent le faire tomber dans le vide. Le niveau est terminé quand tous les cubes ont la bonne couleur."
  },
  {
    label: "Bomberman pose bombes",
    description: "Un personnage pose des bombes pour détruire des obstacles et des ennemis. Le joueur navigue dans un labyrinthe en plaçant stratégiquement des bombes. Les explosions détruisent les murs et les ennemis dans les directions cardinales. Il faut éviter d'être pris dans ses propres explosions."
  },
  {
    label: "Lemmings guide fourmis",
    description: "De petites créatures marchent droit devant et il faut les guider vers la sortie. Le joueur assigne des rôles spéciaux à certains lemmings pour modifier le chemin. Certains peuvent creuser, construire des ponts ou bloquer le passage. L'objectif est de sauver un minimum de lemmings avant la fin du temps."
  },
  {
    label: "Sokoban pousse caisses",
    description: "Un personnage pousse des caisses pour les placer sur des zones cibles. Le joueur ne peut que pousser les caisses, pas les tirer, ce qui nécessite de la stratégie. Il faut éviter de bloquer les caisses dans des coins inaccessibles. Le puzzle est résolu quand toutes les caisses sont sur les bonnes positions."
  },
  {
    label: "Bubble Bobble bulles",
    description: "Deux dragons crachent des bulles pour piéger les ennemis dedans. Le joueur peut ensuite faire éclater les bulles pour éliminer les ennemis. Des fruits apparaissent quand les ennemis sont détruits et donnent des points. Le niveau est terminé quand tous les ennemis sont éliminés."
  },
  {
    label: "Marble Madness bille",
    description: "Une bille roule dans un parcours 3D rempli d'obstacles et de précipices. Le joueur contrôle la direction de la bille qui obéit à la physique réaliste. Des boosters accélèrent la bille et des obstacles peuvent la ralentir. L'objectif est d'atteindre la ligne d'arrivée dans le temps imparti."
  },
  {
    label: "Joust oiseaux volants",
    description: "Des chevaliers sur des oiseaux volants se battent dans les airs. Le joueur contrôle un oiseau qui peut voler en battant des ailes frénétiquement. Les collisions par le haut éliminent les ennemis, par le bas font perdre une vie. Le niveau continue avec des vagues d'ennemis de plus en plus difficiles."
  },
  {
    label: "Defender scrolling horizontal",
    description: "Un vaisseau défend des humains contre des aliens dans un monde qui défile. Le joueur peut voler dans les deux directions et tirer sur les ennemis. Les aliens tentent d'enlever les humains et de les transformer en mutants. L'objectif est de protéger tous les humains tout en détruisant les vaisseaux ennemis."
  },
  {
    label: "Robotron tire multidirectionnel",
    description: "Un robot tire dans toutes les directions pour sauver des humains. Le joueur contrôle le mouvement avec un stick et la direction de tir avec un autre. Des robots ennemis tentent de détruire les humains qu'il faut sauver. Le score augmente en sauvant des humains et en détruisant les ennemis."
  },
  {
    label: "Tempest tunnel 3D",
    description: "Un vaisseau tire dans un tunnel 3D contre des ennemis qui remontent. Le joueur se déplace sur le bord du tunnel et tire vers le centre. Les ennemis remontent depuis le fond du tunnel avec des patterns différents. Il faut tous les éliminer avant qu'ils n'atteignent le bord du tunnel."
  },
  {
    label: "Galaga formation ennemis",
    description: "Des vaisseaux ennemis attaquent en formation et peuvent capturer votre vaisseau. Le joueur tire sur les formations d'aliens qui descendent en patterns. Certains ennemis peuvent capturer votre vaisseau avec un rayon tracteur. Si vous libérez votre vaisseau, vous doublez votre puissance de feu."
  },
  {
    label: "Manic Miner plateformes",
    description: "Un mineur collecte des objets dans des mines remplies d'obstacles mortels. Le joueur doit naviguer dans des niveaux de plateformes avec des ennemis qui patrouillent. Il faut collecter tous les objets avant que l'oxygène ne s'épuise. Les obstacles incluent des pics, des convoyeurs et des ennemis qui bougent selon des patterns."
  },
  {
    label: "Pengo pousse blocs glace",
    description: "Un pingouin pousse des blocs de glace pour écraser des ennemis. Le joueur peut pousser les blocs dans les quatre directions pour les faire glisser. Les ennemis sont détruits s'ils sont écrasés par un bloc en mouvement. Le niveau se termine quand tous les ennemis sont éliminés."
  },
  {
    label: "Berzerk labyrinthe tir",
    description: "Un humain tire sur des robots dans un labyrinthe électrifié. Le joueur navigue dans des salles remplies de robots qui tirent aussi. Les murs électrifiés tuent instantanément si on les touche. Un robot indestructible apparaît si on reste trop longtemps dans une salle."
  },
  {
    label: "Frenzy robots fous",
    description: "Des robots deviennent fous et s'entretuent dans un labyrinthe. Le joueur contrôle un survivant qui doit éviter les robots en panne. Les robots tirent dans toutes les directions et peuvent se détruire entre eux. L'objectif est de survivre le plus longtemps possible dans ce chaos."
  },
  {
    label: "Wizard of Wor labyrinthe",
    description: "Deux magiciens chassent des monstres dans un labyrinthe. Le joueur tire sur les créatures qui se cachent derrière les murs. Les monstres deviennent invisibles et plus rapides quand ils sont touchés. Le niveau bonus permet de tirer sur le Wizard of Wor lui-même."
  },
  {
    label: "Venture donjons",
    description: "Un aventurier explore des donjons pour voler des trésors gardés par des monstres. Le joueur navigue dans des salles remplies d'ennemis et de trésors. Il faut récupérer l'objet principal de chaque salle tout en évitant les monstres. Un monstre spécial apparaît si on reste trop longtemps dans une salle."
  }
];