/**
 * Game ideas for PICO-8 with classic mechanics
 * Each idea has a short description (for buttons) and a long description (for chat)
 */

export type GameIdea = {
  /** Short description shown on button */
  short: string;
  /** Full description sent to chat */
  long: string;
};

export const GAME_IDEAS: GameIdea[] = [
  {
    short: 'Un jeu de plateforme avec un ninja qui collecte des pièces',
    long: 'Un jeu de plateforme avec un ninja qui collecte des pièces. Le joueur doit sauter entre les plateformes, éviter les pics et les ennemis, et ramasser toutes les pièces pour débloquer la sortie. Les niveaux deviennent de plus en plus difficiles avec des plateformes mobiles et des ennemis plus rapides. Le ninja a une double-saut et peut rebondir sur les murs.',
  },
  {
    short: 'Un jeu de tir spatial où on détruit des astéroïdes',
    long: "Un jeu de tir spatial où on détruit des astéroïdes. Le vaisseau peut tourner et avancer dans toutes les directions, tirant des lasers pour briser les gros astéroïdes en plus petits. Les astéroïdes rebondissent sur les bords de l'écran et le joueur doit tous les détruire pour passer au niveau suivant. Des power-ups apparaissent parfois pour améliorer les armes ou donner des vies supplémentaires.",
  },
  {
    short: 'Un Snake moderne avec des obstacles et des bonus',
    long: "Un Snake moderne avec des obstacles et des bonus. Le serpent grandit en mangeant des pommes mais doit éviter les murs et sa propre queue. Des obstacles fixes apparaissent sur le terrain et des bonus spéciaux donnent des effets temporaires comme traverser les murs ou rétrécir. Le score augmente avec la longueur du serpent et la vitesse s'accélère progressivement.",
  },
  {
    short: 'Un Breakout avec des briques spéciales et des power-ups',
    long: "Un Breakout avec des briques spéciales et des power-ups. La balle rebondit sur la raquette pour détruire les briques colorées en haut de l'écran. Certaines briques nécessitent plusieurs coups, d'autres libèrent des power-ups qui agrandissent la raquette, donnent des balles multiples ou des lasers. Le joueur doit empêcher la balle de sortir par le bas tout en détruisant toutes les briques.",
  },
  {
    short: 'Un jeu de course vue du dessus avec des virages serrés',
    long: 'Un jeu de course vue du dessus avec des virages serrés. La voiture accélère et freine automatiquement, le joueur contrôle uniquement la direction pour négocier les virages. Le circuit défile vers le bas et le joueur doit éviter de sortir de la piste tout en dépassant les voitures adverses. Les temps au tour sont enregistrés et la vitesse augmente à chaque tour réussi.',
  },
  {
    short: 'Un jeu de puzzle avec des blocs qui tombent à aligner',
    long: "Un jeu de puzzle avec des blocs qui tombent à aligner. Des pièces de différentes couleurs tombent du haut et le joueur doit les faire tourner et les positionner pour créer des lignes horizontales complètes. Les lignes complètes disparaissent et rapportent des points, mais si les blocs atteignent le haut de l'écran, c'est game over. La vitesse de chute augmente progressivement et des pièces spéciales apparaissent parfois.",
  },
  {
    short: "Un jeu de défense de tour avec des vagues d'ennemis",
    long: "Un jeu de défense de tour avec des vagues d'ennemis. Les ennemis suivent un chemin fixe et le joueur place des tours qui tirent automatiquement dessus. Chaque ennemi tué rapporte de l'argent pour construire plus de tours ou les améliorer. Les vagues deviennent plus difficiles avec des ennemis plus rapides et résistants. Le joueur perd si trop d'ennemis atteignent la fin du chemin.",
  },
  {
    short: 'Un jeu de labyrinthe avec des clés et des portes',
    long: "Un jeu de labyrinthe avec des clés et des portes. Le joueur navigue dans un labyrinthe vu du dessus pour trouver la sortie. Certaines portes nécessitent des clés de couleur correspondante, et des ennemis patrouillent dans les couloirs. Le joueur peut pousser des blocs pour bloquer les passages ou révéler des objets cachés. Chaque niveau a un labyrinthe différent avec plus d'ennemis et de complexité.",
  },
  {
    short: 'Un jeu de match-3 avec des gemmes colorées',
    long: 'Un jeu de match-3 avec des gemmes colorées. Le joueur échange des gemmes adjacentes pour créer des lignes de 3 ou plus de la même couleur. Les gemmes alignées disparaissent et de nouvelles tombent pour les remplacer, créant des combos en chaîne. Des objectifs spécifiques doivent être atteints dans un nombre limité de mouvements ou de temps. Des gemmes spéciales avec des effets explosifs apparaissent lors de combos importants.',
  },
  {
    short: 'Un jeu de survie avec des zombies qui attaquent en vagues',
    long: 'Un jeu de survie avec des zombies qui attaquent en vagues. Le joueur se déplace librement et tire dans toutes les directions pour éliminer les zombies. Entre les vagues, il peut ramasser des armes et des munitions dispersées sur la carte. Les zombies deviennent plus nombreux et plus rapides à chaque vague. Le but est de survivre le plus longtemps possible en gérant ses munitions et sa position.',
  },
  {
    short: 'Un jeu de plateforme avec un robot qui peut se téléporter',
    long: 'Un jeu de plateforme avec un robot qui peut se téléporter. Le robot peut se téléporter sur de courtes distances pour traverser les obstacles et éviter les ennemis. Cette capacité a un temps de recharge et ne peut pas traverser les murs. Le joueur doit collecter des batteries pour alimenter ses systèmes et atteindre la sortie. Les niveaux incluent des plateformes mobiles, des lasers mortels et des puzzles nécessitant un bon timing.',
  },
  {
    short: "Un jeu d'action avec un magicien qui lance des sorts",
    long: "Un jeu d'action avec un magicien qui lance des sorts. Le magicien peut lancer différents sorts élémentaires (feu, glace, foudre) selon les touches pressées. Chaque sort a des effets différents sur les ennemis et l'environnement. Le mana se recharge lentement et le joueur doit gérer ses sorts strategiquement. Les boss ont des résistances spécifiques et nécessitent des stratégies adaptées.",
  },
  {
    short: 'Un jeu de réflexes avec des obstacles qui approchent',
    long: "Un jeu de réflexes avec des obstacles qui approchent. Le joueur contrôle un personnage qui court automatiquement vers l'avant et doit sauter ou glisser pour éviter les obstacles. Le rythme s'accélère progressivement et les patterns d'obstacles deviennent plus complexes. Des power-ups temporaires donnent des capacités spéciales comme voler ou être invincible. Le but est de parcourir la plus grande distance possible.",
  },
  {
    short: 'Un jeu de tir avec des ennemis qui descendent en formation',
    long: "Un jeu de tir avec des ennemis qui descendent en formation. Le vaisseau du joueur se déplace horizontalement en bas de l'écran et tire vers le haut. Les ennemis descendent en patterns organisés et tirent occasionnellement vers le joueur. Détruire certains ennemis libère des power-ups qui améliorent les armes. Le joueur doit survivre à plusieurs vagues d'ennemis de plus en plus difficiles.",
  },
  {
    short: 'Un jeu de puzzle avec des miroirs qui redirigent la lumière',
    long: 'Un jeu de puzzle avec des miroirs qui redirigent la lumière. Le joueur doit positionner des miroirs pour diriger un rayon laser vers la cible. Les miroirs peuvent être tournés et certains ont des propriétés spéciales comme diviser ou colorer le rayon. Les niveaux deviennent plus complexes avec plusieurs sources de lumière et des obstacles qui bloquent les rayons. La solution nécessite souvent de la logique et de la planification.',
  },
  {
    short: 'Un jeu de rythme où il faut appuyer sur les touches au bon moment',
    long: "Un jeu de rythme où il faut appuyer sur les touches au bon moment. Des symboles descendent vers une ligne de référence et le joueur doit presser les touches correspondantes quand ils l'atteignent. La précision du timing détermine le score et les enchaînements parfaits donnent des bonus. La musique et les effets visuels s'intensifient avec de bonnes performances. Différentes chansons offrent des patterns et des difficultés variées.",
  },
  {
    short: 'Un jeu de stratégie simple avec des unités à commander',
    long: "Un jeu de stratégie simple avec des unités à commander. Le joueur contrôle une petite armée et doit capturer des bases ennemies. Chaque unité a des forces et faiblesses différentes (infanterie, tanks, avions). Les bases produisent de nouvelles unités et génèrent des ressources. Le terrain affecte le mouvement et les combats. L'objectif est de détruire toutes les unités ennemies ou capturer leur base principale.",
  },
  {
    short: "Un jeu d'aventure avec des objets à collecter et combiner",
    long: "Un jeu d'aventure avec des objets à collecter et combiner. Le joueur explore des pièces connectées et interagit avec les objets pour résoudre des puzzles. Certains objets peuvent être combinés pour créer des outils utiles. Des énigmes bloquent la progression et nécessitent de trouver les bons objets ou indices. L'histoire se dévoile à travers les interactions et les découvertes, menant à plusieurs fins possibles.",
  },
  {
    short: 'Un jeu de course avec des power-ups sur le circuit',
    long: "Un jeu de course avec des power-ups sur le circuit. Les voitures courent sur un circuit avec des virages et des obstacles. Des power-ups sur la piste donnent des avantages temporaires comme la vitesse, l'invincibilité ou des projectiles. Le joueur peut attaquer les autres voitures ou les faire sortir de piste. Les positions changent constamment et la dernière ligne droite détermine souvent le gagnant.",
  },
  {
    short: 'Un jeu de golf minimaliste avec des trajectoires à calculer',
    long: "Un jeu de golf minimaliste avec des trajectoires à calculer. Le joueur ajuste l'angle et la puissance du tir pour faire entrer la balle dans le trou. Des obstacles comme des murs, des rampes et des téléporteurs modifient la trajectoire. Le vent et la gravité affectent le mouvement de la balle. Chaque parcours a un nombre optimal de coups et des médailles récompensent les bonnes performances.",
  },
  {
    short: "Un jeu de collecte d'objets avec un temps limité",
    long: "Un jeu de collecte d'objets avec un temps limité. Le joueur contrôle un personnage qui doit ramasser tous les objets dispersés sur l'écran avant la fin du temps imparti. Des ennemis bougent selon des patterns fixes et touchent le joueur lui fait perdre du temps. Certains objets valent plus de points mais sont plus difficiles à atteindre. Les niveaux suivants ont plus d'objets et moins de temps.",
  },
  {
    short: 'Un jeu de flipper avec des bumpers et des multiplicateurs',
    long: "Un jeu de flipper avec des bumpers et des multiplicateurs. La balle rebondit sur les bumpers et obstacles pour marquer des points. Les flippers en bas sont contrôlés par le joueur pour relancer la balle. Des cibles spéciales activent des modes bonus et des multiplicateurs de score. L'objectif est de marquer le plus de points possible avant de perdre toutes les balles.",
  },
  {
    short: 'Un jeu de missile command défendant des villes',
    long: "Un jeu de missile command défendant des villes. Des missiles ennemis tombent du ciel vers les villes en bas. Le joueur tire des missiles défensifs qui explosent à l'endroit ciblé pour intercepter les menaces. Les explosions détruisent les missiles dans leur rayon d'action. Le joueur doit protéger ses villes tout en gérant ses munitions limitées.",
  },
  {
    short: 'Un jeu de réflexion avec des blocs colorés à assembler',
    long: "Un jeu de réflexion avec des blocs colorés à assembler. Le joueur doit déplacer des blocs de couleur pour former des motifs ou des lignes spécifiques. Les blocs ne peuvent bouger que dans certaines directions et certains sont fixés. Chaque niveau présente un défi différent avec des contraintes uniques. La solution optimale nécessite de planifier plusieurs coups à l'avance.",
  },
  {
    short: "Un jeu de saut d'obstacles avec un rythme accéléré",
    long: "Un jeu de saut d'obstacles avec un rythme accéléré. Le personnage court automatiquement et le joueur doit sauter au bon moment pour éviter les obstacles. La vitesse augmente progressivement et les obstacles deviennent plus variés. Des power-ups occasionnels donnent des capacités temporaires comme le double saut. Le but est de parcourir la plus grande distance possible.",
  },
  {
    short: 'Un jeu de construction de ponts entre deux points',
    long: "Un jeu de construction de ponts entre deux points. Le joueur doit construire un pont solide avec des pièces limitées pour permettre à un véhicule de passer. La physique réaliste teste la solidité de la construction. Le budget limité force à optimiser l'utilisation des matériaux. Chaque niveau présente des défis différents comme des rivières plus larges ou des charges plus lourdes.",
  },
  {
    short: 'Un jeu de memory avec des cartes qui se retournent',
    long: 'Un jeu de memory avec des cartes qui se retournent. Les cartes sont disposées face cachée et le joueur doit les retourner deux par deux pour trouver les paires identiques. Les paires trouvées restent visibles et rapportent des points. Un nombre limité de tentatives ou un temps limité augmente la difficulté. Les niveaux suivants ont plus de cartes et des motifs plus complexes.',
  },
  {
    short: 'Un jeu de course de voitures avec des virages serrés',
    long: "Un jeu de course de voitures avec des virages serrés. Le joueur contrôle l'accélération et la direction de sa voiture sur un circuit vu du dessus. Sortir de la piste ralentit la voiture et les autres concurrents continuent de courir. Des zones de boost et des raccourcis cachés permettent de prendre l'avantage. L'objectif est de terminer premier sur plusieurs tours.",
  },
  {
    short: 'Un jeu de logique avec des interrupteurs et des portes',
    long: "Un jeu de logique avec des interrupteurs et des portes. Le joueur doit activer les bons interrupteurs pour ouvrir les portes et atteindre la sortie. Certains interrupteurs sont temporaires, d'autres inversent leur état. Des blocs peuvent être poussés sur les interrupteurs pour les maintenir actifs. La complexité augmente avec des circuits logiques plus sophistiqués.",
  },
  {
    short: "Un jeu de tir à l'arc avec des cibles mobiles",
    long: "Un jeu de tir à l'arc avec des cibles mobiles. Le joueur ajuste l'angle et la puissance pour toucher les cibles qui bougent. Le vent et la gravité affectent la trajectoire de la flèche. Certaines cibles valent plus de points mais sont plus difficiles à atteindre. Des obstacles peuvent bloquer ou dévier les flèches. Le défi est de marquer le maximum de points avec un nombre limité de flèches.",
  },
  {
    short: 'Un jeu de pêche avec différents types de poissons',
    long: 'Un jeu de pêche avec différents types de poissons. Le joueur lance sa ligne et doit attraper les poissons qui nagent à différentes profondeurs. Chaque type de poisson a une valeur différente et certains sont plus rares. La ligne a une résistance limitée et peut casser si le poisson est trop gros. Des appâts spéciaux attirent des poissons particuliers.',
  },
  {
    short: 'Un jeu de dés avec des combinaisons à réaliser',
    long: 'Un jeu de dés avec des combinaisons à réaliser. Le joueur lance plusieurs dés et doit obtenir certaines combinaisons pour marquer des points. Il peut relancer certains dés pour améliorer son score. Différentes combinaisons rapportent des points variables. Un nombre limité de lancers par tour force à faire des choix stratégiques.',
  },
  {
    short: 'Un jeu de billard simplifié avec des boules colorées',
    long: "Un jeu de billard simplifié avec des boules colorées. Le joueur ajuste l'angle et la force pour frapper la boule blanche et toucher les autres boules. L'objectif est de faire rentrer les boules dans les trous selon un ordre spécifique. Les rebonds sur les bandes permettent des coups indirects. Chaque niveau a une configuration différente de boules et de trous.",
  },
  {
    short: 'Un jeu de tower defense avec des ennemis en file',
    long: "Un jeu de tower defense avec des ennemis en file. Les ennemis suivent un chemin prédéfini et le joueur place des tours pour les arrêter. Chaque tour coûte des ressources gagnées en détruisant les ennemis. Les tours peuvent être améliorées pour plus d'efficacité. Si trop d'ennemis atteignent la fin, le joueur perd.",
  },
  {
    short: 'Un jeu de slider puzzle avec une image à reconstituer',
    long: "Un jeu de slider puzzle avec une image à reconstituer. Les pièces du puzzle peuvent glisser dans l'espace vide adjacent. Le joueur doit reconstituer l'image originale en déplaçant les pièces stratégiquement. Le nombre de mouvements est compté et les meilleures performances sont enregistrées. Différentes tailles de puzzle offrent des niveaux de difficulté variés.",
  },
  {
    short: 'Un jeu de parking avec des obstacles à éviter',
    long: "Un jeu de parking avec des obstacles à éviter. Le joueur doit manœuvrer sa voiture pour la garer dans l'espace désigné. Des obstacles fixes et mobiles rendent la tâche difficile. Toucher un obstacle fait recommencer le niveau. La voiture a une physique réaliste avec l'inertie et les rebonds. Chaque niveau a une configuration de parking différente.",
  },
  {
    short: 'Un jeu de survie zombie avec des munitions limitées',
    long: "Un jeu de survie zombie avec des munitions limitées. Le joueur est entouré de zombies qui avancent lentement vers lui. Il doit tirer avec précision pour économiser ses munitions. Des munitions supplémentaires apparaissent parfois au hasard. L'objectif est de survivre le plus longtemps possible en gérant ses ressources.",
  },
  {
    short: 'Un jeu de cuisine avec des recettes à suivre',
    long: "Un jeu de cuisine avec des recettes à suivre. Le joueur doit préparer des plats en suivant les instructions dans le bon ordre. Certains ingrédients doivent être préparés d'une manière spécifique. Un temps limité ajoute de la pression et les erreurs font perdre des points. Les recettes deviennent plus complexes avec plus d'étapes.",
  },
  {
    short: 'Un jeu de jardinage avec des plantes à faire pousser',
    long: 'Un jeu de jardinage avec des plantes à faire pousser. Le joueur plante des graines et doit les arroser au bon moment. Différentes plantes ont des besoins différents en eau et lumière. Les plantes matures rapportent des points et des graines pour planter plus. Des parasites peuvent attaquer les plantes et doivent être éliminés.',
  },
  {
    short: 'Un jeu de mots avec des lettres à assembler',
    long: "Un jeu de mots avec des lettres à assembler. Le joueur dispose d'un ensemble de lettres et doit former des mots valides. Plus le mot est long, plus il rapporte de points. Un temps limité ou un nombre de mots à trouver ajoute de la pression. Des lettres spéciales donnent des bonus de score.",
  },
  {
    short: 'Un jeu de course de chevaux avec des paris',
    long: "Un jeu de course de chevaux avec des paris. Le joueur mise sur les chevaux qu'il pense gagnants avant la course. Chaque cheval a des statistiques différentes qui affectent ses chances. Les gains dépendent des cotes et du classement final. Le joueur peut observer plusieurs courses pour apprendre les patterns.",
  },
  {
    short: 'Un jeu de Simon avec des séquences à mémoriser',
    long: 'Un jeu de Simon avec des séquences à mémoriser. Le jeu joue une séquence de couleurs et de sons que le joueur doit reproduire exactement. La séquence devient plus longue à chaque niveau réussi. Une erreur fait recommencer depuis le début. Les séquences rapides et complexes testent la mémoire et les réflexes.',
  },
  {
    short: 'Un jeu de bataille navale avec des bateaux cachés',
    long: "Un jeu de bataille navale avec des bateaux cachés. Le joueur doit deviner l'emplacement des bateaux ennemis sur une grille. Chaque tir révèle si c'est un coup au but ou dans l'eau. Les bateaux touchés laissent des indices sur leur orientation. L'objectif est de couler tous les bateaux avec le minimum de coups.",
  },
  {
    short: "Un jeu de gestion d'aquarium avec des poissons à nourrir",
    long: "Un jeu de gestion d'aquarium avec des poissons à nourrir. Le joueur doit maintenir l'équilibre de l'aquarium en nourrissant les poissons et nettoyant l'eau. Différents poissons ont des besoins différents. La suralimentation pollue l'eau et fait mourir les poissons. L'objectif est de faire prospérer l'aquarium le plus longtemps possible.",
  },
  {
    short: 'Un jeu de lancer de fléchettes avec des cibles précises',
    long: "Un jeu de lancer de fléchettes avec des cibles précises. Le joueur ajuste la trajectoire et la force pour toucher les zones qui rapportent le plus de points. Le vent et la distance affectent la précision. Certains modes de jeu demandent d'atteindre un score exact. Des tournois permettent de défier des adversaires virtuels.",
  },
  {
    short: 'Un jeu de dominos avec des chaînes à créer',
    long: "Un jeu de dominos avec des chaînes à créer. Le joueur place des dominos debout pour créer des réactions en chaîne spectaculaires. L'objectif est de faire tomber tous les dominos en poussant le premier. Des obstacles et des rampes permettent des chemins complexes. Le défi est de créer la chaîne la plus longue possible.",
  },
  {
    short: 'Un jeu de cartes solitaire avec des piles à organiser',
    long: "Un jeu de cartes solitaire avec des piles à organiser. Le joueur doit déplacer les cartes selon des règles spécifiques pour libérer toutes les cartes. Les cartes peuvent être empilées par couleur ou par valeur selon le mode. Certaines cartes sont bloquées par d'autres et doivent être révélées. L'objectif est de vider toutes les piles.",
  },
  {
    short: 'Un jeu de labyrinthe avec des murs qui bougent',
    long: "Un jeu de labyrinthe avec des murs qui bougent. Le joueur doit naviguer dans un labyrinthe dont les murs se déplacent selon des patterns. L'objectif est d'atteindre la sortie en évitant d'être bloqué. Certains murs bougent en fonction des actions du joueur. Le timing est crucial pour traverser les passages.",
  },
  {
    short: 'Un jeu de course de tortues avec des obstacles',
    long: "Un jeu de course de tortues avec des obstacles. Le joueur contrôle une tortue qui avance lentement mais sûrement. Des obstacles ralentissent ou bloquent le passage. La tortue peut rentrer dans sa carapace pour se protéger. L'objectif est d'arriver premier malgré la vitesse lente.",
  },
  {
    short: 'Un jeu de construction de robots avec des pièces',
    long: 'Un jeu de construction de robots avec des pièces. Le joueur assemble des pièces pour créer un robot fonctionnel. Chaque pièce a des propriétés différentes qui affectent les performances. Le robot doit accomplir des tâches spécifiques pour réussir le niveau. La créativité dans la construction influence le succès.',
  },
  {
    short: 'Un jeu de morpion avec des règles spéciales',
    long: "Un jeu de morpion avec des règles spéciales. Le jeu se joue sur une grille plus grande avec des règles modifiées. Certaines cases ont des effets spéciaux comme retourner les symboles. Le joueur doit adapter sa stratégie aux nouvelles règles. L'IA adverse devient plus intelligente à chaque niveau.",
  },
  {
    short: "Un jeu de tir aux pigeons d'argile avec des trajectoires",
    long: "Un jeu de tir aux pigeons d'argile avec des trajectoires. Les pigeons suivent des trajectoires prévisibles mais variées. Le joueur doit anticiper où tirer pour les toucher. Le vent et la distance affectent la précision. Des pigeons spéciaux rapportent plus de points mais sont plus difficiles à toucher.",
  },
  {
    short: 'Un jeu de casino avec une machine à sous',
    long: "Un jeu de casino avec une machine à sous. Le joueur mise des jetons virtuels et tire le levier pour faire tourner les rouleaux. Différentes combinaisons rapportent des gains variables. Des symboles spéciaux déclenchent des bonus. L'objectif est de maximiser ses gains tout en gérant son budget.",
  },
  {
    short: 'Un jeu de course à pied avec des haies à franchir',
    long: "Un jeu de course à pied avec des haies à franchir. Le joueur doit synchroniser ses sauts pour franchir les haies sans les toucher. Le rythme s'accélère progressivement et les haies deviennent plus hautes. Toucher une haie ralentit le coureur. L'objectif est de terminer la course en première position.",
  },
  {
    short: 'Un jeu de dessin avec des lignes à tracer',
    long: "Un jeu de dessin avec des lignes à tracer. Le joueur doit tracer des formes complexes sans lever le crayon. Certaines lignes ne peuvent être tracées qu'une seule fois. L'objectif est de compléter le dessin en respectant les contraintes. La précision et la planification sont essentielles.",
  },
  {
    short: "Un jeu de vol d'avion avec des anneaux à traverser",
    long: "Un jeu de vol d'avion avec des anneaux à traverser. Le joueur pilote un avion qui doit passer à travers des anneaux dans le bon ordre. Les anneaux sont placés à différentes altitudes et positions. Le temps est limité et l'avion consomme du carburant. La précision du pilotage détermine le score.",
  },
  {
    short: 'Un jeu de bowling avec des quilles à renverser',
    long: "Un jeu de bowling avec des quilles à renverser. Le joueur ajuste l'angle et la force de la boule pour faire un strike. Les quilles ont une physique réaliste et rebondissent les unes sur les autres. Différentes formations de quilles créent des défis variés. Le score cumulé détermine la performance.",
  },
  {
    short: 'Un jeu de fabrication de papier avec des formes à découper',
    long: "Un jeu de fabrication de papier avec des formes à découper. Le joueur doit découper le papier selon des modèles spécifiques. Les chutes de papier sont comptées et il faut minimiser le gaspillage. Des formes complexes nécessitent plusieurs étapes. L'efficacité et la précision sont récompensées.",
  },
  {
    short: 'Un jeu de tri postal avec des adresses à classer',
    long: 'Un jeu de tri postal avec des adresses à classer. Le joueur doit trier le courrier selon les codes postaux et les destinations. Un temps limité simule la pression du travail. Les erreurs de tri pénalisent le score. La vitesse et la précision sont essentielles pour réussir.',
  },
  {
    short: 'Un jeu de nettoyage de fenêtres avec des taches à enlever',
    long: 'Un jeu de nettoyage de fenêtres avec des taches à enlever. Le joueur doit nettoyer toutes les taches sans laisser de traces. Différents types de taches nécessitent des techniques différentes. Le temps et les produits de nettoyage sont limités. La propreté finale détermine le score.',
  },
  {
    short: 'Un jeu de réparation de pixels morts sur un écran',
    long: "Un jeu de réparation de pixels morts sur un écran. Le joueur doit rallumer les pixels défectueux en cliquant dessus dans le bon ordre. Certains pixels sont connectés et s'allument ensemble. Des circuits complexes nécessitent de comprendre les connections. L'objectif est de restaurer une image parfaite sans dépasser le nombre de clics autorisés.",
  },
  {
    short: 'Un jeu de cultivation de cristaux avec des formes géométriques',
    long: "Un jeu de cultivation de cristaux avec des formes géométriques. Le joueur place des germes de cristal qui grandissent selon des règles mathématiques. Les cristaux adjacents s'influencent mutuellement et créent des patterns. L'objectif est de créer des formes spécifiques en planifiant la croissance. Les cristaux peuvent fusionner ou se briser selon leur taille.",
  },
  {
    short: "Un jeu de navigation d'un robot dans un labyrinthe",
    long: "Un jeu de navigation d'un robot dans un labyrinthe. Le robot ne voit que les cases adjacentes et doit cartographier le labyrinthe. Le joueur programme des séquences de mouvements à l'avance. Le robot execute les commandes automatiquement jusqu'à rencontrer un obstacle. L'objectif est de trouver la sortie avec le minimum d'instructions.",
  },
  {
    short: 'Un jeu de contagion avec des cellules qui se propagent',
    long: "Un jeu de contagion avec des cellules qui se propagent. Le joueur contrôle un virus qui infecte les cellules voisines. Différents types de cellules résistent différemment. Le système immunitaire contre-attaque et élimine les cellules infectées. L'objectif est d'infecter tout l'organisme avant d'être détruit.",
  },
  {
    short: 'Un jeu de fusion de bulles avec des couleurs primaires',
    long: "Un jeu de fusion de bulles avec des couleurs primaires. Les bulles de couleurs primaires fusionnent pour créer de nouvelles couleurs. Les bulles secondaires peuvent être décomposées en leurs composants. L'objectif est de créer une couleur cible en manipulant les fusions. La physique des bulles ajoute un élément de timing.",
  },
];

/**
 * Returns a random selection of game ideas
 */
export function getRandomGameIdeas(count: number = 3): GameIdea[] {
  const shuffled = [...GAME_IDEAS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
