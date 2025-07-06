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
    description: "Un petit serpent qui mange des pommes et grandit dans un jardin. Le joueur contrôle le serpent avec les flèches directionnelles pour collecter des pommes qui apparaissent aléatoirement sur l'écran. À chaque pomme mangée, le serpent grandit d'un segment et le score augmente. Le défi est d'éviter de toucher les bords de l'écran ou son propre corps qui devient de plus en plus long. Plus le serpent grandit, plus il devient difficile de naviguer dans l'espace disponible."
  },
  {
    label: "Grenouille traverse la rivière",
    description: "Une grenouille qui saute sur des nénuphars pour traverser la rivière. Le joueur doit chronométrer ses sauts pour atterrir sur les nénuphars qui bougent lentement de gauche à droite. Certains nénuphars sont plus petits et plus difficiles à atteindre, d'autres disparaissent temporairement sous l'eau. Le but est de traverser plusieurs rangées de nénuphars sans tomber dans l'eau. La vitesse et la complexité des mouvements augmentent à chaque niveau réussi."
  },
  {
    label: "Tetris coloré",
    description: "Des blocs colorés qui tombent et qu'il faut empiler intelligemment. Le joueur fait tourner et déplace les pièces qui descendent pour former des lignes complètes horizontales. Quand une ligne est complète, elle disparaît et rapporte des points. Les pièces tombent de plus en plus vite au fur et à mesure que le score augmente. Le jeu se termine quand la pile de blocs atteint le haut de l'écran. Bonus spéciaux quand on supprime plusieurs lignes d'un coup."
  },
  {
    label: "Balle casse-briques",
    description: "Une balle qui rebondit pour détruire des briques multicolores. Le joueur contrôle une raquette au bas de l'écran pour renvoyer la balle vers un mur de briques colorées. Chaque brique détruite rapporte des points et certaines couleurs donnent des bonus spéciaux. La balle accélère progressivement et change d'angle selon où elle touche la raquette. Le niveau est terminé quand toutes les briques sont détruites. Attention à ne pas laisser la balle tomber en bas de l'écran !"
  },
  {
    label: "Pacman affamé",
    description: "Un pacman affamé qui mange des points en évitant les fantômes. Le joueur navigue dans un labyrinthe rempli de petits points à collecter tout en évitant les fantômes colorés qui patrouillent. Des super-pastilles permettent temporairement de manger les fantômes pour des points bonus. Le niveau est terminé quand tous les points sont collectés. Les fantômes deviennent plus rapides et plus agressifs au fur et à mesure que le jeu progresse. Stratégie requise pour optimiser les chemins et éviter les pièges."
  },
  {
    label: "Voiture évite obstacles",
    description: "Une voiture qui zigzague entre les obstacles sur l'autoroute. Le joueur contrôle une voiture vue de haut qui roule automatiquement vers l'avant sur une route défilante. Des obstacles comme d'autres voitures, des cônes et des nids-de-poule apparaissent constamment. Il faut les éviter en se déplaçant latéralement tout en collectant de l'essence pour ne pas tomber en panne. La vitesse augmente progressivement et les obstacles deviennent plus nombreux et imprévisibles."
  },
  {
    label: "Oiseau évite tuyaux",
    description: "Un oiseau qui vole entre les tuyaux sans les toucher. Le joueur doit appuyer sur un bouton pour faire battre des ailes à l'oiseau et le maintenir en vol. Des tuyaux verts arrivent en continu depuis la droite avec des espaces variables entre eux. L'oiseau tombe naturellement par gravité, donc il faut doser les battements d'ailes pour passer précisément entre les tuyaux. Chaque tuyau franchi rapporte un point et la difficulté augmente avec des espaces plus petits."
  },
  {
    label: "Attraper les bonbons",
    description: "Des bonbons qui tombent du ciel à attraper dans un panier. Le joueur contrôle un panier qui se déplace horizontalement au bas de l'écran. Des bonbons colorés tombent à différentes vitesses depuis le haut et il faut les attraper avant qu'ils touchent le sol. Chaque couleur de bonbon rapporte des points différents et certains bonbons spéciaux donnent des bonus temporaires. Le jeu accélère progressivement et fait tomber plus de bonbons simultanément. Attention aux bonbons empoisonnés qui font perdre des points !"
  },
  {
    label: "Héros plateforme",
    description: "Un petit héros qui saute de plateforme en plateforme. Le joueur contrôle un personnage dans un niveau vertical avec des plateformes à différentes hauteurs. Le but est de monter le plus haut possible en sautant de plateforme en plateforme tout en évitant les obstacles comme les pics et les ennemis. Certaines plateformes bougent, d'autres s'effondrent après un court délai. Des objets à collecter sont dispersés pour augmenter le score. La physique de saut est importante pour calculer la trajectoire et la force."
  },
  {
    label: "Fusée vs envahisseurs",
    description: "Une fusée qui tire sur des envahisseurs venus de l'espace. Le joueur contrôle un vaisseau spatial au bas de l'écran qui peut se déplacer latéralement et tirer des projectiles. Des rangées d'aliens descendent lentement en formation tout en tirant occasionnellement vers le joueur. Le but est d'éliminer tous les envahisseurs avant qu'ils n'atteignent le bas de l'écran. Plus il reste peu d'aliens, plus ils se déplacent rapidement. Des objets bonus apparaissent parfois pour améliorer les armes."
  },
  {
    label: "Labyrinthe mystérieux",
    description: "Un labyrinthe où il faut trouver la sortie sans se perdre. Le joueur contrôle un personnage dans un labyrinthe vu de haut avec des murs qui bloquent le passage. Le but est de naviguer depuis l'entrée jusqu'à la sortie en explorant les différents chemins. Des objets collectibles sont cachés dans les impasses pour encourager l'exploration complète. Certains murs peuvent être des passages secrets et des téléporteurs ajoutent de la complexité. Une mini-carte peut révéler progressivement les zones explorées."
  },
  {
    label: "Gemmes dans la mine",
    description: "Des gemmes brillantes cachées dans une mine à collecter. Le joueur explore une mine souterraine avec des tunnels et des cavernes remplies de gemmes colorées. Chaque gemme a une valeur différente et certaines sont plus rares que d'autres. Il faut éviter les éboulements, les chauves-souris et les pièges pour collecter le maximum de richesses. Une pioche permet de creuser de nouveaux passages et une lampe éclaire les zones sombres. L'oxygène est limité, ajoutant une pression temporelle à l'exploration."
  },
  {
    label: "Chat attrape souris",
    description: "Un chat qui court et saute pour attraper des souris. Le joueur contrôle un chat agile dans une maison avec plusieurs étages et plateformes. Des souris apparaissent aléatoirement et se déplacent rapidement vers leurs trous. Le chat doit les attraper avant qu'elles ne s'échappent en sautant et en courant. Chaque souris attrapée rapporte des points et certaines souris spéciales donnent des bonus. Les souris deviennent plus rapides et plus nombreuses au fur et à mesure du jeu."
  },
  {
    label: "Tortue roule vers l'arrivée",
    description: "Une tortue qui évite les obstacles en roulant vers l'arrivée. Le joueur contrôle une tortue qui peut se mettre en boule pour rouler plus rapidement ou marcher normalement pour plus de précision. Le parcours est rempli d'obstacles comme des rochers, des trous et des épines. En roulant, la tortue va plus vite mais est plus difficile à contrôler. En marchant, elle est plus lente mais peut s'arrêter précisément. Le timing est crucial pour choisir le bon mode de déplacement selon les obstacles."
  },
  {
    label: "Bulles colorées",
    description: "Des bulles colorées à faire éclater en les regroupant. Le joueur tire des bulles colorées depuis le bas de l'écran vers un groupe de bulles suspendues en haut. Quand trois bulles de même couleur ou plus se touchent, elles éclatent et rapportent des points. Les bulles détachées tombent aussi et rapportent des points bonus. Le but est de faire éclater toutes les bulles avant qu'elles ne descendent trop bas. La couleur de la bulle à tirer change aléatoirement et la stratégie consiste à créer des réactions en chaîne."
  },
  {
    label: "Pingouin sur glace",
    description: "Un pingouin qui glisse sur la glace en collectant des poissons. Le joueur contrôle un pingouin qui glisse automatiquement sur la glace et ne peut changer de direction qu'en rebondissant sur les bords ou les obstacles. Des poissons sont dispersés sur la surface glacée et le pingouin doit les collecter en calculant ses trajectoires. Des trous dans la glace et des morses constituent des dangers à éviter. Le défi est de maîtriser la physique de glissement pour naviguer efficacement et collecter tous les poissons."
  },
  {
    label: "Abeille butine",
    description: "Une abeille qui butine les fleurs sans toucher les épines. Le joueur contrôle une abeille volante dans un jardin rempli de fleurs colorées et d'obstacles épineux. L'abeille doit visiter chaque fleur pour collecter le nectar tout en évitant les épines, les toiles d'araignée et les autres dangers. Chaque fleur visitée rapporte des points et change de couleur. Le vent peut affecter le vol de l'abeille et la batterie se décharge progressivement. Des fleurs spéciales redonnent de l'énergie et des bonus temporaires."
  },
  {
    label: "Robot pousse caisses",
    description: "Un robot qui pousse des caisses pour résoudre des énigmes. Le joueur contrôle un robot dans un entrepôt avec des caisses à déplacer sur des zones cibles marquées au sol. Le robot ne peut que pousser les caisses, pas les tirer, ce qui nécessite de planifier soigneusement chaque mouvement. Certaines caisses sont lourdes et difficiles à déplacer, d'autres sont fragiles et se cassent si mal manipulées. Le niveau est réussi quand toutes les caisses sont sur les bonnes positions. La complexité augmente avec des labyrinthes plus grands et plus de caisses."
  },
  {
    label: "Princesse évite pièges",
    description: "Une princesse qui court dans son château en évitant les pièges. Le joueur guide la princesse à travers les couloirs de son château qui regorge de pièges activés par des mécanismes anciens. Des lames qui sortent du sol, des flèches qui volent et des fosses qui s'ouvrent constituent les principaux dangers. La princesse peut courir, sauter et se baisser pour éviter les pièges. Des joyaux sont dispersés dans le château pour augmenter le score. Le timing et les réflexes sont essentiels pour naviguer en sécurité."
  },
  {
    label: "Vaisseau évite météorites",
    description: "Un vaisseau spatial qui navigue entre les météorites. Le joueur pilote un vaisseau dans un champ d'astéroïdes en mouvement constant. Les météorites arrivent de toutes les directions avec des tailles et des vitesses différentes. Le vaisseau peut se déplacer dans toutes les directions et possède des boosters pour accélérer ponctuellement. Des stations spatiales offrent des zones de repos temporaires et des power-ups améliorent les capacités du vaisseau. L'objectif est de survivre le plus longtemps possible en évitant les collisions."
  },
  {
    label: "Escargot grimpe",
    description: "Un escargot qui grimpe lentement mais sûrement vers le sommet. Le joueur contrôle un escargot déterminé qui escalade une montagne verticale parsemée d'obstacles. L'escargot avance lentement mais régulièrement, et le joueur doit choisir le bon chemin pour éviter les chutes de pierres et les oiseaux. Des feuilles de salade donnent de l'énergie et accélèrent temporairement l'escargot. La pluie fait glisser l'escargot vers le bas et le sel constitue un danger mortel. La persévérance et la stratégie sont les clés du succès."
  },
  {
    label: "Dominos en chaîne",
    description: "Des dominos qui tombent en chaîne à déclencher au bon moment. Le joueur doit déclencher des séquences de dominos pour créer des réactions en chaîne complexes. Chaque niveau présente un arrangement différent de dominos avec des obstacles et des mécanismes spéciaux. Le timing est crucial pour déclencher les bonnes séquences au bon moment. Des dominos spéciaux ont des effets particuliers comme exploser ou changer de direction. Le but est de faire tomber tous les dominos du niveau en utilisant le moins de déclenchements possibles."
  },
  {
    label: "Poulpe évite méduses",
    description: "Un poulpe qui nage dans les profondeurs en évitant les méduses. Le joueur contrôle un poulpe agile qui explore les fonds marins remplis de méduses venimeuses flottantes. Le poulpe peut nager dans toutes les directions et utiliser ses tentacules pour se propulser rapidement. Des bulles d'air remontent et donnent des bonus temporaires. Des algues offrent des cachettes mais ralentissent le mouvement. L'objectif est de collecter des perles précieuses tout en évitant les méduses qui suivent des patterns de mouvement imprévisibles."
  },
  {
    label: "Citrouille d'Halloween",
    description: "Une citrouille qui roule en collectant des bonbons d'Halloween. Le joueur contrôle une citrouille ronde qui roule automatiquement dans un quartier décoré pour Halloween. Des bonbons sont dispersés sur le parcours et la citrouille doit les collecter en roulant dessus. Des obstacles comme des pierres tombales et des chauves-souris doivent être évités. La citrouille peut sauter pour franchir les obstacles ou atteindre des bonbons en hauteur. Des maisons hantées offrent des bonus spéciaux mais sont plus dangereuses."
  },
  {
    label: "Pinball flippers",
    description: "Un pinball avec des flippers pour faire rebondir la balle. Le joueur contrôle deux flippers au bas d'une table de pinball remplie d'obstacles et de cibles. La balle ricoche sur les bumpers, traverse les rampes et active des mécanismes spéciaux. Chaque cible touchée rapporte des points et certaines séquences débloquent des bonus. Le but est de maintenir la balle en jeu le plus longtemps possible pour maximiser le score. La physique réaliste des rebonds rend chaque partie unique et imprévisible."
  },
  {
    label: "Hamster dans sa roue",
    description: "Un hamster qui court dans sa roue en sautant les obstacles. Le joueur contrôle un hamster énergique dans une roue qui tourne constamment. Des obstacles comme des barres et des pics apparaissent régulièrement et le hamster doit sauter pour les éviter. La roue accélère progressivement et les obstacles deviennent plus fréquents. Des graines donnent des points bonus et de l'énergie. Le défi est de maintenir un rythme constant tout en réagissant rapidement aux obstacles. L'endurance et les réflexes sont essentiels."
  },
  {
    label: "Memory cartes",
    description: "Des cartes à retourner pour trouver les paires identiques. Le joueur doit mémoriser l'emplacement des cartes dans une grille pour former des paires. Chaque carte retournée se révèle brièvement avant de se cacher à nouveau. Le but est de trouver toutes les paires en utilisant le moins de coups possible. Le nombre de cartes augmente à chaque niveau et des cartes spéciales ajoutent des défis supplémentaires. La mémoire visuelle et la stratégie sont les compétences clés pour réussir."
  },
  {
    label: "Skieur slalom",
    description: "Un skieur qui descend la pente en slalomant entre les sapins. Le joueur contrôle un skieur qui dévale automatiquement une pente enneigée parsemée d'arbres. Le skieur peut virer à gauche ou à droite pour éviter les obstacles tout en maintenant sa vitesse. Des drapeaux marquent un parcours de slalom à suivre pour des points bonus. Des sauts permettent de franchir des obstacles ou d'atteindre des zones bonus. La neige fraîche ralentit le skieur tandis que la glace l'accélère dangereusement."
  },
  {
    label: "Coccinelle sur feuilles",
    description: "Une coccinelle qui se balade sur les feuilles sans tomber. Le joueur guide une coccinelle mignonne qui explore un jardin en marchant sur les feuilles et les branches. Certaines feuilles sont fragiles et se cassent après un court délai, d'autres bougent avec le vent. La coccinelle doit collecter de la rosée et des petits insectes tout en évitant de tomber au sol. Des fourmis constituent des obstacles mobiles et des araignées tissent des toiles-pièges. L'agilité et la planification sont nécessaires pour naviguer en sécurité."
  },
  {
    label: "Dinosaure saute cactus",
    description: "Un dinosaure qui court en sautant par-dessus les cactus. Le joueur contrôle un dinosaure préhistorique qui court automatiquement dans un désert rempli de cactus. Le dinosaure doit sauter au bon moment pour éviter les obstacles tout en maintenant sa vitesse. Des ptérodactyles volent parfois au-dessus et nécessitent de se baisser. Des œufs de dinosaure sont dispersés et rapportent des points bonus. La vitesse augmente progressivement et les obstacles deviennent plus variés et imprévisibles."
  },
  {
    label: "Lettres tombent",
    description: "Des lettres qui tombent pour former des mots rapidement. Le joueur doit attraper les lettres qui descendent du ciel et les organiser pour former des mots valides. Plus le mot est long et rare, plus il rapporte de points. Un dictionnaire interne vérifie la validité des mots formés. Les lettres tombent de plus en plus vite et certaines lettres spéciales donnent des bonus multiplicateurs. Le défi est de penser rapidement tout en gérant la pression temporelle des lettres qui s'accumulent."
  },
  {
    label: "Phoque jongleur",
    description: "Un phoque qui jongle avec des balles sur son museau. Le joueur contrôle un phoque dressé qui doit maintenir plusieurs balles en l'air en les faisant rebondir sur son museau. Chaque balle a un poids et une vitesse différents, nécessitant des ajustements précis. Le phoque peut se déplacer latéralement pour rattraper les balles qui dérivent. Des balles spéciales apparaissent parfois avec des effets bonus. L'objectif est de maintenir le jonglage le plus longtemps possible sans faire tomber de balles."
  },
  {
    label: "Tir à l'arc",
    description: "Une flèche qui vole droit vers la cible au centre. Le joueur doit ajuster l'angle et la puissance de tir pour atteindre des cibles à différentes distances. Le vent peut affecter la trajectoire de la flèche et doit être pris en compte. Des cibles mobiles ajoutent de la difficulté et rapportent plus de points. Certaines cibles sont partiellement cachées derrière des obstacles. Le score dépend de la précision et de la zone de la cible touchée (centre = maximum de points)."
  },
  {
    label: "Crabe évite vagues",
    description: "Un crabe qui marche de côté sur la plage en évitant les vagues. Le joueur contrôle un crabe agile qui collecte des coquillages sur la plage tout en évitant les vagues qui montent et descendent. Le crabe ne peut se déplacer que latéralement et doit anticiper le mouvement des vagues. Des mouettes plongent parfois pour attraper le crabe. Des rochers offrent des refuges temporaires mais bloquent l'accès à certains coquillages. Le timing est crucial pour naviguer en sécurité entre les vagues."
  },
  {
    label: "Match-3 coloré",
    description: "Des blocs de couleur à aligner pour les faire disparaître. Le joueur échange des blocs adjacents pour former des lignes de trois blocs identiques ou plus. Quand une ligne se forme, les blocs disparaissent et les blocs du dessus tombent pour combler les espaces. Des combos se forment quand plusieurs disparitions s'enchaînent automatiquement. Des blocs spéciaux avec des pouvoirs explosifs apparaissent lors de combos importants. L'objectif est d'atteindre un score cible avant que le temps ne soit écoulé."
  },
  {
    label: "Manchot glisse",
    description: "Un manchot qui glisse sur le ventre en collectant des sardines. Le joueur contrôle un manchot qui glisse automatiquement sur la glace en se poussant avec ses nageoires. Des sardines sont dispersées sur le parcours glacé et le manchot doit les collecter en passant dessus. Des trous dans la glace constituent des obstacles mortels à éviter. Le manchot peut sauter par-dessus les petits obstacles et utiliser les pentes pour accélérer. Des poissons spéciaux donnent des bonus temporaires comme l'invincibilité."
  },
  {
    label: "Bille labyrinthe",
    description: "Une bille qui roule dans un parcours plein de virages. Le joueur contrôle l'inclinaison d'un plateau pour faire rouler une bille métallique vers la sortie. Des obstacles comme des trous et des bumpers perturbent le parcours. La bille obéit aux lois de la physique et peut prendre de la vitesse dans les descentes. Des checkpoint permettent de reprendre en cas de chute. Le défi est de maîtriser l'inertie et la gravité pour naviguer précisément dans le labyrinthe tridimensionnel."
  },
  {
    label: "Écureuil collecte glands",
    description: "Un écureuil qui saute d'arbre en arbre pour ramasser des glands. Le joueur contrôle un écureuil agile qui bondit de branche en branche dans une forêt dense. Des glands sont accrochés aux branches et l'écureuil doit les collecter tous avant l'arrivée de l'hiver. Certaines branches sont fragiles et se cassent, d'autres bougent avec le vent. Des prédateurs comme les hiboux patrouillent et constituent des dangers. L'écureuil peut stocker temporairement des glands et les cacher dans des cachettes secrètes."
  },
  {
    label: "Plombier connecte tuyaux",
    description: "Des tuyaux à connecter pour faire couler l'eau jusqu'au bout. Le joueur dispose de sections de tuyaux de formes variées qu'il doit placer sur une grille pour créer un chemin continu. L'eau commence à couler après un délai et doit pouvoir circuler sans fuite depuis l'entrée jusqu'à la sortie. Des obstacles sur la grille compliquent le placement des tuyaux. Certains tuyaux spéciaux ont des propriétés particulières comme des vannes ou des pompes. Le niveau est réussi quand l'eau atteint la sortie."
  },
  {
    label: "Fantôme traverse murs",
    description: "Un fantôme qui traverse les murs en collectant des pièces. Le joueur contrôle un fantôme spectral qui peut passer à travers certains murs mais pas tous. Des pièces d'or anciennes sont dispersées dans un château hanté et le fantôme doit les collecter. Certains murs sont bénis et bloquent le passage du fantôme. Des chasseurs de fantômes patrouillent avec des détecteurs et constituent une menace. L'objectif est de récupérer tous les trésors tout en évitant les pièges et les chasseurs."
  },
  {
    label: "Voiture looping",
    description: "Une voiture qui fait des loopings sur un circuit fou. Le joueur contrôle une voiture de course sur un circuit vertical avec des loopings, des sauts et des virages impossibles. La vitesse doit être maintenue suffisamment élevée pour franchir les loopings sans tomber. Des boost pads accélèrent la voiture et des obstacles ralentissent. Le carburant se consume et doit être rechargé aux stations-service. L'objectif est de terminer le circuit le plus rapidement possible tout en évitant les sorties de route."
  },
  {
    label: "Canard nage étang",
    description: "Un canard qui nage dans l'étang en évitant les nénuphars. Le joueur guide un canard qui nage librement dans un étang parsemé de nénuphars et d'obstacles. Le canard doit collecter du pain jeté par les visiteurs tout en évitant les nénuphars qui bloquent le passage. Des poissons nagent sous la surface et peuvent être attrapés en plongeant. Le courant de l'eau affecte la nage et des zones de vase ralentissent le canard. L'objectif est de collecter le maximum de nourriture avant la tombée de la nuit."
  },
  {
    label: "Calculatrice mathématique",
    description: "Des chiffres qui s'additionnent pour atteindre le bon total. Le joueur doit combiner des chiffres qui apparaissent sur l'écran pour former des opérations mathématiques correctes. Des nombres cibles sont affichés et le joueur doit les atteindre en utilisant addition, soustraction, multiplication et division. Le temps est limité et les calculs deviennent plus complexes. Des bonus sont accordés pour les solutions rapides et créatives. L'objectif est de résoudre un maximum d'équations avant la fin du temps imparti."
  },
  {
    label: "Papillon butine",
    description: "Un papillon qui voltige de fleur en fleur sans se fatiguer. Le joueur contrôle un papillon délicat qui doit visiter toutes les fleurs d'un jardin pour les polliniser. Le papillon a une énergie limitée qui se recharge au soleil et se consomme en volant. Des courants d'air peuvent aider ou gêner le vol selon leur direction. Des prédateurs comme les araignées et les oiseaux constituent des dangers. Des fleurs spéciales donnent des bonus d'énergie et certaines ne s'ouvrent qu'à certains moments de la journée."
  },
  {
    label: "Boule dévale montagne",
    description: "Une boule qui roule en bas de la montagne en évitant les rochers. Le joueur contrôle une boule qui dévale automatiquement une pente rocheuse parsemée d'obstacles. La boule peut être dirigée latéralement pour éviter les rochers, les arbres et les précipices. La vitesse augmente constamment et la boule peut rebondir sur certains obstacles. Des power-ups donnent des capacités temporaires comme l'invincibilité ou la destruction d'obstacles. L'objectif est de descendre le plus loin possible sans se crasher."
  },
  {
    label: "Fourmis en file",
    description: "Des fourmis qui marchent en file indienne vers la fourmilière. Le joueur guide une colonie de fourmis qui doivent transporter de la nourriture jusqu'à leur fourmilière. Les fourmis suivent automatiquement un chemin tracé par le joueur mais peuvent être distraites par des obstacles. Des prédateurs comme les fourmilions creusent des pièges sur le chemin. La météo affecte le comportement des fourmis et certaines zones sont plus difficiles à traverser. L'objectif est de ramener le maximum de nourriture avant l'arrivée de l'hiver."
  },
  {
    label: "Singe se balance",
    description: "Un singe qui se balance de liane en liane dans la jungle. Le joueur contrôle un singe agile qui traverse la canopée en se balançant de liane en liane. Le timing est crucial pour lâcher une liane au bon moment et attraper la suivante. Certaines lianes sont fragiles et se cassent, d'autres sont trop courtes. Des bananes sont dispersées dans les arbres et rapportent des points bonus. Des serpents et des panthères constituent des dangers à éviter. L'objectif est de traverser la jungle le plus rapidement possible."
  },
  {
    label: "Constellation étoiles",
    description: "Des étoiles qui brillent et qu'il faut relier entre elles. Le joueur doit tracer des lignes entre les étoiles pour reproduire des constellations célèbres. Chaque constellation a une forme spécifique et doit être tracée dans le bon ordre. Les étoiles scintillent et peuvent être difficiles à voir par moments. Des météores traversent parfois l'écran et effacent les lignes tracées. Le télescope peut être utilisé pour zoomer sur les étoiles distantes. L'objectif est de compléter toutes les constellations avant l'aube."
  },
  {
    label: "Poisson évite requins",
    description: "Un poisson qui nage dans l'aquarium en évitant les requins. Le joueur contrôle un petit poisson coloré dans un grand aquarium peuplé de requins affamés. Le poisson doit collecter de la nourriture qui tombe d'en haut tout en évitant les requins qui patrouillent. Des coraux offrent des cachettes temporaires mais limitent la mobilité. Le poisson peut nager plus vite en consommant de l'énergie mais doit se reposer régulièrement. L'objectif est de survivre le plus longtemps possible et de grandir en collectant de la nourriture."
  },
  {
    label: "Araignée tisse toile",
    description: "Une araignée qui tisse sa toile pour attraper les mouches. Le joueur contrôle une araignée qui doit construire une toile stratégique pour piéger les mouches qui volent. La toile se construit en reliant des points d'ancrage et doit être suffisamment dense pour capturer les insectes. Les mouches suivent des trajectoires prévisibles mais peuvent changer de direction. Le vent peut détruire certaines parties de la toile. L'objectif est de capturer un certain nombre de mouches avant que la toile ne soit trop endommagée."
  },
  {
    label: "Récolte pommes",
    description: "Des pommes qui tombent de l'arbre à réceptionner dans le panier. Le joueur contrôle un fermier avec un panier qui doit attraper les pommes qui tombent des arbres. Les pommes tombent à différents moments et vitesses selon le vent. Certaines pommes sont véreuses et font perdre des points si elles sont attrapées. Des bonus apparaissent parfois sous forme de pommes dorées. Le panier peut être amélioré pour devenir plus grand ou plus rapide. L'objectif est de récolter le maximum de bonnes pommes avant la fin de la saison."
  },
  {
    label: "Lapin bondit champs",
    description: "Un lapin qui bondit dans les champs en évitant les trous. Le joueur contrôle un lapin énergique qui traverse des champs en sautant par-dessus les obstacles. Des trous de lapins creusés par d'autres lapins constituent des pièges à éviter. Le lapin peut faire des bonds normaux ou des super-bonds qui consomment de l'énergie. Des carottes sont dispersées dans les champs et redonnent de l'énergie. Des fermiers avec des chiens patrouillent et constituent une menace. L'objectif est de traverser tous les champs pour retrouver sa famille."
  },
  {
    label: "Goutte descend vitre",
    description: "Une goutte d'eau qui descend le long de la vitre en zigzag. Le joueur contrôle une goutte de pluie qui glisse sur une vitre inclinée en suivant les irregularités de la surface. La goutte peut fusionner avec d'autres gouttes pour devenir plus grosse et plus rapide. Des obstacles comme des branches et des feuilles bloquent parfois le chemin. Le vent peut pousser la goutte dans différentes directions. L'objectif est de guider la goutte jusqu'en bas de la vitre en collectant d'autres gouttes pour former la plus grosse goutte possible."
  },
  {
    label: "Timing cercles",
    description: "Des cercles concentriques à toucher pile au bon moment. Le joueur doit appuyer sur un bouton précisément quand un cercle mobile se superpose parfaitement avec un cercle fixe. Le timing doit être parfait pour marquer des points et la difficulté augmente avec la vitesse. Des cercles de couleurs différentes ont des valeurs de points différentes. Certains cercles changent de taille ou de vitesse de manière imprévisible. L'objectif est d'atteindre un score cible en maintenant une précision élevée sur une série de cercles."
  },
  {
    label: "Hérisson roule",
    description: "Un hérisson qui se roule en boule pour rouler plus vite. Le joueur contrôle un hérisson qui peut alterner entre marcher normalement et se rouler en boule. En boule, le hérisson roule rapidement mais est difficile à contrôler. En marchant, il est plus lent mais peut s'arrêter précisément et grimper. Des épines et des prédateurs constituent des dangers que le hérisson peut éviter en se roulant en boule. Des pommes donnent des points bonus. L'objectif est de traverser la forêt en utilisant la bonne technique selon les obstacles."
  },
  {
    label: "Libellule chasse moustiques",
    description: "Une libellule qui vole au-dessus de l'étang en chassant les moustiques. Le joueur contrôle une libellule agile qui survole un étang pour capturer des moustiques volants. La libellule peut planer et faire des accélérations rapides pour attraper ses proies. Les moustiques volent en essaims et suivent des patterns complexes. Des nénuphars offrent des perchoirs pour se reposer et récupérer de l'énergie. D'autres prédateurs comme les grenouilles constituent une menace. L'objectif est de capturer un maximum de moustiques avant la tombée de la nuit."
  },
  {
    label: "Puzzle formes",
    description: "Des formes géométriques à faire rentrer dans les bons trous. Le joueur doit faire tourner et positionner des formes géométriques pour qu'elles s'emboîtent dans les trous correspondants. Chaque forme a une orientation spécifique et doit être placée avec précision. Le temps est limité et les formes deviennent plus complexes. Des formes spéciales peuvent se déformer ou changer de couleur. L'objectif est de placer toutes les formes correctement avant la fin du temps imparti pour débloquer le niveau suivant."
  },
  {
    label: "Ourson récolte miel",
    description: "Un ourson qui récolte du miel en évitant les abeilles en colère. Le joueur contrôle un ourson gourmand qui grimpe aux arbres pour récolter du miel dans les ruches. Les abeilles deviennent agressives quand l'ourson s'approche et le poursuivent. L'ourson peut se cacher derrière les branches et utiliser la fumée pour calmer les abeilles. Différents types de miel rapportent des points différents. L'objectif est de récolter le maximum de miel tout en évitant les piqûres d'abeilles qui font perdre de l'énergie."
  }
];