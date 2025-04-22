<script setup>
    import { ref } from 'vue';
    import Card from './Card.vue';
    import Enigme from "./Enigme.vue";


const Images = ref([
  { name: 'Majin Buu',
    src: '/src/assets/Mages/MajinBuu.png',
    description: 'Je suis une créature maléfique aux formes multiples, parfois enfantin, parfois monstrueux. Je dévore tout sur mon passage, mais au fond, je peux aussi être plein d\'amour et de douceur.',
    mangaName: 'Dragon Ball Z'
  },
  { name: 'Goku',
    src: '/src/assets/Mages/Goku.png',
    description: 'Combattant DBZ, célèbre pour sa force immense, sa capacité à se transformer en Super Saiyan et son esprit de camaraderie.',
    mangaName: 'Dragon Ball Z'
  },
  { name: 'Ichigo',
    src: '/src/assets/Mages/Kurosaki-Ichigo.png',
    description: 'Adolescent avec des pouvoirs de shinigami, capable de protéger les vivants et les âmes des morts, tout en affrontant des ennemis puissants.',
    mangaName: 'Bleach'
  },
  {
    name: "Shenron",
    src: "/src/assets/Mages/Shenron.png",
    description: "Je suis un serpent légendaire, tout puissant, et mes pouvoirs peuvent exaucer trois vœux. On m'appelle lorsque les Dragon Balls sont réunies, mais attention, seul un souhait à la fois peut être formulé.",
    mangaName: 'Dragon Ball Z'
  },
  {
    name: "Luffy",
    src: "/src/assets/Mages/Luffy.png",
    description: "Pirate au chapeau de paille, élastique grâce à son fruit du démon, rêvant de devenir le roi des pirates.",
    mangaName: 'One Piece'
  },
  {
    name: "Kamado Tanjiro",
    src: "/src/assets/Mages/Kamado.png",
    description: "Jeune épéiste au grand cœur, déterminé à sauver sa sœur et à éliminer les démons.",
    mangaName: 'Demon Slayer'
  },
  {
    name: "Porunga",
    src: "/src/assets/Mages/Porunga.png",
    description: "Je suis un dragon immense, capable d'exaucer trois vœux, mais à une différence près : je suis plus puissant et mes vœux ont des règles spécifiques.",
    mangaName: 'Dragon Ball Z'
  },
  {
    name: "Itachi",
    src: "/src/assets/Mages/Itachi2.png",
    description: "Ninja mystérieux et puissant, prêt à tout pour protéger son village, même au prix de sa réputation.",
    mangaName: 'Naruto Shippuden'
  },
  {
    name: "Beerus",
    src: "/src/assets/Mages/Beerus.png",
    description: "Dieu de la destruction au tempérament imprévisible, redouté pour sa puissance divine et son amour pour la nourriture.",
    mangaName: 'Dragon Ball Z'
  },
  {
    name: "Toji",
    src: "/src/assets/Mages/Toji_Fushiguro.png",
    description: "Assassin redoutable, sans énergie occulte mais doté d'une force physique exceptionnelle et de techniques redoutables grâce à ses outils maudits.",
    mangaName: 'Jujutsu Kaisen'
  },
  {
    name: "Tortue Géniale",
    src: "/src/assets/Mages/Tortue_Géniale.png",
    description: "Un vieux maître des arts martiaux drôle mais puissant, qui a entraîné Goku dans Dragon Ball.",
    mangaName: 'Dragon Ball Z'
  },
  {
    name: "Trunks",
    src: "/src/assets/Mages/Trunk.png",
    description: "Un guerrier venu du futur, courageux et déterminé, qui voyage dans le temps pour sauver le monde dans Dragon Ball Z",
    mangaName: 'Dragon Ball Z'
  },
  {
    name: "Trafalgar Law",
    src: "/src/assets/Mages/Traffy.png",
    description: "Un capitaine pirate intelligent et mystérieux, capable de manipuler l\’espace avec son pouvoir de l\’Ope Ope no Mi",
    mangaName: 'One Piece'
  },
  {
    name: "Sasuke",
    src: "/src/assets/Mages/sasuke1.png",
    description: "Antagoniste de Naruto Shippuden",
    mangaName: 'Naruto Shippuden'
  },
  {
    name: "Boruto",
    src: "/src/assets/Mages/Boruto.png",
    description: "Fils du héros de Konoha",
    mangaName: 'Boruto'
  },
  {
    name: "Edward Elric",
    src: "/src/assets/Mages/edward.png",
    description: "Un alchimiste prodige en quête de la pierre philosophale pour réparer les erreurs du passé et récupérer son corps.",
    mangaName: 'Fullmetal Alchemist'
  },
  {
    name: "Freezer",
    src: "/src/assets/Mages/Freezer.png",
    description: "Tyran galactique impitoyable, extrêmement puissant, qui règne sur l\’univers avec une cruauté sans égale et qui a été l'un des plus grands ennemis de Goku.",
    mangaName: 'Dragon Ball Z'
  },
  {
    name: "Gotrunks",
    src: "/src/assets/Mages/Gotrunks.png",
    description: "La fusion entre Goten et Trunks, un jeune super-sayan arrogant et puissant, avec un style de combat effronté mais qui cache une grande force.",
    mangaName: 'Dragon Ball Z'
  },
  {
    name: "Kakashi Hatake",
    src: "/src/assets/Mages/kakashi.png",
    description: "Un ninja génial et calme, réputé pour son Sharingan et son talent exceptionnel, qui cache derrière son masque un passé tragique et une sagesse profonde.",
    mangaName: 'Naruto Shippuden'
  },
  {
    name :"Naruto Uzumaki",
    src: "/src/assets/Mages/naruto.png",
    description: "Un ninja optimiste et persévérant, qui rêve de devenir Hokage pour être reconnu et protéger son village malgré son passé difficile.",
    mangaName: 'Naruto Shippuden'
  },
  {
    name :"Izuku Midoriya",
    src: "/src/assets/Mages/Izuku.png",
    description: "Un jeune garçon sans pouvoir, déterminé à devenir un grand héros, qui hérite du pouvoir d\’All Might et lutte pour prouver sa valeur.",
    mangaName: 'My Hero Academia'
  },
  {
    name :"Obito Uchiha",
    src: "/src/assets/Mages/obito.png",
    description: "Un ninja au cœur brisé, manipulé par ses propres tragédies, qui cherche à plonger le monde dans l\’illusion pour échapper à la douleur du passé.",
    mangaName: 'Naruto Shippuden'
  }


]);

