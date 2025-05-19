<script setup>
import { ref, onMounted, nextTick, computed, onUnmounted } from 'vue';
import { useCardsStore } from '@/stores/cards';
import { enigmesFacile } from '@/data/enigmesFacile';
import { Icon } from '@iconify/vue';

// Variable globale pour l'audio
let globalAudio = null;

const cardsStore = useCardsStore();
const currentCardIndex = ref(0);
const userInput = ref('');
const isCorrect = ref(false);
const isShaking = ref(false);
const headerText = ref('Devinez l\'énigme !');
const score = ref(0);
const attempts = ref(0);
const isPlaying = ref(false);
const audioVolume = ref(0.2);
const showVolumeControl = ref(false);

// Initialisation de l'audio
onMounted(async () => {
    // Si l'audio global existe déjà, on l'utilise
    if (!globalAudio) {
        globalAudio = new Audio('/src/assets/music/background.mp3');
        globalAudio.loop = true;
    }
    
    // On s'assure que l'audio est bien arrêté avant de démarrer
    globalAudio.pause();
    globalAudio.currentTime = 0;
    globalAudio.volume = audioVolume.value;
    
    try {
        await globalAudio.play();
        isPlaying.value = true;
    } catch (error) {
        console.log('Lecture automatique non autorisée');
        isPlaying.value = false;
    }
    
    cardsStore.loadFromLocalStorage();
    cardsStore.initializeStats([], enigmesFacile);
    await nextTick();
});

// Nettoyage lors de la destruction du composant
onUnmounted(() => {
    if (globalAudio) {
        globalAudio.pause();
        globalAudio.currentTime = 0;
    }
    isPlaying.value = false;
});

// Contrôles audio
const toggleAudio = () => {
    if (!globalAudio) return;
    
    if (isPlaying.value) {
        globalAudio.pause();
    } else {
        globalAudio.play();
    }
    isPlaying.value = !isPlaying.value;
};

const toggleVolumeControl = () => {
    showVolumeControl.value = !showVolumeControl.value;
};

const changeVolume = (event) => {
    if (!globalAudio) return;
    audioVolume.value = event.target.value;
    globalAudio.volume = audioVolume.value;
};

// Filtrer les énigmes non résolues
const availableCards = computed(() => {
    return enigmesFacile.filter(card => !cardsStore.isEnigmeCardSolved(card.name));
});

// Énigme courante
const currentCard = computed(() => {
    return availableCards.value[currentCardIndex.value] || null;
});

// Statistiques
const stats = computed(() => ({
    totalCards: enigmesFacile.length,
    solvedCards: cardsStore.stats.enigmeCards.solved,
    currentStreak: cardsStore.stats.streak,
    accuracy: attempts.value > 0 ? Math.round((score.value / attempts.value) * 100) : 0
}));

// Vérifier la réponse
const checkAnswer = () => {
    if (!currentCard.value) return;
    
    attempts.value++;
    
    if (userInput.value.toLowerCase() === currentCard.value.name.toLowerCase()) {
        isCorrect.value = true;
        score.value++;
        cardsStore.markEnigmeCardAsSolved(currentCard.value.name, currentCard.value);
        
        // Passer à l'énigme suivante après un délai
        setTimeout(() => {
            nextCard();
        }, 2000);
    } else {
        isShaking.value = true;
        setTimeout(() => {
            isShaking.value = false;
        }, 500);
    }
};

// Passer à l'énigme suivante
const nextCard = () => {
    if (currentCardIndex.value < availableCards.value.length - 1) {
        currentCardIndex.value++;
    } else {
        currentCardIndex.value = 0;
    }
    isCorrect.value = false;
    userInput.value = '';
};
</script>

