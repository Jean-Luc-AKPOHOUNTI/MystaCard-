<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <div class="logo-container">
          <div class="logo">
            <Icon 
              icon="mdi:cards-playing-outline" 
              class="card-icon"
            />
            <span class="logo-text">
              <span class="mysta">Mysta</span>
              <span class="card">Card</span>
            </span>
          </div>
        </div>
        <p class="subtitle">Retourne la carte, révèle le mystère</p>
        <p class="description">
          Testez vos connaissances en manga à travers des quiz interactifs et des cartes mystères.
        </p>
        <div class="cta-buttons">
          <RouterLink to="/app/facile" class="nav-item primary">
            <Icon icon="mdi:play" />
            <span>Commencer</span>
          </RouterLink>
          <RouterLink to="/app/profil" class="nav-item secondary">
            <Icon icon="mdi:trophy" />
            <span>Voir les scores</span>
          </RouterLink>
        </div>
      </div>
      <div class="hero-image">
        <div class="floating-cards">
          <div class="card card-1">
            <Icon icon="mdi:cards-playing-outline" />
          </div>
          <div class="card card-2">
            <Icon icon="mdi:cards-playing-outline" />
          </div>
          <div class="card card-3">
            <Icon icon="mdi:cards-playing-outline" />
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <h2 class="section-title">Comment ça marche ?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <Icon icon="mdi:cards-playing-outline" class="feature-icon" />
          <h3>Choisis ton niveau</h3>
          <p>Facile, moyen ou difficile, à toi de choisir selon tes connaissances.</p>
        </div>
        <div class="feature-card">
          <Icon icon="mdi:flip-horizontal" class="feature-icon" />
          <h3>Retourne les cartes</h3>
          <p>Découvre les questions en retournant les cartes mystères.</p>
        </div>
        <div class="feature-card">
          <Icon icon="mdi:trophy" class="feature-icon" />
          <h3>Gagne des points</h3>
          <p>Marque des points et grimpe dans le classement.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #1E1E2F 0%, #2D2D44 100%);
  color: #FFFFFF;
  padding: 24px;
}

.hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  display: flex;
  align-items: center;
  gap: 48px;
}

.hero-content {
  flex: 1;
}

.logo-container {
  margin-bottom: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: translateY(-2px);
}

.card-icon {
  color: #6C5CE7;
  width: 32px;
  height: 32px;
  transition: transform 0.3s ease;
}

.logo:hover .card-icon {
  transform: rotate(-15deg);
}

.logo-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  display: flex;
  gap: 2px;
}

.mysta {
  color: #6C5CE7;
}

.card {
  color: #FF6B81;
}

.subtitle {
  font-size: 24px;
  color: #74B9FF;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 16px;
}

.description {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: #FFFFFF;
  opacity: 0.8;
  margin-bottom: 32px;
  max-width: 600px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #FFFFFF;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-item.primary {
  background-color: #6C5CE7;
}

.nav-item.primary:hover {
  background-color: rgba(108, 92, 231, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
}

.nav-item.secondary {
  background-color: rgba(108, 92, 231, 0.1);
  color: #6C5CE7;
  border: 1px solid #6C5CE7;
}

.nav-item.secondary:hover {
  background-color: rgba(108, 92, 231, 0.2);
  transform: translateY(-2px);
}

.hero-image {
  flex: 1;
  position: relative;
  height: 400px;
}

.floating-cards {
  position: relative;
  width: 100%;
  height: 100%;
}

.card {
  position: absolute;
  background: rgba(108, 92, 231, 0.1);
  border: 2px solid #6C5CE7;
  border-radius: 16px;
  width: 120px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6C5CE7;
  font-size: 48px;
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.card-2 {
  top: 40%;
  left: 50%;
  animation-delay: -2s;
}

.card-3 {
  top: 60%;
  left: 30%;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.features {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}

.section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 32px;
  text-align: center;
  margin-bottom: 48px;
  color: #FFFFFF;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  background: rgba(108, 92, 231, 0.1);
  border: 1px solid rgba(108, 92, 231, 0.2);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(108, 92, 231, 0.2);
}

.feature-icon {
  font-size: 48px;
  color: #6C5CE7;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  margin-bottom: 12px;
  color: #FFFFFF;
}

.feature-card p {
  font-family: 'Roboto', sans-serif;
  color: #FFFFFF;
  opacity: 0.8;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }

  .logo-text {
    font-size: 20px;
  }

  .subtitle {
    font-size: 20px;
  }

  .description {
    margin: 0 auto 32px;
  }

  .cta-buttons {
    justify-content: center;
  }

  .hero-image {
    height: 300px;
  }

  .features {
    padding: 24px;
  }

  .section-title {
    font-size: 28px;
  }
}
</style> 