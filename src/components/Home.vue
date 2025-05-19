<script setup>
    import { ref, onMounted } from 'vue';
    import Card from './Card.vue';
    import Enigme from "./Enigme.vue";
    import { useCardsStore } from '@/stores/cards'
    import { animeCards, enigmeCards } from '@/data/cards'

const cardsStore = useCardsStore()

// Utiliser les données centralisées
const Images = ref(animeCards)
const Enigmes = ref(enigmeCards)

// Charger les cartes résolues au montage du composant
onMounted(() => {
  cardsStore.loadFromLocalStorage()
  cardsStore.initializeStats(Images.value, Enigmes.value)
})

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
    font-weight: lighter;
    font-size: 3em;
    color: rgba(255, 255, 255, 0.979);
    text-align: center;
    padding-top: .5em;
    background: linear-gradient(to top, #1c1953, #1E1E2F);
    margin: 0;
    /* background-color: #9595ffd3; */
    width: 100%;
    height: 1.5em;
  }
    .content {
    height: 85vh;
    width: 100%;
    /* background: linear-gradient(to top, #000000, #3a3838); */
    background-color: #1E1E2F;
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