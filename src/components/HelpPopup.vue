<template>
  <div v-if="isVisible" class="help-popup-overlay" @click="closePopup">
    <div class="help-popup" @click.stop>
      <div class="help-popup-header">
        <h2>Comment naviguer sur MystaCard</h2>
        <button class="close-button" @click="closePopup">
          <Icon icon="mdi:close" />
        </button>
      </div>
      
      <div class="help-popup-content">
        <div class="help-section">
          <h3><Icon icon="mdi:home" /> Page d'accueil</h3>
          <p>Découvrez les différentes fonctionnalités de MystaCard et commencez votre aventure !</p>
        </div>

        <div class="help-section">
          <h3><Icon icon="mdi:cards" /> Quiz</h3>
          <p>Choisissez votre niveau de difficulté :</p>
          <ul>
            <li><strong>Facile</strong> : Parfait pour débuter</li>
            <li><strong>Moyen</strong> : Pour les joueurs expérimentés</li>
            <li><strong>Difficile</strong> : Un défi pour les experts</li>
          </ul>
        </div>

        <div class="help-section">
          <h3><Icon icon="mdi:trophy" /> Scores</h3>
          <p>Consultez vos meilleurs scores et comparez-vous aux autres joueurs !</p>
        </div>

        <div class="help-section">
          <h3><Icon icon="mdi:volume-high" /> Sons</h3>
          <p>Activez ou désactivez les effets sonores selon vos préférences.</p>
        </div>
      </div>

      <div class="help-popup-footer">
        <button class="nav-item" @click="closePopup">Compris !</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const isVisible = ref(true)

const closePopup = () => {
  isVisible.value = false
  localStorage.setItem('helpPopupShown', 'true')
}
</script>

<style scoped>
.help-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.help-popup {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 15px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(108, 92, 231, 0.3);
  border: 1px solid #6C5CE7;
}

.help-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #6C5CE7;
}

.help-popup-header h2 {
  color: #6C5CE7;
  font-family: 'Orbitron', sans-serif;
  margin: 0;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  color: #6C5CE7;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.3s ease;
}

.close-button:hover {
  transform: scale(1.1);
}

.help-popup-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.help-section {
  background: rgba(108, 92, 231, 0.1);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(108, 92, 231, 0.2);
}

.help-section h3 {
  color: #6C5CE7;
  font-family: 'Orbitron', sans-serif;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.help-section p {
  color: #fff;
  margin: 0.5rem 0;
  line-height: 1.5;
}

.help-section ul {
  color: #fff;
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.help-section li {
  margin: 0.5rem 0;
}

.help-popup-footer {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.nav-item {
  background: linear-gradient(135deg, #6C5CE7 0%, #FF6B81 100%);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nav-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(108, 92, 231, 0.4);
}

@media (max-width: 768px) {
  .help-popup {
    width: 95%;
    padding: 1.5rem;
  }

  .help-popup-header h2 {
    font-size: 1.2rem;
  }
}
</style> 