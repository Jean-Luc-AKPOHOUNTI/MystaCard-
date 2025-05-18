<script setup>
import { useCardsStore } from '@/stores/cards'
import { onMounted, computed } from 'vue'
import { animeCards, enigmeCards } from '@/data/cards'

const cardsStore = useCardsStore()

// Initialiser les statistiques avec les données des cartes
onMounted(() => {
  // Charger d'abord les données sauvegardées
  cardsStore.loadFromLocalStorage()
  // Puis initialiser les statistiques avec les données des cartes
  cardsStore.initializeStats(animeCards, enigmeCards)
})

// Calculer les statistiques par manga
const mangaStats = computed(() => {
  return Object.entries(cardsStore.stats.animeCards.byManga)
    .map(([name, stats]) => ({
      name,
      ...stats,
      progress: Math.round((stats.solved / stats.total) * 100)
    }))
    .sort((a, b) => b.solved - a.solved)
})

// Calculer les statistiques globales
const animeStats = computed(() => ({
  total: animeCards.length,
  solved: cardsStore.stats.animeCards.solved,
  progress: cardsStore.animeProgress
}))

const enigmeStats = computed(() => ({
  total: enigmeCards.length,
  solved: cardsStore.stats.enigmeCards.solved,
  progress: cardsStore.enigmeProgress
}))
</script>

<template>
  <div class="profile-container">
    <!-- En-tête du profil -->
    <div class="profile-header">
      <div class="profile-avatar">
        <img src="../assets/avatar.png" alt="Avatar" class="avatar-image">
        <div class="level-badge">Niveau {{ cardsStore.playerLevel }}</div>
      </div>
      <div class="profile-info">
        <h1>Profil du Joueur</h1>
        <div class="streak-info">
          <span class="streak-icon">🔥</span>
          <span class="streak-count">{{ cardsStore.stats.streak }} jours de série</span>
        </div>
      </div>
    </div>

    <!-- Statistiques principales -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-info">
          <h3>Progression Globale</h3>
          <div class="stat-value">{{ cardsStore.globalProgress }}%</div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: cardsStore.globalProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🎴</div>
        <div class="stat-info">
          <h3>Cartes Anime</h3>
          <div class="stat-value">{{ animeStats.solved }}/{{ animeStats.total }}</div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: animeStats.progress + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">❓</div>
        <div class="stat-info">
          <h3>Énigmes</h3>
          <div class="stat-value">{{ enigmeStats.solved }}/{{ enigmeStats.total }}</div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: enigmeStats.progress + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progression par manga -->
    <div class="manga-progress-section">
      <h2>Progression par Manga</h2>
      <div class="manga-grid">
        <div v-for="manga in mangaStats" 
             :key="manga.name" 
             class="manga-card"
             :class="{ 'completed': manga.progress === 100 }">
          <div class="manga-header">
            <h3>{{ manga.name }}</h3>
            <span class="manga-count">{{ manga.solved }}/{{ manga.total }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: manga.progress + '%' }"></div>
          </div>
          <div class="manga-progress-text">{{ manga.progress }}%</div>
        </div>
      </div>
    </div>

    <!-- Cartes résolues -->
    <div class="solved-cards-section">
      <h2>Dernières Cartes Résolues</h2>
      <div class="solved-cards-grid">
        <div v-for="cardName in cardsStore.solvedAnimeCards.slice(-6)" 
             :key="cardName" 
             class="solved-card">
          <div class="card-content">
            <span class="card-name">{{ cardName }}</span>
            <span class="card-badge">Résolu</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 2em;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2em;
  margin-bottom: 3em;
  padding: 2em;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1em;
  backdrop-filter: blur(10px);
}

.profile-avatar {
  position: relative;
}

.avatar-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #7fff7f;
  object-fit: cover;
}

.level-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #ffd700;
  color: #1a1a2e;
  padding: 0.5em 1em;
  border-radius: 1em;
  font-weight: bold;
  font-size: 0.9em;
}

.profile-info h1 {
  font-size: 2.5em;
  color: #ffd700;
  margin: 0;
}

.streak-info {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-top: 0.5em;
  color: #ff6b6b;
}

.streak-icon {
  font-size: 1.5em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2em;
  margin-bottom: 3em;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1em;
  padding: 1.5em;
  display: flex;
  align-items: center;
  gap: 1.5em;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5em;
}

.stat-info {
  flex: 1;
}

.stat-info h3 {
  margin: 0;
  color: #7fff7f;
  font-size: 1.2em;
}

.stat-value {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.5em 0;
}

.progress-bar {
  height: 0.5em;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1em;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #7fff7f, #ffd700);
  transition: width 0.3s ease;
}

.manga-progress-section {
  margin-bottom: 3em;
}

.manga-progress-section h2 {
  color: #ffd700;
  margin-bottom: 1.5em;
}

.manga-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5em;
}

.manga-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1em;
  padding: 1.5em;
  transition: transform 0.3s;
}

.manga-card:hover {
  transform: translateY(-5px);
}

.manga-card.completed {
  border: 2px solid #7fff7f;
}

.manga-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}

.manga-header h3 {
  margin: 0;
  color: #ffd700;
}

.manga-count {
  color: #7fff7f;
}

.manga-progress-text {
  text-align: right;
  margin-top: 0.5em;
  color: #7fff7f;
}

.solved-cards-section {
  margin-bottom: 3em;
}

.solved-cards-section h2 {
  color: #ffd700;
  margin-bottom: 1.5em;
}

.solved-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1em;
}

.solved-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1em;
  padding: 1em;
  transition: transform 0.3s;
}

.solved-card:hover {
  transform: translateY(-5px);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-name {
  color: white;
}

.card-badge {
  background: #7fff7f;
  color: #1a1a2e;
  padding: 0.3em 0.8em;
  border-radius: 1em;
  font-size: 0.8em;
  font-weight: bold;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .manga-grid {
    grid-template-columns: 1fr;
  }
}
</style>