<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { Icon } from '@iconify/vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-container">
        <RouterLink to="/app/home" class="logo">
          <Icon 
            icon="mdi:cards-playing-outline" 
            class="card-icon"
          />
          <span class="logo-text">
            <span class="mysta">Mysta</span>
            <span class="card">Card</span>
          </span>
        </RouterLink>
      </div>
      
      <nav class="navigation">
        <RouterLink to="/app/home" class="nav-item">
          <Icon icon="mdi:home" />
          <span>Accueil</span>
        </RouterLink>
        
        <div class="difficulty-menu">
          <button class="nav-item difficulty-btn">
            <Icon icon="mdi:cards" />
            <span>Quiz</span>
            <Icon icon="mdi:chevron-down" class="chevron" />
          </button>
          <div class="difficulty-dropdown">
            <RouterLink to="/app/facile" class="difficulty-item">
              <Icon icon="mdi:star-outline" />
              <span>Facile</span>
            </RouterLink>
            <RouterLink to="/app/moyen" class="difficulty-item">
              <Icon icon="mdi:star-outline" />
              <Icon icon="mdi:star-outline" />
              <span>Moyen</span>
            </RouterLink>
            <RouterLink to="/app/difficile" class="difficulty-item">
              <Icon icon="mdi:star-outline" />
              <Icon icon="mdi:star-outline" />
              <Icon icon="mdi:star-outline" />
              <span>Difficile</span>
            </RouterLink>
          </div>
        </div>

        <RouterLink to="/app/profil" class="nav-item">
          <Icon icon="mdi:trophy" />
          <span>Scores</span>
        </RouterLink>

        <button @click="handleLogout" class="nav-item logout-btn">
          <Icon icon="mdi:logout" />
          <span>Déconnexion</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #1E1E2F;
  height: 90px;
  /* position: fixed; */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
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
  font-family: 'OldeEnglish', sans-serif;
  font-size: 34px;
  display: flex;
  gap: 2px;
}

.mysta {
  color: #6C5CE7;
}

.card {
  color: #FF6B81;
}

.navigation {
  display: flex;
  gap: 24px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #FFFFFF;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.nav-item:hover {
  background-color: rgba(108, 92, 231, 0.1);
  color: #6C5CE7;
}

.nav-item :deep(svg) {
  width: 20px;
  height: 20px;
}

.difficulty-menu {
  position: relative;
}

.difficulty-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chevron {
  transition: transform 0.3s ease;
}

.difficulty-menu:hover .chevron {
  transform: rotate(180deg);
}

.difficulty-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #1E1E2F;
  border-radius: 8px;
  padding: 8px;
  min-width: 150px;
  display: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(108, 92, 231, 0.2);
}

.difficulty-menu:hover .difficulty-dropdown {
  display: block;
}

.difficulty-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.difficulty-item:hover {
  background-color: rgba(108, 92, 231, 0.1);
  color: #6C5CE7;
}

.logout-btn {
  margin-left: 8px;
  color: #FF6B81;
}

.logout-btn:hover {
  background-color: rgba(255, 107, 129, 0.1);
  color: #FF6B81;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
  }

  .logo-text {
    font-size: 20px;
  }

  .nav-item span {
    display: none;
  }

  .nav-item {
    padding: 8px;
  }

  .navigation {
    gap: 16px;
  }

  .difficulty-dropdown {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  .difficulty-item {
    padding: 12px 16px;
  }
}
</style>