<template>
    <div class="container">
        <!-- Contrôles audio avec volume -->
        <div class="audio-controls">
            <button @click="toggleAudio" class="audio-button" :title="isPlaying ? 'Écouter' : 'Ne pas écouter'">
                <Icon :icon="isPlaying ? 'mdi:ear-hearing' : 'mdi:ear-off'" width="28" height="28" />
            </button>
            <button @click="toggleVolumeControl" class="volume-button" title="Ajuster le volume">
                <Icon :icon="audioVolume > 0.5 ? 'mdi:volume-high' : audioVolume > 0.2 ? 'mdi:volume-medium' : 'mdi:volume-low'" width="24" height="24" />
            </button>
            <div v-if="showVolumeControl" class="volume-control">
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    v-model="audioVolume"
                    @input="changeVolume"
                    class="volume-slider"
                >
            </div>
        </div>

        <div class="facile">
            <div class="game-container">
                <!-- Zone de l'énigme -->
                <div class="card-section">
                    <div v-if="currentCard" class="carte" :class="{ 'correct': isCorrect, 'shake': isShaking }">
                        <p class="header-text">{{ headerText }}</p>
                        <div class="image-container">
                            <img 
                                :src="currentCard.src" 
                                @error="e => e.target.src = '/src/assets/enigmeMages/default.png'" 
                                alt="image" 
                                :class="{ 'hidden': !isCorrect }"
                            >
                            <div v-if="!isCorrect" class="mystery">
                                {{ currentCard.description }}
                                <div class="category">{{ currentCard.category }}</div>
                            </div>
                        </div>
                        <div class="input-section">
                            <form v-if="!isCorrect" @submit.prevent="checkAnswer">
                                <input 
                                    type="text" 
                                    v-model="userInput" 
                                    :disabled="isCorrect" 
                                    placeholder="Quelle est la réponse ?"
                                >
                                <button type="submit" :disabled="isCorrect" class="submit-button">
                                    <Icon icon="mdi:check-circle" width="24" height="24" />
                                </button>
                            </form>
                            <div v-else class="success-message">
                                <p>{{ currentCard.name }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-else class="no-cards">
                        <h2>Félicitations !</h2>
                        <p>Vous avez résolu toutes les énigmes !</p>
                    </div>
                </div>

                <!-- Zone des statistiques -->
                <div class="stats-section">
                    <h2>Statistiques</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h3>Progression</h3>
                            <div class="stat-value">{{ stats.solvedCards }}/{{ stats.totalCards }}</div>
                            <div class="progress-bar">
                                <div class="progress" :style="{ width: (stats.solvedCards / stats.totalCards * 100) + '%' }"></div>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <h3>Précision</h3>
                            <div class="stat-value">{{ stats.accuracy }}%</div>
                            <div class="progress-bar">
                                <div class="progress" :style="{ width: stats.accuracy + '%' }"></div>
                            </div>
                        </div>

                        <div class="stat-card">
                            <h3>Série</h3>
                            <div class="stat-value">{{ stats.currentStreak }} jours</div>
                            <div class="streak-icon">🔥</div>
                        </div>

                        <div class="stat-card">
                            <h3>Score</h3>
                            <div class="stat-value">{{ score }}</div>
                            <div class="attempts">Tentatives: {{ attempts }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    background: none;
    color: aliceblue;
    width: 100vw;
    margin: 0;
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(-15deg, #ffffff 0%, #1a1a4a 100%);
}

h3 {
    margin: 0;
    padding: .5em;
    font-size: 1.5em;
    color: black;
    width: 100%;
    text-align: start;
}
.facile {
    background: linear-gradient(-15deg, #0a0a2a 0%, #1a1a4a 100%); /* Fond spatial ici */
    border: 1px solid rgba(41, 255, 151, 0.3);
    backdrop-filter: blur(10px);
    width: 85%;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(41, 255, 151, 0.2);
    min-height: 75vh;
    padding: 15px;
    position: relative;
    z-index: 1;
    animation: float 4s infinite ease-in-out;
    overflow: hidden;
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.game-container {
    display: flex;
    gap: 1.5rem;
    height: 100%;
    align-items: flex-start;
    padding-top: 1rem;
}

.card-section {
    flex: 1.5;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 1rem;
}

.stats-section {
    flex: 1;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    box-shadow: 0 0 20px rgba(41, 255, 151, 0.2);
    border-radius: 10px;
    padding: 1rem;
    max-height: 65vh;
    overflow-y: auto;
    position: sticky;
    top: 1rem;
}

.stats-section h2 {
    text-align: center;
    color: #29ff97;
    margin-bottom: 1.5rem;
}

.stats-grid {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: repeat(2, 1fr);
}

.stat-card {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.8rem;
    border-radius: 8px;
    text-align: center;
}

.stat-card h3 {
    color: #29ff97;
    margin: 0 0 0.5rem 0;
}

.stat-value {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 0.4rem;
}

.progress-bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background: #29ff97;
    transition: width 0.3s ease;
}

.streak-icon {
    font-size: 1.5rem;
    margin-top: 0.5rem;
}

.attempts {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
}

.carte {
    width: 100%;
    max-width: 300px;
    height: 60vh;
    border: 1px solid #29ff97;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to top, rgba(55, 55, 55, 0.9), rgba(0, 0, 0, 0.9));
    backdrop-filter: blur(5px);
    box-shadow: 0 0 30px rgba(41, 255, 151, 0.3);
    border-radius: 1em;
    padding: 1.2rem;
    transition: transform 0.3s ease;
}

.carte:hover {
    transform: scale(1.02);
}

.header-text {
    color: white;
    font-size: 1.5em;
    font-family: 'OldeEnglish';
    text-align: center;
    margin: 0;
}

.image-container {
    position: relative;
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.category {
    font-size: 0.9em;
    color: #29ff97;
    margin-top: 1em;
    font-style: italic;
}

.mystery {
    color: white;
    position: absolute;
    font-size: 1.2em;
    font-weight: bold;
    font-family: cursive;
    text-align: center;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
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

.input-section {
    width: 100%;
    padding: 1rem;
}

form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

input {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.9);
    font-family: cursive;
    text-align: center;
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background: #29ff97;
    color: #1d5535;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background: #1d5535;
    color: #29ff97;
}

.success-message {
    text-align: center;
    color: #29ff97;
    font-size: 1.2em;
    font-weight: bold;
}

.no-cards {
    text-align: center;
    padding: 2rem;
}

.no-cards h2 {
    color: #29ff97;
    font-size: 2em;
    margin-bottom: 1rem;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.carte.shake {
    animation: shake 0.5s ease;
}

.carte.correct {
    border-color: #29ff97;
    box-shadow: 0 0 20px #29ff97;
}

.audio-controls {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.5);
    padding: 8px;
    border-radius: 25px;
    backdrop-filter: blur(5px);
    z-index: 1000;
}

.audio-button, .volume-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #29ff97;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.volume-button {
    font-size: 0.9em;
}

.volume-control {
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.8);
    padding: 10px;
    border-radius: 20px;
    margin-right: 10px;
    animation: slideIn 0.3s ease;
}

.volume-slider {
    width: 100px;
    height: 4px;
    -webkit-appearance: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    outline: none;
}

.volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: #29ff97;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease;
}

.volume-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #29ff97;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    transition: background 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translate(20px, -50%);
    }
    to {
        opacity: 1;
        transform: translate(0, -50%);
    }
}

@media (max-width: 768px) {
    .audio-controls {
        top: auto;
        bottom: 20px;
        right: 20px;
    }
}
</style>