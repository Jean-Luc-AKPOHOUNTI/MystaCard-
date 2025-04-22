<script setup>
import { ref } from 'vue';

const props = defineProps({
  image: {
    type: Object,
    required: true
  }
});

const userInput = ref('');
const isCorrect = ref(false);
const isShaking = ref(false);
const headerText = ref('Who is it ?');

const checkAnswer = () => {
  // On compare en ignorant la casse (majuscules/minuscules)
  if (userInput.value.toLowerCase() === props.image.name.toLowerCase()) {
    isCorrect.value = true;
  } else {
    // Déclenche la vibration
    isShaking.value = true;
    setTimeout(() => {
      isShaking.value = false; // Arrête la vibration après 500ms
    }, 500);
  }
};
</script>

<template>
  <div class="carte" :class="{ 'correct': isCorrect, 'shake': isShaking }">
    <slot name="header" class="header">
        <p v-if="!isCorrect" class="header-text">{{ headerText }}</p>
        <p v-else class="header-text">{{userInput}}</p>
    </slot>
    <slot name="default">
      <!-- On cache l'image si la réponse n'est pas correcte -->
      <div class="image-container">
        <img :src="image.src" alt="image" :class="{ 'hidden': !isCorrect }">
        <div v-if="!isCorrect" class="mystery">
          {{ image.description }}
        </div>
      </div>
    </slot>
    <slot name="footer" class="footer">
      <div v-if="!isCorrect">
        <form @submit.prevent="checkAnswer">
          <input 
            type="text" 
            v-model="userInput"
            :disabled="isCorrect"
            placeholder="Qui est-ce ?"
          >
          <button type="submit" :disabled="isCorrect">&Sqrt;</button>
        </form>
      </div>
      <div v-else class="success-message">
        <p>{{ image.mangaName }}</p>
      </div>
    </slot>
  </div>
</template>

<style scoped>

    @media only screen and (max-width: 768px) {
      .carte {
        width: 80vw; /* Ajuste la largeur pour les petits écrans */
        height: 50vh; /* Ajuste la hauteur pour les petits écrans */
      }
    }
    .carte {
      margin-top: 1em;
      height: 70vh;
      border: 1px solid;
      width: 20vw;
      margin-inline: .5em;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
      background-color: rgba(0, 2, 116, 0.808);
      border-radius: 1em;
      background-image: url('../assets/Mages/background.png');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      transform-style: preserve-3d; /* Active les transformations 3D */ 

    }

    .carte:hover {
      transform: scale(1.1); 
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.5); /* Ombre plus marquée */
    }

    .header-text {
      color: white;
      font-size: 1.5em;
      font-family: 'OldeEnglish';
      text-align: center;
      transition: all 0.3s ease;
      margin: 0;
      letter-spacing: 0.05em;
    }

    .carte.correct {
      background-color: rgba(49, 0, 163, 0.644);
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mystery {
      color: rgb(255, 255, 255);
      position: absolute;
      font-size: 1.2em;
      font-weight: bold;
      font-family: cursive;
      text-align: center;
      padding: 1em;
    }

    .carte img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: opacity 0.3s ease;
    }

    .carte img.hidden {
      opacity: 0;
    }

    form {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    form input {
      width: 60%;
      height: 100%;
      font-weight: bold;
      font-family: cursive;
      text-align: center;
      margin-inline-end: 1em;
      border-radius: 1em;
      border: none;
      background-color: rgba(255, 255, 255, 0.842);
    }

    form button {
      border-radius: 0.5em;
      padding: 0.5em;
      border: none;
      background-color: rgba(2, 68, 122, 0.842);
      cursor: pointer;
      color: white;
      font-weight: bold;
    }

    form button:disabled {
      background-color: rgba(2, 68, 122, 0.4);
      cursor: not-allowed;
    }

    .success-message {
      color: white;
      font-weight: bold;
      font-size: 1.2em;
      margin: 0;
      padding: 0;
    }

    .success-message p {
      font-family: cursive;
      font-size: 1.5em;
      text-align: center;
      margin: 0;
    }

    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      50% { transform: translateX(10px); }
      75% { transform: translateX(-10px); }
      100% { transform: translateX(0); }
    }

    .carte.shake {
      animation: shake 0.5s ease;
    }
</style>