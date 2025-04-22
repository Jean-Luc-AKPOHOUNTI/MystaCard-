<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header>
    <RouterLink to="/" class="logo-ctn">
        <p class="logo">Carte</p>
    </RouterLink>
    <nav class="navBar">
        <p>Niveau</p>
        <div class="btn">
            <RouterLink to="/facile" class="facile"><button>FACILE</button></RouterLink>
            <RouterLink to="/moyen" class="moyen"><button>Moyen</button></RouterLink>
            <RouterLink to="/difficile" class="difficile"><button>DIFFICILE</button></RouterLink>
            <RouterLink to="/profil" class="profil"><button>PROFIL</button></RouterLink>
        </div>
    </nav>
  </header>
</template>

<style scoped>

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #00001A;
        height: 15vh;
        width: 100vw;
        box-shadow: 0px 5px 5px rgba(67, 187, 196, 0.637);
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
        width: 30%;
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

</style>
