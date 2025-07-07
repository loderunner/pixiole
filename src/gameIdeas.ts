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
    short: "Un jeu de plateforme avec un ninja qui collecte des pièces",
    long: "Un jeu de plateforme avec un ninja qui collecte des pièces. Le joueur doit sauter entre les plateformes, éviter les pics et les ennemis, et ramasser toutes les pièces pour débloquer la sortie. Les niveaux deviennent de plus en plus difficiles avec des plateformes mobiles et des ennemis plus rapides. Le ninja a une double-saut et peut rebondir sur les murs."
  },
  {
    short: "Un jeu de tir spatial où on détruit des astéroïdes",
    long: "Un jeu de tir spatial où on détruit des astéroïdes. Le vaisseau peut tourner et avancer dans toutes les directions, tirant des lasers pour briser les gros astéroïdes en plus petits. Les astéroïdes rebondissent sur les bords de l'écran et le joueur doit tous les détruire pour passer au niveau suivant. Des power-ups apparaissent parfois pour améliorer les armes ou donner des vies supplémentaires."
  },
  {
    short: "Un Snake moderne avec des obstacles et des bonus",
    long: "Un Snake moderne avec des obstacles et des bonus. Le serpent grandit en mangeant des pommes mais doit éviter les murs et sa propre queue. Des obstacles fixes apparaissent sur le terrain et des bonus spéciaux donnent des effets temporaires comme traverser les murs ou rétrécir. Le score augmente avec la longueur du serpent et la vitesse s'accélère progressivement."
  },
  {
    short: "Un Breakout avec des briques spéciales et des power-ups",
    long: "Un Breakout avec des briques spéciales et des power-ups. La balle rebondit sur la raquette pour détruire les briques colorées en haut de l'écran. Certaines briques nécessitent plusieurs coups, d'autres libèrent des power-ups qui agrandissent la raquette, donnent des balles multiples ou des lasers. Le joueur doit empêcher la balle de sortir par le bas tout en détruisant toutes les briques."
  },
  {
    short: "Un jeu de course vue du dessus avec des virages serrés",
    long: "Un jeu de course vue du dessus avec des virages serrés. La voiture accélère et freine automatiquement, le joueur contrôle uniquement la direction pour négocier les virages. Le circuit défile vers le bas et le joueur doit éviter de sortir de la piste tout en dépassant les voitures adverses. Les temps au tour sont enregistrés et la vitesse augmente à chaque tour réussi."
  },
  {
    short: "Un jeu de puzzle avec des blocs qui tombent à aligner",
    long: "Un jeu de puzzle avec des blocs qui tombent à aligner. Des pièces de différentes couleurs tombent du haut et le joueur doit les faire tourner et les positionner pour créer des lignes horizontales complètes. Les lignes complètes disparaissent et rapportent des points, mais si les blocs atteignent le haut de l'écran, c'est game over. La vitesse de chute augmente progressivement et des pièces spéciales apparaissent parfois."
  },
  {
    short: "Un jeu de défense de tour avec des vagues d'ennemis",
    long: "Un jeu de défense de tour avec des vagues d'ennemis. Les ennemis suivent un chemin fixe et le joueur place des tours qui tirent automatiquement dessus. Chaque ennemi tué rapporte de l'argent pour construire plus de tours ou les améliorer. Les vagues deviennent plus difficiles avec des ennemis plus rapides et résistants. Le joueur perd si trop d'ennemis atteignent la fin du chemin."
  },
  {
    short: "Un jeu de labyrinthe avec des clés et des portes",
    long: "Un jeu de labyrinthe avec des clés et des portes. Le joueur navigue dans un labyrinthe vu du dessus pour trouver la sortie. Certaines portes nécessitent des clés de couleur correspondante, et des ennemis patrouillent dans les couloirs. Le joueur peut pousser des blocs pour bloquer les passages ou révéler des objets cachés. Chaque niveau a un labyrinthe différent avec plus d'ennemis et de complexité."
  },
  {
    short: "Un jeu de match-3 avec des gemmes colorées",
    long: "Un jeu de match-3 avec des gemmes colorées. Le joueur échange des gemmes adjacentes pour créer des lignes de 3 ou plus de la même couleur. Les gemmes alignées disparaissent et de nouvelles tombent pour les remplacer, créant des combos en chaîne. Des objectifs spécifiques doivent être atteints dans un nombre limité de mouvements ou de temps. Des gemmes spéciales avec des effets explosifs apparaissent lors de combos importants."
  },
  {
    short: "Un jeu de survie avec des zombies qui attaquent en vagues",
    long: "Un jeu de survie avec des zombies qui attaquent en vagues. Le joueur se déplace librement et tire dans toutes les directions pour éliminer les zombies. Entre les vagues, il peut ramasser des armes et des munitions dispersées sur la carte. Les zombies deviennent plus nombreux et plus rapides à chaque vague. Le but est de survivre le plus longtemps possible en gérant ses munitions et sa position."
  },
  {
    short: "Un jeu de plateforme avec un robot qui peut se téléporter",
    long: "Un jeu de plateforme avec un robot qui peut se téléporter. Le robot peut se téléporter sur de courtes distances pour traverser les obstacles et éviter les ennemis. Cette capacité a un temps de recharge et ne peut pas traverser les murs. Le joueur doit collecter des batteries pour alimenter ses systèmes et atteindre la sortie. Les niveaux incluent des plateformes mobiles, des lasers mortels et des puzzles nécessitant un bon timing."
  },
  {
    short: "Un jeu d'action avec un magicien qui lance des sorts",
    long: "Un jeu d'action avec un magicien qui lance des sorts. Le magicien peut lancer différents sorts élémentaires (feu, glace, foudre) selon les touches pressées. Chaque sort a des effets différents sur les ennemis et l'environnement. Le mana se recharge lentement et le joueur doit gérer ses sorts strategiquement. Les boss ont des résistances spécifiques et nécessitent des stratégies adaptées."
  },
  {
    short: "Un jeu de réflexes avec des obstacles qui approchent",
    long: "Un jeu de réflexes avec des obstacles qui approchent. Le joueur contrôle un personnage qui court automatiquement vers l'avant et doit sauter ou glisser pour éviter les obstacles. Le rythme s'accélère progressivement et les patterns d'obstacles deviennent plus complexes. Des power-ups temporaires donnent des capacités spéciales comme voler ou être invincible. Le but est de parcourir la plus grande distance possible."
  },
  {
    short: "Un jeu de tir avec des ennemis qui descendent en formation",
    long: "Un jeu de tir avec des ennemis qui descendent en formation. Le vaisseau du joueur se déplace horizontalement en bas de l'écran et tire vers le haut. Les ennemis descendent en patterns organisés et tirent occasionnellement vers le joueur. Détruire certains ennemis libère des power-ups qui améliorent les armes. Le joueur doit survivre à plusieurs vagues d'ennemis de plus en plus difficiles."
  },
  {
    short: "Un jeu de puzzle avec des miroirs qui redirigent la lumière",
    long: "Un jeu de puzzle avec des miroirs qui redirigent la lumière. Le joueur doit positionner des miroirs pour diriger un rayon laser vers la cible. Les miroirs peuvent être tournés et certains ont des propriétés spéciales comme diviser ou colorer le rayon. Les niveaux deviennent plus complexes avec plusieurs sources de lumière et des obstacles qui bloquent les rayons. La solution nécessite souvent de la logique et de la planification."
  },
  {
    short: "Un jeu de rythme où il faut appuyer sur les touches au bon moment",
    long: "Un jeu de rythme où il faut appuyer sur les touches au bon moment. Des symboles descendent vers une ligne de référence et le joueur doit presser les touches correspondantes quand ils l'atteignent. La précision du timing détermine le score et les enchaînements parfaits donnent des bonus. La musique et les effets visuels s'intensifient avec de bonnes performances. Différentes chansons offrent des patterns et des difficultés variées."
  },
  {
    short: "Un jeu de stratégie simple avec des unités à commander",
    long: "Un jeu de stratégie simple avec des unités à commander. Le joueur contrôle une petite armée et doit capturer des bases ennemies. Chaque unité a des forces et faiblesses différentes (infanterie, tanks, avions). Les bases produisent de nouvelles unités et génèrent des ressources. Le terrain affecte le mouvement et les combats. L'objectif est de détruire toutes les unités ennemies ou capturer leur base principale."
  },
  {
    short: "Un jeu d'aventure avec des objets à collecter et combiner",
    long: "Un jeu d'aventure avec des objets à collecter et combiner. Le joueur explore des pièces connectées et interagit avec les objets pour résoudre des puzzles. Certains objets peuvent être combinés pour créer des outils utiles. Des énigmes bloquent la progression et nécessitent de trouver les bons objets ou indices. L'histoire se dévoile à travers les interactions et les découvertes, menant à plusieurs fins possibles."
  },
  {
    short: "Un jeu de course avec des power-ups sur le circuit",
    long: "Un jeu de course avec des power-ups sur le circuit. Les voitures courent sur un circuit avec des virages et des obstacles. Des power-ups sur la piste donnent des avantages temporaires comme la vitesse, l'invincibilité ou des projectiles. Le joueur peut attaquer les autres voitures ou les faire sortir de piste. Les positions changent constamment et la dernière ligne droite détermine souvent le gagnant."
  },
  {
    short: "Un jeu de golf minimaliste avec des trajectoires à calculer",
    long: "Un jeu de golf minimaliste avec des trajectoires à calculer. Le joueur ajuste l'angle et la puissance du tir pour faire entrer la balle dans le trou. Des obstacles comme des murs, des rampes et des téléporteurs modifient la trajectoire. Le vent et la gravité affectent le mouvement de la balle. Chaque parcours a un nombre optimal de coups et des médailles récompensent les bonnes performances."
  },
  {
    short: "Un jeu de collecte d'objets avec un temps limité",
    long: "Un jeu de collecte d'objets avec un temps limité. Le joueur contrôle un personnage qui doit ramasser tous les objets dispersés sur l'écran avant la fin du temps imparti. Des ennemis bougent selon des patterns fixes et touchent le joueur lui fait perdre du temps. Certains objets valent plus de points mais sont plus difficiles à atteindre. Les niveaux suivants ont plus d'objets et moins de temps."
  },
  {
    short: "Un jeu de flipper avec des bumpers et des multiplicateurs",
    long: "Un jeu de flipper avec des bumpers et des multiplicateurs. La balle rebondit sur les bumpers et obstacles pour marquer des points. Les flippers en bas sont contrôlés par le joueur pour relancer la balle. Des cibles spéciales activent des modes bonus et des multiplicateurs de score. L'objectif est de marquer le plus de points possible avant de perdre toutes les balles."
  },
  {
    short: "Un jeu de missile command défendant des villes",
    long: "Un jeu de missile command défendant des villes. Des missiles ennemis tombent du ciel vers les villes en bas. Le joueur tire des missiles défensifs qui explosent à l'endroit ciblé pour intercepter les menaces. Les explosions détruisent les missiles dans leur rayon d'action. Le joueur doit protéger ses villes tout en gérant ses munitions limitées."
  },
  {
    short: "Un jeu de réflexion avec des blocs colorés à assembler",
    long: "Un jeu de réflexion avec des blocs colorés à assembler. Le joueur doit déplacer des blocs de couleur pour former des motifs ou des lignes spécifiques. Les blocs ne peuvent bouger que dans certaines directions et certains sont fixés. Chaque niveau présente un défi différent avec des contraintes uniques. La solution optimale nécessite de planifier plusieurs coups à l'avance."
  },
  {
    short: "Un jeu de saut d'obstacles avec un rythme accéléré",
    long: "Un jeu de saut d'obstacles avec un rythme accéléré. Le personnage court automatiquement et le joueur doit sauter au bon moment pour éviter les obstacles. La vitesse augmente progressivement et les obstacles deviennent plus variés. Des power-ups occasionnels donnent des capacités temporaires comme le double saut. Le but est de parcourir la plus grande distance possible."
  },
  {
    short: "Un jeu de construction de ponts entre deux points",
    long: "Un jeu de construction de ponts entre deux points. Le joueur doit construire un pont solide avec des pièces limitées pour permettre à un véhicule de passer. La physique réaliste teste la solidité de la construction. Le budget limité force à optimiser l'utilisation des matériaux. Chaque niveau présente des défis différents comme des rivières plus larges ou des charges plus lourdes."
  },
  {
    short: "Un jeu de memory avec des cartes qui se retournent",
    long: "Un jeu de memory avec des cartes qui se retournent. Les cartes sont disposées face cachée et le joueur doit les retourner deux par deux pour trouver les paires identiques. Les paires trouvées restent visibles et rapportent des points. Un nombre limité de tentatives ou un temps limité augmente la difficulté. Les niveaux suivants ont plus de cartes et des motifs plus complexes."
  },
  {
    short: "Un jeu de course de voitures avec des virages serrés",
    long: "Un jeu de course de voitures avec des virages serrés. Le joueur contrôle l'accélération et la direction de sa voiture sur un circuit vu du dessus. Sortir de la piste ralentit la voiture et les autres concurrents continuent de courir. Des zones de boost et des raccourcis cachés permettent de prendre l'avantage. L'objectif est de terminer premier sur plusieurs tours."
  },
  {
    short: "Un jeu de logique avec des interrupteurs et des portes",
    long: "Un jeu de logique avec des interrupteurs et des portes. Le joueur doit activer les bons interrupteurs pour ouvrir les portes et atteindre la sortie. Certains interrupteurs sont temporaires, d'autres inversent leur état. Des blocs peuvent être poussés sur les interrupteurs pour les maintenir actifs. La complexité augmente avec des circuits logiques plus sophistiqués."
  },
  {
    short: "Un jeu de tir à l'arc avec des cibles mobiles",
    long: "Un jeu de tir à l'arc avec des cibles mobiles. Le joueur ajuste l'angle et la puissance pour toucher les cibles qui bougent. Le vent et la gravité affectent la trajectoire de la flèche. Certaines cibles valent plus de points mais sont plus difficiles à atteindre. Des obstacles peuvent bloquer ou dévier les flèches. Le défi est de marquer le maximum de points avec un nombre limité de flèches."
  },
  {
    short: "Un jeu de pêche avec différents types de poissons",
    long: "Un jeu de pêche avec différents types de poissons. Le joueur lance sa ligne et doit attraper les poissons qui nagent à différentes profondeurs. Chaque type de poisson a une valeur différente et certains sont plus rares. La ligne a une résistance limitée et peut casser si le poisson est trop gros. Des appâts spéciaux attirent des poissons particuliers."
  },
  {
    short: "Un jeu de dés avec des combinaisons à réaliser",
    long: "Un jeu de dés avec des combinaisons à réaliser. Le joueur lance plusieurs dés et doit obtenir certaines combinaisons pour marquer des points. Il peut relancer certains dés pour améliorer son score. Différentes combinaisons rapportent des points variables. Un nombre limité de lancers par tour force à faire des choix stratégiques."
  },
  {
    short: "Un jeu de billard simplifié avec des boules colorées",
    long: "Un jeu de billard simplifié avec des boules colorées. Le joueur ajuste l'angle et la force pour frapper la boule blanche et toucher les autres boules. L'objectif est de faire rentrer les boules dans les trous selon un ordre spécifique. Les rebonds sur les bandes permettent des coups indirects. Chaque niveau a une configuration différente de boules et de trous."
  },
  {
    short: "Un jeu de tower defense avec des ennemis en file",
    long: "Un jeu de tower defense avec des ennemis en file. Les ennemis suivent un chemin prédéfini et le joueur place des tours pour les arrêter. Chaque tour coûte des ressources gagnées en détruisant les ennemis. Les tours peuvent être améliorées pour plus d'efficacité. Si trop d'ennemis atteignent la fin, le joueur perd."
  },
  {
    short: "Un jeu de slider puzzle avec une image à reconstituer",
    long: "Un jeu de slider puzzle avec une image à reconstituer. Les pièces du puzzle peuvent glisser dans l'espace vide adjacent. Le joueur doit reconstituer l'image originale en déplaçant les pièces stratégiquement. Le nombre de mouvements est compté et les meilleures performances sont enregistrées. Différentes tailles de puzzle offrent des niveaux de difficulté variés."
  },
  {
    short: "Un jeu de parking avec des obstacles à éviter",
    long: "Un jeu de parking avec des obstacles à éviter. Le joueur doit manœuvrer sa voiture pour la garer dans l'espace désigné. Des obstacles fixes et mobiles rendent la tâche difficile. Toucher un obstacle fait recommencer le niveau. La voiture a une physique réaliste avec l'inertie et les rebonds. Chaque niveau a une configuration de parking différente."
  },
  {
    short: "Un jeu de survie zombie avec des munitions limitées",
    long: "Un jeu de survie zombie avec des munitions limitées. Le joueur est entouré de zombies qui avancent lentement vers lui. Il doit tirer avec précision pour économiser ses munitions. Des munitions supplémentaires apparaissent parfois au hasard. L'objectif est de survivre le plus longtemps possible en gérant ses ressources."
  },
  {
    short: "Un jeu de cuisine avec des recettes à suivre",
    long: "Un jeu de cuisine avec des recettes à suivre. Le joueur doit préparer des plats en suivant les instructions dans le bon ordre. Certains ingrédients doivent être préparés d'une manière spécifique. Un temps limité ajoute de la pression et les erreurs font perdre des points. Les recettes deviennent plus complexes avec plus d'étapes."
  },
  {
    short: "Un jeu de jardinage avec des plantes à faire pousser",
    long: "Un jeu de jardinage avec des plantes à faire pousser. Le joueur plante des graines et doit les arroser au bon moment. Différentes plantes ont des besoins différents en eau et lumière. Les plantes matures rapportent des points et des graines pour planter plus. Des parasites peuvent attaquer les plantes et doivent être éliminés."
  },
  {
    short: "Un jeu de mots avec des lettres à assembler",
    long: "Un jeu de mots avec des lettres à assembler. Le joueur dispose d'un ensemble de lettres et doit former des mots valides. Plus le mot est long, plus il rapporte de points. Un temps limité ou un nombre de mots à trouver ajoute de la pression. Des lettres spéciales donnent des bonus de score."
  },
  {
    short: "Un jeu de course de chevaux avec des paris",
    long: "Un jeu de course de chevaux avec des paris. Le joueur mise sur les chevaux qu'il pense gagnants avant la course. Chaque cheval a des statistiques différentes qui affectent ses chances. Les gains dépendent des cotes et du classement final. Le joueur peut observer plusieurs courses pour apprendre les patterns."
  },
  {
    short: "Un jeu de Simon avec des séquences à mémoriser",
    long: "Un jeu de Simon avec des séquences à mémoriser. Le jeu joue une séquence de couleurs et de sons que le joueur doit reproduire exactement. La séquence devient plus longue à chaque niveau réussi. Une erreur fait recommencer depuis le début. Les séquences rapides et complexes testent la mémoire et les réflexes."
  },
  {
    short: "Un jeu de bataille navale avec des bateaux cachés",
    long: "Un jeu de bataille navale avec des bateaux cachés. Le joueur doit deviner l'emplacement des bateaux ennemis sur une grille. Chaque tir révèle si c'est un coup au but ou dans l'eau. Les bateaux touchés laissent des indices sur leur orientation. L'objectif est de couler tous les bateaux avec le minimum de coups."
  },
  {
    short: "Un jeu de gestion d'aquarium avec des poissons à nourrir",
    long: "Un jeu de gestion d'aquarium avec des poissons à nourrir. Le joueur doit maintenir l'équilibre de l'aquarium en nourrissant les poissons et nettoyant l'eau. Différents poissons ont des besoins différents. La suralimentation pollue l'eau et fait mourir les poissons. L'objectif est de faire prospérer l'aquarium le plus longtemps possible."
  },
  {
    short: "Un jeu de lancer de fléchettes avec des cibles précises",
    long: "Un jeu de lancer de fléchettes avec des cibles précises. Le joueur ajuste la trajectoire et la force pour toucher les zones qui rapportent le plus de points. Le vent et la distance affectent la précision. Certains modes de jeu demandent d'atteindre un score exact. Des tournois permettent de défier des adversaires virtuels."
  },
  {
    short: "Un jeu de dominos avec des chaînes à créer",
    long: "Un jeu de dominos avec des chaînes à créer. Le joueur place des dominos debout pour créer des réactions en chaîne spectaculaires. L'objectif est de faire tomber tous les dominos en poussant le premier. Des obstacles et des rampes permettent des chemins complexes. Le défi est de créer la chaîne la plus longue possible."
  },
  {
    short: "Un jeu de cartes solitaire avec des piles à organiser",
    long: "Un jeu de cartes solitaire avec des piles à organiser. Le joueur doit déplacer les cartes selon des règles spécifiques pour libérer toutes les cartes. Les cartes peuvent être empilées par couleur ou par valeur selon le mode. Certaines cartes sont bloquées par d'autres et doivent être révélées. L'objectif est de vider toutes les piles."
  },
  {
    short: "Un jeu de labyrinthe avec des murs qui bougent",
    long: "Un jeu de labyrinthe avec des murs qui bougent. Le joueur doit naviguer dans un labyrinthe dont les murs se déplacent selon des patterns. L'objectif est d'atteindre la sortie en évitant d'être bloqué. Certains murs bougent en fonction des actions du joueur. Le timing est crucial pour traverser les passages."
  },
  {
    short: "Un jeu de course de tortues avec des obstacles",
    long: "Un jeu de course de tortues avec des obstacles. Le joueur contrôle une tortue qui avance lentement mais sûrement. Des obstacles ralentissent ou bloquent le passage. La tortue peut rentrer dans sa carapace pour se protéger. L'objectif est d'arriver premier malgré la vitesse lente."
  },
  {
    short: "Un jeu de construction de robots avec des pièces",
    long: "Un jeu de construction de robots avec des pièces. Le joueur assemble des pièces pour créer un robot fonctionnel. Chaque pièce a des propriétés différentes qui affectent les performances. Le robot doit accomplir des tâches spécifiques pour réussir le niveau. La créativité dans la construction influence le succès."
  },
  {
    short: "Un jeu de morpion avec des règles spéciales",
    long: "Un jeu de morpion avec des règles spéciales. Le jeu se joue sur une grille plus grande avec des règles modifiées. Certaines cases ont des effets spéciaux comme retourner les symboles. Le joueur doit adapter sa stratégie aux nouvelles règles. L'IA adverse devient plus intelligente à chaque niveau."
  },
  {
    short: "Un jeu de tir aux pigeons d'argile avec des trajectoires",
    long: "Un jeu de tir aux pigeons d'argile avec des trajectoires. Les pigeons suivent des trajectoires prévisibles mais variées. Le joueur doit anticiper où tirer pour les toucher. Le vent et la distance affectent la précision. Des pigeons spéciaux rapportent plus de points mais sont plus difficiles à toucher."
  },
  {
    short: "Un jeu de casino avec une machine à sous",
    long: "Un jeu de casino avec une machine à sous. Le joueur mise des jetons virtuels et tire le levier pour faire tourner les rouleaux. Différentes combinaisons rapportent des gains variables. Des symboles spéciaux déclenchent des bonus. L'objectif est de maximiser ses gains tout en gérant son budget."
  },
  {
    short: "Un jeu de course à pied avec des haies à franchir",
    long: "Un jeu de course à pied avec des haies à franchir. Le joueur doit synchroniser ses sauts pour franchir les haies sans les toucher. Le rythme s'accélère progressivement et les haies deviennent plus hautes. Toucher une haie ralentit le coureur. L'objectif est de terminer la course en première position."
  },
  {
    short: "Un jeu de dessin avec des lignes à tracer",
    long: "Un jeu de dessin avec des lignes à tracer. Le joueur doit tracer des formes complexes sans lever le crayon. Certaines lignes ne peuvent être tracées qu'une seule fois. L'objectif est de compléter le dessin en respectant les contraintes. La précision et la planification sont essentielles."
  },
  {
    short: "Un jeu de vol d'avion avec des anneaux à traverser",
    long: "Un jeu de vol d'avion avec des anneaux à traverser. Le joueur pilote un avion qui doit passer à travers des anneaux dans le bon ordre. Les anneaux sont placés à différentes altitudes et positions. Le temps est limité et l'avion consomme du carburant. La précision du pilotage détermine le score."
  },
  {
    short: "Un jeu de bowling avec des quilles à renverser",
    long: "Un jeu de bowling avec des quilles à renverser. Le joueur ajuste l'angle et la force de la boule pour faire un strike. Les quilles ont une physique réaliste et rebondissent les unes sur les autres. Différentes formations de quilles créent des défis variés. Le score cumulé détermine la performance."
  },
  {
    short: "Un jeu de fabrication de papier avec des formes à découper",
    long: "Un jeu de fabrication de papier avec des formes à découper. Le joueur doit découper le papier selon des modèles spécifiques. Les chutes de papier sont comptées et il faut minimiser le gaspillage. Des formes complexes nécessitent plusieurs étapes. L'efficacité et la précision sont récompensées."
  },
  {
    short: "Un jeu de tri postal avec des adresses à classer",
    long: "Un jeu de tri postal avec des adresses à classer. Le joueur doit trier le courrier selon les codes postaux et les destinations. Un temps limité simule la pression du travail. Les erreurs de tri pénalisent le score. La vitesse et la précision sont essentielles pour réussir."
  },
  {
    short: "Un jeu de nettoyage de fenêtres avec des taches à enlever",
    long: "Un jeu de nettoyage de fenêtres avec des taches à enlever. Le joueur doit nettoyer toutes les taches sans laisser de traces. Différents types de taches nécessitent des techniques différentes. Le temps et les produits de nettoyage sont limités. La propreté finale détermine le score."
  },
  {
    short: "Un jeu de réparation de pixels morts sur un écran",
    long: "Un jeu de réparation de pixels morts sur un écran. Le joueur doit rallumer les pixels défectueux en cliquant dessus dans le bon ordre. Certains pixels sont connectés et s'allument ensemble. Des circuits complexes nécessitent de comprendre les connections. L'objectif est de restaurer une image parfaite sans dépasser le nombre de clics autorisés."
  },
  {
    short: "Un jeu de cultivation de cristaux avec des formes géométriques",
    long: "Un jeu de cultivation de cristaux avec des formes géométriques. Le joueur place des germes de cristal qui grandissent selon des règles mathématiques. Les cristaux adjacents s'influencent mutuellement et créent des patterns. L'objectif est de créer des formes spécifiques en planifiant la croissance. Les cristaux peuvent fusionner ou se briser selon leur taille."
  },
  {
    short: "Un jeu de navigation d'un robot dans un labyrinthe",
    long: "Un jeu de navigation d'un robot dans un labyrinthe. Le robot ne voit que les cases adjacentes et doit cartographier le labyrinthe. Le joueur programme des séquences de mouvements à l'avance. Le robot execute les commandes automatiquement jusqu'à rencontrer un obstacle. L'objectif est de trouver la sortie avec le minimum d'instructions."
  },
  {
    short: "Un jeu de contagion avec des cellules qui se propagent",
    long: "Un jeu de contagion avec des cellules qui se propagent. Le joueur contrôle un virus qui infecte les cellules voisines. Différents types de cellules résistent différemment. Le système immunitaire contre-attaque et élimine les cellules infectées. L'objectif est d'infecter tout l'organisme avant d'être détruit."
  },
  {
    short: "Un jeu de fusion de bulles avec des couleurs primaires",
    long: "Un jeu de fusion de bulles avec des couleurs primaires. Les bulles de couleurs primaires fusionnent pour créer de nouvelles couleurs. Les bulles secondaires peuvent être décomposées en leurs composants. L'objectif est de créer une couleur cible en manipulant les fusions. La physique des bulles ajoute un élément de timing."
  },
  {
    short: "Un jeu de time-lapse de croissance d'une plante",
    long: "Un jeu de time-lapse de croissance d'une plante. Le joueur contrôle les conditions environnementales pour faire pousser une plante. L'eau, la lumière et les nutriments affectent la croissance. La plante réagit en temps réel aux changements. L'objectif est de faire fleurir la plante en respectant ses besoins naturels."
  },
  {
    short: "Un jeu de synchronisation de pendules avec des rythmes",
    long: "Un jeu de synchronisation de pendules avec des rythmes. Plusieurs pendules oscillent à des vitesses différentes et le joueur doit les synchroniser. Toucher un pendule modifie son rythme temporairement. Des patterns complexes émergent de la synchronisation. L'objectif est de créer une harmonie parfaite entre tous les pendules."
  },
  {
    short: "Un jeu de simulation d'écosystème avec des chaînes alimentaires",
    long: "Un jeu de simulation d'écosystème avec des chaînes alimentaires. Le joueur introduit différentes espèces qui interagissent selon des règles naturelles. Les prédateurs mangent les proies et les populations fluctuent. L'équilibre est fragile et peut s'effondrer rapidement. L'objectif est de maintenir un écosystème stable le plus longtemps possible."
  },
  {
    short: "Un jeu de décodage de signaux extraterrestres",
    long: "Un jeu de décodage de signaux extraterrestres. Le joueur reçoit des patterns de signaux qu'il doit analyser pour trouver des messages. Les signaux suivent des règles mathématiques cachées. Différents types de signaux représentent des concepts différents. L'objectif est de décoder suffisamment de messages pour comprendre le langage alien."
  },
  {
    short: "Un jeu de gestion de fourmilière avec des phéromones",
    long: "Un jeu de gestion de fourmilière avec des phéromones. Le joueur place des traces de phéromones pour guider les fourmis. Les fourmis suivent les traces les plus fortes automatiquement. Les phéromones s'évaporent avec le temps et doivent être renouvelées. L'objectif est d'optimiser les chemins pour collecter le maximum de nourriture."
  },
  {
    short: "Un jeu de construction de machines avec des engrenages",
    long: "Un jeu de construction de machines avec des engrenages. Le joueur connecte des engrenages pour transmettre le mouvement d'un moteur. Les ratios d'engrenages déterminent la vitesse et la force. Des pièces défectueuses peuvent bloquer le système. L'objectif est de créer une machine qui accomplit une tâche spécifique."
  },
  {
    short: "Un jeu de vie artificielle avec des créatures évolutives",
    long: "Un jeu de vie artificielle avec des créatures évolutives. Les créatures ont des comportements simples et se reproduisent selon leur succès. Les mutations introduisent de nouveaux comportements aléatoirement. L'environnement change et favorise certains traits. L'objectif est d'observer l'évolution et de prédire les adaptations."
  },
  {
    short: "Un jeu de résonance harmonique avec des fréquences",
    long: "Un jeu de résonance harmonique avec des fréquences. Le joueur ajuste des oscillateurs pour créer des harmonies parfaites. Les fréquences s'additionnent et créent des interférences. Certaines combinaisons débloquent des effets spéciaux. L'objectif est de découvrir les accords parfaits qui font résonner le système."
  },
  {
    short: "Un jeu de propagation de rumeurs dans un réseau social",
    long: "Un jeu de propagation de rumeurs dans un réseau social. Le joueur lance une rumeur et observe sa diffusion. Certaines personnes amplifient le message, d'autres le déforment. Les connections sociales déterminent la vitesse de propagation. L'objectif est de faire circuler un message précis à travers tout le réseau."
  },
  {
    short: "Un jeu de création de fractales avec des règles simples",
    long: "Un jeu de création de fractales avec des règles simples. Le joueur définit une règle de base qui se répète à différentes échelles. Les formes émergent naturellement de l'application répétée de la règle. Des paramètres simples créent des patterns complexes. L'objectif est de reproduire des fractales célèbres en découvrant leurs règles."
  },
  {
    short: "Un jeu de téléportation avec des portails connectés",
    long: "Un jeu de téléportation avec des portails connectés. Le joueur place des portails qui sont connectés entre eux. Les objets qui entrent par un portail sortent par son jumeau. La conservation de l'élan crée des puzzles physiques. L'objectif est d'utiliser les portails pour atteindre des endroits inaccessibles."
  },
  {
    short: "Un jeu de manipulation du temps avec des boucles temporelles",
    long: "Un jeu de manipulation du temps avec des boucles temporelles. Le joueur peut créer des points de sauvegarde temporels et y retourner. Les actions passées affectent le présent de manière prévisible. Des paradoxes temporels créent des situations impossibles. L'objectif est de résoudre des puzzles en manipulant la timeline."
  },
  {
    short: "Un jeu de chimie avec des réactions en chaîne",
    long: "Un jeu de chimie avec des réactions en chaîne. Le joueur mélange des éléments chimiques pour créer des réactions. Chaque réaction produit de nouveaux composés et de l'énergie. Les réactions peuvent déclencher d'autres réactions en cascade. L'objectif est de créer des réactions contrôlées pour synthétiser des molécules cibles."
  },
  {
    short: "Un jeu de gravité inversée avec des objets qui tombent vers le haut",
    long: "Un jeu de gravité inversée avec des objets qui tombent vers le haut. Le joueur contrôle la direction de la gravité pour guider des objets. Les objets ont des masses différentes et réagissent différemment. Des obstacles fixes compliquent la trajectoire. L'objectif est de faire arriver tous les objets à destination en manipulant la gravité."
  },
  {
    short: "Un jeu de dressage de créatures avec des comportements émergents",
    long: "Un jeu de dressage de créatures avec des comportements émergents. Les créatures apprennent de leurs interactions avec l'environnement. Le renforcement positif modifie leurs comportements graduellement. Différentes créatures ont des personnalités et des capacités d'apprentissage variables. L'objectif est d'entraîner une créature pour qu'elle accomplisse des tâches complexes."
  },
  {
    short: "Un jeu de construction de ponts avec des matériaux qui s'usent",
    long: "Un jeu de construction de ponts avec des matériaux qui s'usent. Le joueur construit des ponts pour faire passer des véhicules. Les matériaux se fatiguent et se cassent après utilisation. Différents matériaux ont des propriétés de résistance variables. L'objectif est de construire des ponts durables qui résistent à l'usure du temps."
  },
  {
    short: "Un jeu de simulation de trafic avec des algorithmes d'optimisation",
    long: "Un jeu de simulation de trafic avec des algorithmes d'optimisation. Le joueur programme des feux de circulation intelligents. Les algorithmes s'adaptent en temps réel au volume de trafic. Des événements imprévus perturbent le système. L'objectif est de minimiser les embouteillages en optimisant les algorithmes de contrôle."
  },
  {
    short: "Un jeu de jardinage spatial avec des plantes qui flottent",
    long: "Un jeu de jardinage spatial avec des plantes qui flottent. Les plantes poussent en apesanteur et prennent des formes impossibles. Les nutriments flottent librement et doivent être guidés vers les racines. La lumière solaire varie selon l'orbite de la station. L'objectif est de créer un jardin prospère dans l'espace."
  },
  {
    short: "Un jeu de programmation d'automates avec des règles cellulaires",
    long: "Un jeu de programmation d'automates avec des règles cellulaires. Le joueur définit des règles simples qui s'appliquent à chaque cellule. Les patterns complexes émergent de l'application répétée des règles. Des configurations initiales différentes produisent des évolutions variées. L'objectif est de créer des automates qui génèrent des patterns spécifiques."
  },
  {
    short: "Un jeu de manipulation de l'ADN avec des séquences génétiques",
    long: "Un jeu de manipulation de l'ADN avec des séquences génétiques. Le joueur coupe et colle des segments d'ADN pour créer de nouvelles séquences. Chaque gène produit des protéines avec des fonctions spécifiques. Les mutations peuvent améliorer ou détruire les fonctions. L'objectif est de créer des organismes avec des capacités désirées."
  },
  {
    short: "Un jeu de reconstruction d'images avec des pixels manquants",
    long: "Un jeu de reconstruction d'images avec des pixels manquants. Le joueur doit deviner la couleur des pixels effacés. Les pixels voisins donnent des indices sur la couleur correcte. Des algorithmes de reconstruction automatique aident le joueur. L'objectif est de restaurer parfaitement l'image originale avec un minimum d'erreurs."
  },
  {
    short: "Un jeu de simulation de vagues avec des interférences",
    long: "Un jeu de simulation de vagues avec des interférences. Le joueur crée des sources de vagues qui se propagent et interagissent. Les vagues s'additionnent et créent des patterns d'interférence. Des obstacles reflètent et absorbent les vagues. L'objectif est de créer des patterns d'onde spécifiques en plaçant les sources correctement."
  },
  {
    short: "Un jeu de domotique avec des capteurs et des actionneurs",
    long: "Un jeu de domotique avec des capteurs et des actionneurs. Le joueur connecte des capteurs à des actionneurs pour automatiser une maison. Les capteurs détectent les changements environnementaux. Les actionneurs réagissent selon la programmation. L'objectif est de créer un système domotique efficace qui répond aux besoins des habitants."
  },
  {
    short: "Un jeu de culture de bactéries avec des antibiotiques",
    long: "Un jeu de culture de bactéries avec des antibiotiques. Les bactéries se reproduisent exponentiellement dans des conditions favorables. Les antibiotiques tuent les bactéries mais créent une résistance. Les bactéries résistantes deviennent dominantes. L'objectif est de gérer une infection en utilisant les antibiotiques de manière stratégique."
  },
  {
    short: "Un jeu de génération de musique avec des algorithmes",
    long: "Un jeu de génération de musique avec des algorithmes. Le joueur programme des règles pour générer des mélodies automatiquement. Les algorithmes combinent des notes selon des patterns harmoniques. Le hasard contrôlé introduit de la variété. L'objectif est de créer des algorithmes qui génèrent de la musique agréable et cohérente."
  },
  {
    short: "Un jeu de simulation de neurones avec des synapses",
    long: "Un jeu de simulation de neurones avec des synapses. Le joueur connecte des neurones pour créer des réseaux de traitement. Les signaux se propagent et se transforment à travers les connections. L'apprentissage modifie la force des synapses. L'objectif est de créer un réseau neuronal qui apprend à accomplir des tâches spécifiques."
  },
  {
    short: "Un jeu de pliage de protéines avec des acides aminés",
    long: "Un jeu de pliage de protéines avec des acides aminés. Le joueur doit plier une chaîne d'acides aminés pour former une protéine stable. Les forces d'attraction et de répulsion déterminent la forme finale. Un mauvais pliage peut rendre la protéine inactive. L'objectif est de trouver la conformation optimale qui minimise l'énergie totale."
  },
  {
    short: "Un jeu de simulation de particules avec des forces physiques",
    long: "Un jeu de simulation de particules avec des forces physiques. Le joueur contrôle des champs de force qui agissent sur les particules. Les particules s'attirent, se repoussent et entrent en collision. Des patterns complexes émergent de ces interactions simples. L'objectif est de créer des configurations stables ou des mouvements périodiques."
  },
  {
    short: "Un jeu de décryptage de codes avec des indices cachés",
    long: "Un jeu de décryptage de codes avec des indices cachés. Le joueur reçoit des messages codés et doit en découvrir la clé. Les indices sont dissimulés dans le texte ou l'environnement. Différentes techniques de cryptage nécessitent des approches différentes. L'objectif est de décoder tous les messages pour révéler un secret plus grand."
  },
  {
    short: "Un jeu de simulation de marché avec des prix fluctuants",
    long: "Un jeu de simulation de marché avec des prix fluctuants. Le joueur achète et vend des marchandises selon les variations de prix. L'offre et la demande déterminent les prix en temps réel. Des événements externes perturbent le marché. L'objectif est de maximiser les profits en anticipant les mouvements du marché."
  },
  {
    short: "Un jeu de construction de labyrinthes avec des algorithmes",
    long: "Un jeu de construction de labyrinthes avec des algorithmes. Le joueur programme des algorithmes pour générer des labyrinthes automatiquement. Différents algorithmes créent des structures différentes. Le labyrinthe doit avoir une solution unique. L'objectif est de créer des labyrinthes équilibrés entre difficulté et résolvabilité."
  },
  {
    short: "Un jeu de simulation de fourmis avec des algorithmes collectifs",
    long: "Un jeu de simulation de fourmis avec des algorithmes collectifs. Les fourmis suivent des règles simples mais créent des comportements complexes. La colonie s'organise automatiquement pour accomplir des tâches. Le joueur peut influencer indirectement le comportement collectif. L'objectif est de comprendre comment l'intelligence collective émerge des actions individuelles."
  },
  {
    short: "Un jeu de création de patterns avec des automates cellulaires",
    long: "Un jeu de création de patterns avec des automates cellulaires. Le joueur définit des règles de transition entre états des cellules. Les patterns évoluent génération après génération selon ces règles. Certaines règles créent des patterns stables, d'autres chaotiques. L'objectif est de découvrir les règles qui génèrent des patterns artistiques ou fonctionnels."
  },
  {
    short: "Un jeu de simulation de rivière avec des sédiments",
    long: "Un jeu de simulation de rivière avec des sédiments. Le joueur contrôle le débit et la direction de l'eau. Les sédiments s'érodent et se déposent selon le courant. Le lit de la rivière change de forme au fil du temps. L'objectif est de diriger l'eau vers sa destination tout en gérant l'érosion."
  },
  {
    short: "Un jeu de programmation de comportements avec des agents intelligents",
    long: "Un jeu de programmation de comportements avec des agents intelligents. Le joueur programme des agents qui prennent des décisions autonomes. Les agents perçoivent leur environnement et réagissent selon leur programmation. Des comportements complexes émergent de règles simples. L'objectif est de créer des agents qui accomplissent des tâches collaboratives."
  },
  {
    short: "Un jeu de reconstruction de circuits avec des composants électroniques",
    long: "Un jeu de reconstruction de circuits avec des composants électroniques. Le joueur doit reconstituer un circuit fonctionnel à partir de composants dispersés. Chaque composant a des propriétés électriques spécifiques. Les circuits doivent respecter les lois de l'électricité. L'objectif est de créer des circuits qui accomplissent des fonctions logiques ou de traitement du signal."
  },
  {
    short: "Un jeu de culture de champignons avec des spores",
    long: "Un jeu de culture de champignons avec des spores. Les champignons se propagent par spores et colonisent de nouveaux territoires. L'humidité et la température affectent la croissance. Différentes espèces de champignons entrent en compétition. L'objectif est de cultiver une espèce spécifique en optimisant les conditions environnementales."
  },
  {
    short: "Un jeu de simulation de vol d'oiseaux avec des formations",
    long: "Un jeu de simulation de vol d'oiseaux avec des formations. Le joueur contrôle un vol d'oiseaux qui suivent des règles de formation. Les oiseaux évitent les collisions et restent groupés. Des prédateurs perturbent la formation. L'objectif est de guider le vol vers sa destination en maintenant la cohésion du groupe."
  },
  {
    short: "Un jeu de fabrication de tissus avec des motifs",
    long: "Un jeu de fabrication de tissus avec des motifs. Le joueur programme un métier à tisser pour créer des patterns complexes. Les fils de chaîne et de trame s'entrelacent selon des règles précises. Des erreurs dans la programmation créent des défauts dans le tissu. L'objectif est de reproduire des motifs traditionnels en programmant correctement la machine."
  },
  {
    short: "Un jeu de simulation de termites avec des phéromones",
    long: "Un jeu de simulation de termites avec des phéromones. Les termites construisent des structures complexes en suivant des traces chimiques. Les phéromones guident la construction et la réparation. Le joueur peut influencer indirectement le comportement en plaçant des sources de phéromones. L'objectif est de construire des structures optimales pour la colonie."
  },
  {
    short: "Un jeu de création de langages avec des grammaires",
    long: "Un jeu de création de langages avec des grammaires. Le joueur définit des règles grammaticales pour générer des phrases. Les règles s'appliquent récursivement pour créer des structures complexes. Des contraintes sémantiques assurent la cohérence du langage. L'objectif est de créer un langage expressif et cohérent qui peut décrire des concepts complexes."
  },
  {
    short: "Un jeu de simulation de coraux avec des symbioses",
    long: "Un jeu de simulation de coraux avec des symbioses. Les coraux hébergent des algues qui leur fournissent de la nourriture. L'équilibre symbiotique est fragile et peut être perturbé. La température et l'acidité de l'eau affectent la santé des coraux. L'objectif est de maintenir un récif corallien en bonne santé malgré les changements environnementaux."
  },
  {
    short: "Un jeu de programmation de drones avec des essaims",
    long: "Un jeu de programmation de drones avec des essaims. Le joueur programme des comportements collectifs pour des groupes de drones. Les drones communiquent entre eux pour coordonner leurs actions. Des missions complexes nécessitent une coordination précise. L'objectif est de programmer des essaims efficaces qui accomplissent des tâches collaboratives."
  },
  {
    short: "Un jeu de simulation de galaxie avec des étoiles qui naissent et meurent",
    long: "Un jeu de simulation de galaxie avec des étoiles qui naissent et meurent. Les étoiles évoluent selon leur masse et leur âge. Les supernovas enrichissent l'espace en éléments lourds. De nouvelles étoiles naissent dans les nébuleuses. L'objectif est de comprendre et d'influencer l'évolution stellaire pour créer des systèmes planétaires habitables."
  },
  {
    short: "Un jeu de culture de cristaux avec des défauts structurels",
    long: "Un jeu de culture de cristaux avec des défauts structurels. Les cristaux grandissent selon des règles géométriques strictes. Des impuretés créent des défauts dans la structure. Les défauts peuvent améliorer ou détériorer les propriétés du cristal. L'objectif est de contrôler la croissance pour obtenir des cristaux avec des propriétés spécifiques."
  },
  {
    short: "Un jeu de simulation de ruche avec des danses d'abeilles",
    long: "Un jeu de simulation de ruche avec des danses d'abeilles. Les abeilles communiquent par des danses pour indiquer la location des fleurs. Le joueur doit décoder les danses pour optimiser la collecte de nectar. Différentes danses transmettent différents types d'information. L'objectif est de maximiser la production de miel en comprenant la communication des abeilles."
  },
  {
    short: "Un jeu de manipulation de l'espace-temps avec des distorsions",
    long: "Un jeu de manipulation de l'espace-temps avec des distorsions. Le joueur crée des distorsions qui modifient la géométrie de l'espace. Les objets suivent des trajectoires courbées dans l'espace déformé. Les distorsions peuvent créer des raccourcis ou des pièges. L'objectif est d'utiliser les distorsions pour résoudre des puzzles spatio-temporels."
  },
  {
    short: "Un jeu de simulation de mycorhizes avec des réseaux fongiques",
    long: "Un jeu de simulation de mycorhizes avec des réseaux fongiques. Les champignons forment des réseaux souterrains qui connectent les plantes. Les nutriments et l'information circulent à travers ces réseaux. Le joueur peut influencer les connections pour optimiser l'écosystème. L'objectif est de créer un réseau fongique qui soutient la diversité végétale."
  },
  {
    short: "Un jeu de création de patterns sonores avec des ondes",
    long: "Un jeu de création de patterns sonores avec des ondes. Le joueur manipule des ondes sonores pour créer des harmonies complexes. Les ondes interfèrent et créent des battements et des résonances. La visualisation des ondes aide à comprendre les interactions. L'objectif est de composer de la musique en manipulant directement les propriétés physiques du son."
  },
  {
    short: "Un jeu de simulation de migration avec des animaux nomades",
    long: "Un jeu de simulation de migration avec des animaux nomades. Les animaux suivent des routes migratoires ancestrales. Les changements climatiques perturbent les patterns traditionnels. Le joueur peut créer des corridors pour faciliter la migration. L'objectif est de maintenir les populations animales en adaptant les routes migratoires."
  },
  {
    short: "Un jeu de construction de réseaux sociaux avec des connections",
    long: "Un jeu de construction de réseaux sociaux avec des connections. Le joueur crée des liens entre individus pour former des communautés. Les connections influencent la propagation d'informations et d'influences. Des algorithmes déterminent la force des liens sociaux. L'objectif est de créer des réseaux sociaux cohésifs qui résistent aux divisions."
  },
  {
    short: "Un jeu de simulation de photosynthèse avec des chloroplastes",
    long: "Un jeu de simulation de photosynthèse avec des chloroplastes. Le joueur optimise l'arrangement des chloroplastes pour maximiser la capture de lumière. Les photons sont convertis en énergie chimique dans des réactions complexes. L'efficacité dépend de la coordination entre les différents composants. L'objectif est de créer un système photosynthétique optimal."
  },
  {
    short: "Un jeu de programmation de comportements avec des robots sociaux",
    long: "Un jeu de programmation de comportements avec des robots sociaux. Les robots interagissent et apprennent les uns des autres. Les comportements sociaux émergent de règles d'interaction simples. Le joueur peut programmer des personnalités et des rôles sociaux. L'objectif est de créer une société robotique harmonieuse qui accomplit des tâches collectives."
  },
  {
    short: "Un jeu de simulation de pollution avec des cycles naturels",
    long: "Un jeu de simulation de pollution avec des cycles naturels. Les polluants se dispersent et s'accumulent dans l'environnement. Les cycles naturels décomposent certains polluants mais pas d'autres. Les écosystèmes réagissent différemment selon le type de pollution. L'objectif est de gérer les sources de pollution pour maintenir l'équilibre écologique."
  },
  {
    short: "Un jeu de création de langages de programmation avec des compilateurs",
    long: "Un jeu de création de langages de programmation avec des compilateurs. Le joueur définit la syntaxe et la sémantique d'un nouveau langage. Le compilateur traduit le code en instructions exécutables. Des erreurs de conception créent des bugs difficiles à résoudre. L'objectif est de créer un langage expressif et sans ambiguïté qui peut être compilé efficacement."
  },
  {
    short: "Un jeu de simulation de vieillissement avec des télomères",
    long: "Un jeu de simulation de vieillissement avec des télomères. Les cellules vieillissent et perdent leur capacité de division. Les télomères raccourcissent à chaque division cellulaire. Le joueur peut influencer les mécanismes de réparation. L'objectif est de comprendre et ralentir le processus de vieillissement cellulaire."
  },
  {
    short: "Un jeu de construction de ponts quantiques avec des particules",
    long: "Un jeu de construction de ponts quantiques avec des particules. Les particules peuvent être intriquées et partager des propriétés. L'intrication permet de créer des connections instantanées. La mesure d'une particule affecte instantanément son partenaire. L'objectif est de construire des réseaux quantiques pour transmettre de l'information."
  },
  {
    short: "Un jeu de simulation de conscience avec des neurones artificiels",
    long: "Un jeu de simulation de conscience avec des neurones artificiels. Le joueur construit des réseaux de neurones qui traitent l'information. La conscience émerge de l'interaction entre différents modules. L'auto-réflexion et la métacognition sont des propriétés émergentes. L'objectif est de créer un système qui manifeste des signes de conscience artificielle."
  },
  {
    short: "Un jeu de culture de virus avec des mutations adaptatives",
    long: "Un jeu de culture de virus avec des mutations adaptatives. Les virus mutent pour s'adapter à leur environnement. Les mutations peuvent améliorer ou détériorer la fitness. Le système immunitaire de l'hôte crée une pression sélective. L'objectif est de comprendre l'évolution virale et prédire les nouvelles variantes."
  },
  {
    short: "Un jeu de programmation de matière avec des atomes",
    long: "Un jeu de programmation de matière avec des atomes. Le joueur assemble des atomes pour créer des matériaux avec des propriétés spécifiques. Les liaisons chimiques déterminent la structure et les propriétés. Des arrangements différents créent des matériaux aux propriétés radicalement différentes. L'objectif est de concevoir des matériaux révolutionnaires en manipulant la structure atomique."
  },
  {
    short: "Un jeu de simulation de trous noirs avec des horizons d'événements",
    long: "Un jeu de simulation de trous noirs avec des horizons d'événements. Les objets sont déformés par la gravité extrême. Le temps ralentit près de l'horizon d'événements. Les particules virtuelles près du trou noir créent le rayonnement de Hawking. L'objectif est de comprendre la physique extrême des trous noirs et leurs effets sur l'espace-temps."
  },
  {
    short: "Un jeu de construction de réalités alternatives avec des dimensions",
    long: "Un jeu de construction de réalités alternatives avec des dimensions. Le joueur modifie les lois physiques pour créer des univers alternatifs. Les changements dans les constantes fondamentales affectent toute la réalité. Certains univers sont stables, d'autres s'effondrent rapidement. L'objectif est de créer des réalités alternatives viables avec des propriétés intéressantes."
  },
  {
    short: "Un jeu de simulation de l'évolution de la vie avec des mutations",
    long: "Un jeu de simulation de l'évolution de la vie avec des mutations. Les organismes évoluent selon les pressions sélectives de l'environnement. Les mutations introduisent de la variabilité génétique. Les extinctions de masse redistribuent les niches écologiques. L'objectif est de guider l'évolution vers des formes de vie complexes et diversifiées."
  },
  {
    short: "Un jeu de programmation de l'univers avec des règles cosmiques",
    long: "Un jeu de programmation de l'univers avec des règles cosmiques. Le joueur définit les lois physiques qui gouvernent un univers simulé. Les galaxies se forment et évoluent selon ces lois. Les étoiles naissent, vivent et meurent dans un cycle cosmique. L'objectif est de créer un univers stable qui peut soutenir le développement de la complexité et de la vie."
  }
];

/**
 * Returns a random selection of game ideas
 */
export function getRandomGameIdeas(count: number = 3): GameIdea[] {
  const shuffled = [...GAME_IDEAS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}