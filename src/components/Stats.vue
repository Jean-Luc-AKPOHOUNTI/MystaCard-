<script setup>
import { useCardsStore } from '@/stores/cards'
import { computed } from 'vue'

const cardsStore = useCardsStore()

// Calculer les statistiques par manga
const mangaStats = computed(() => {
  return Object.entries(cardsStore.stats.animeCards.byManga).map(([name, stats]) => ({
    name,
    ...stats,
    progress: Math.round((stats.solved / stats.total) * 100)
  }))
})
</script>
<template>
  <div class="stats-container">
    <div class="stats-grid">
      <!-- Progression globale -->
      <div class="stat-card">
        <h3>Progression Globale</h3>
        <div class="progress-circle">
          <div class="progress" :style="{ width: globalProgress + '%' }"></div>
        </div>
        <span class="streak-value">{{ streak }}</span>
      </div>

      <!-- Progression par type -->
      <div class="stat-card">
        <h3>Progression par Type</h3>
        <div class="type-progress">
          <div class="type">
            <span>Anime</span>
            <span>{{ animeProgress }}%</span>
          </div>
          <div class="type">
            <span>Énigme</span>
            <span>{{ enigmeProgress }}%</span>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: animeProgress + '%' }"></div>
          <div class="progress" :style="{ width: enigmeProgress + '%' }"></div>
        </div>
      </div>

      <!-- Progression par manga -->
      <div class="stat-card manga">
        <h3>Progression par Manga</h3>
        <ul>
          <li v-for="manga in mangaStats" :key="manga.name">
            <span class="manga-name">{{ manga.name }}</span>
            <span class="manga-progress">{{ manga.solved }}/{{ manga.total }} ({{ manga.progress }}%)</span>
            <div class="progress-bar">
              <div class="progress" :style="{ width: manga.progress + '%' }"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  width: 100%;
  max-width: 800px;
  margin: 2em auto;
  background: #23234a;
  border-radius: 1em;
  padding: 2em;
  color: #fff;
  box-shadow: 0 2px 12px #0003;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: space-between;
}

.stat-card {
  background: #363a61;
  border-radius: 1em;
  padding: 1.5em;
  flex: 1 1 250px;
  min-width: 220px;
  margin-bottom: 1em;
  box-shadow: 0 1px 6px #0002;
}

.progress-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
}

.progress {
  font-size: 2em;
  font-weight: bold;
  color: #7fff7f;
  text-align: center;
  background: linear-gradient(90deg, #7fff7f var(--progress, 0%), #363a61 var(--progress, 0%));
  border-radius: 50%;
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
}

.streak-value {
  font-size: 2em;
  color: #ffd700;
  text-align: center;
}

.type-progress {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.type {
  display: flex;
  align-items: center;
  gap: 1em;
}

.progress-bar {
  background: #23234a;
  border-radius: 0.5em;
  width: 100px;
  height: 1.2em;
  overflow: hidden;
  margin-left: 1em;
}

.progress-bar .progress {
  background: #7fff7f;
  height: 100%;
  color: #23234a;
  font-size: 1em;
  text-align: right;
  padding-right: 0.5em;
  border-radius: 0.5em 0 0 0.5em;
  transition: width 0.4s;
}

.manga {
  margin-top: 1em;
}

.manga-name {
  font-weight: bold;
  color: #ffd700;
}

.manga-progress {
  margin-left: 1em;
  color: #7fff7f;
}
</style>