const Enigmes = ref([
  {
    name: 'La musique',
    src: '/src/assets/enigmeMages/musique.png',
    description: 'Je suis une mélodie qui danse dans l\'air, je suis le rythme de la vie. Je peux être douce ou forte, mais je ne peux pas être vue.',
  },
  { name: 'La Pensée',
    src: '/src/assets/enigmeMages/pensee.png',
    description: 'Aucune limite, je suis l\'esprit, je suis la conscience. Je suis la voix intérieure qui guide vos choix. Qui suis-je ?',
  },
  {
    name: 'Le Temps',
    src: '/src/assets/enigmeMages/temps.png',
    description: 'Je suis invisible, mais je suis toujours là. Je ne peux pas être arrêté, mais je peux être perdu. Je suis précieux, mais je ne peux pas être acheté.',
  },
  {
    name: 'Le Silence',
    src: '/src/assets/enigmeMages/silence.png',
    description: 'Je suis l\'absence de bruit, mais je peux être assourdissant. Je suis souvent recherché, mais rarement trouvé. Je suis un refuge pour les âmes fatiguées.',
  },
  {
    name: 'L\'Ombre',
    src: '/src/assets/enigmeMages/ombre.png',
    description: 'Je suis toujours derrière vous, mais je ne peux jamais être attrapé. Je suis le reflet de votre lumière, mais je ne brille pas.',
  },
  {
    name: 'Un mystère',
    src: '/src/assets/enigmeMages/Mystery.png',
    description: 'Je suis quelque chose que vous ne pouvez pas voir, mais qui est toujours là. Je suis souvent caché, mais je peux être découvert. Je suis un secret, mais je peux être partagé.',
  },
  {
    name: 'Une note de musique',
    src: '/src/assets/enigmeMages/note.png',
    description: 'Je suis une petite partie d\'une mélodie, mais je peux être très puissante. Je suis souvent écrite sur du papier, mais je peux aussi être entendue.',
  },
  {
    name: 'Une Plume',
    src: '/src/assets/enigmeMages/plume.png',
    description: 'Je peux porter le poids de vos pensées. Je suis souvent utilisée pour écrire, mais je ne peux pas parler.',
  },
  {
    name: 'Une bougie',
    src: '/src/assets/enigmeMages/bougie.png',
    description: 'Je suis une source de lumière, mais je peux aussi être éteinte. Je suis souvent utilisée pour créer une ambiance, mais je peux aussi être un symbole de vie.',
  },
  {
    name: 'Un miroir',
    src: '/src/assets/enigmeMages/miroir.png',
    description: 'Je ne peux pas parler. Je suis souvent utilisé pour se préparer, mais je peux aussi être un symbole de vérité.',
  },
  {
    name: 'Un livre',
    src: '/src/assets/enigmeMages/livre.png',
    description: 'Je suis rempli de mots, mais je ne peux pas parler. Je peux vous emmener dans des mondes différents, mais je reste immobile.',
  },
  {
    name: 'Un nuage',
    src: '/src/assets/enigmeMages/nuage.png',
    description: 'Je suis léger comme une plume, mais je peux être lourd comme une tempête. Je suis souvent associé à la pluie, mais je peux aussi être un symbole de rêve.',
  },
  {
    name: 'Un rêve',
    src: '/src/assets/enigmeMages/reve.png',
    description: 'Je suis quelque chose que vous vivez lorsque vous dormez, mais je peux aussi être un objectif à atteindre. Je suis souvent flou, mais je peux être très réel.',
  },
  {
    name: 'Un secret',
    src: '/src/assets/enigmeMages/secret.png',
    description: 'Je suis quelque chose que vous gardez pour vous, mais je peux aussi être partagé. Je suis souvent mystérieux, mais je peux être très réel.',
  },
  {
    name: 'Une étoile',
    src: '/src/assets/enigmeMages/etoile.png',
    description: 'Je brille dans le ciel, mais je ne peux pas être touchée. Je suis souvent associée à des vœux, mais je peux aussi être un symbole de rêve.',
  }
])

