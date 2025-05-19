<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header>
    <RouterLink to="/app/home" class="logo-ctn">
        <p class="logo">Carte</p>
    </RouterLink>
    <nav class="navBar">
        <p class="niveau-text">Niveau</p>
        <div class="btn">
            <RouterLink to="/app/facile" class="nav-button"><button>FACILE</button></RouterLink>
            <RouterLink to="/app/moyen" class="nav-button"><button>Moyen</button></RouterLink>
            <RouterLink to="/app/difficile" class="nav-button"><button>DIFFICILE</button></RouterLink>
            <RouterLink to="/app/profil" class="nav-button"><button>PROFIL</button></RouterLink>
        </div>
        <button @click="handleLogout" class="logout-btn">
            <img src="../assets/svg/Deconnexion.svg" alt="">
        </button>
    </nav>
  </header>
</template>

<style scoped>
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #191919ea;
        height: 15vh;
        width: 100%;
        color: aliceblue;
        position: sticky;
        top: 0;
        z-index: 1000;
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logo {
        font-family: 'OldeEnglish';
        font-size: 3em;
        font-style: italic;
        color: rgb(255, 255, 255);
        padding-inline: 1em;
        margin: 0;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .logo-ctn {
        text-decoration: none;
        transition: transform 0.3s ease;
    }

    .logo-ctn:hover {
        transform: scale(1.05);
    }

    .navBar {
        display: flex;
        align-items: center;
        flex-grow: 1;
        justify-content: flex-end;
        gap: 1em;
        margin-right: 1em;
    }

    .niveau-text {
        font-family: cursive;
        font-size: 1.5em;
        margin: 0;
        color: #29ff97;
        flex-shrink: 0;
    }

    .btn {
        display: flex;
        gap: 0.5em;
        text-align: center;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 1em;
        padding: 0.5em;
        background: rgba(255, 255, 255, 0.05);
        align-items: center;
        flex-shrink: 0;
        justify-content: center;
    }

    .nav-button {
        text-decoration: none;
        color: aliceblue;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn button {
        margin-inline: 0;
        padding: 0.4em 0.8em;
        border: none;
        background: none;
        color: aliceblue;
        font-size: 1em;
        font-family: cursive;
        font-weight: bold;
        transition: all 0.3s ease;
        border-radius: 0.5em;
        width: 100%;
        height: 100%;
    }

    .btn button:hover {
        background: rgba(41, 255, 151, 0.2);
        transform: translateY(-2px);
    }

    .logout-btn {
        margin-left: 0.5em;
        padding: 0.5em;
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 0.5em;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logout-btn img {
        width: 24px;
        height: 24px;
        filter: invert(1);
        transition: transform 0.3s ease;
    }

    .logout-btn:hover {
        background-color: rgba(255, 0, 0, 0.2);
        transform: translateY(-2px);
    }

    .logout-btn:hover img {
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        header {
            height: auto;
            padding: 1em;
            flex-direction: column;
            gap: 1em;
        }

        .navBar {
            width: 100%;
            margin-right: 0;
            flex-direction: column;
        }

        .btn {
            width: 100%;
            grid-template-columns: 1fr;
            gap: 0.5em;
        }

        .facile, .difficile {
            grid-column: 1;
            grid-row: auto;
            padding-top: 0;
        }

        .profil {
            grid-column: 1;
        }
    }
</style>
