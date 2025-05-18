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
        <p>Niveau</p>
        <div class="btn">
            <RouterLink to="/app/facile" class="facile"><button>FACILE</button></RouterLink>
            <RouterLink to="/app/moyen" class="moyen"><button>Moyen</button></RouterLink>
            <RouterLink to="/app/difficile" class="difficile"><button>DIFFICILE</button></RouterLink>
            <RouterLink to="/app/profil" class="profil"><button>PROFIL</button></RouterLink>
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
        width: 100vw;
        color: aliceblue;
        width: 100%;
    }
    .logo {
        font-family: 'OldeEnglish';
        font-size: 3em;
        font-style: italic;
        color: rgb(255, 255, 255);
        padding-inline: 1em;
        margin: 0;
        
    }
    .logo-ctn {
       text-decoration: none;
    }

    .navBar {
        display: flex;
        align-items: center;
        width: 40%;
        gap: 1em;
        margin-right: 2em;
    }
    .navBar p {
        font-family: cursive;
        font-size: 1.5em;
        margin: 0;
    }
    .btn {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1em;
        width: 100%;
        text-align: center;
        border-left: 1px solid aliceblue;
        border-right: 1px solid aliceblue;
        border-radius: 1em;
    }
    .btn button {
        margin-inline: 0.5em;
        padding: .2em;
        border: none;
        background: none;
        color: aliceblue;
        font-size: 1em;
        font-family: cursive;
        font-weight: bold;
    }
    button:hover {
        border-bottom: 1.5px solid aliceblue;
    }
    .profil {
        grid-column: 2;
    }
    .facile {
        /* background-color: #fff; */
        grid-column: 1;
        padding-top: 1.4em;
        grid-row: 1 / span 2;
    }
    .difficile {
        /* background-color: #fff; */
        padding-top: 1.4em;
        grid-column: 3;
        grid-row: 1 / span 2;
    }

    .logout-btn {
        margin-left: 1em;
        padding: 0.5em 1em;
        background-color: #ff4444;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .logout-btn:hover {
        background-color: #ff0000;
    }

</style>