</script>

<template>

    <h1>Anime Cartes</h1>

    <div class="content">
      <div class="cards">
        <Card v-for="image in Images" :key="image.name" :image="image"/>
      </div>
    </div>

    <h1>Enigme Cartes</h1>

    <div class="content">
      <div class="cards">
        <Enigme v-for="enigme in Enigmes" :key="enigme.name" :enigme="enigme"/>
      </div>
    </div>
</template>

<style scoped>

  h1 {
    font-family: 'OldeEnglish';
    font-size: 3em;
    color: rgb(255, 255, 255);
    text-align: center;
    padding-top: .5em;
    margin: 0;
    background-color: #01013ad3;
    width: 100%;
    height: 1.5em;
  }
    .content {
    height: 85vh;
    width: 100%;
    background-color: #181a79;
    overflow-x: scroll; /* Garde le défilement */
    position: relative;
    -ms-overflow-style: none;  /* Cacher la scrollbar pour IE et Edge */
    scrollbar-width: none;     /* Cacher la scrollbar pour Firefox */
  }

  .cards {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 2rem;
    gap: 2rem;
    min-width: min-content;
    height: 100%;
    perspective: 1000px; /* Ajoute une perspective pour l'effet 3D */
  }

  /* Conservation du comportement fluide */
  .content {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
  }
</style>