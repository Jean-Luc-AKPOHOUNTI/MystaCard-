<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import Profile from './Profil.vue';
import Home from './Home.vue';

const router = useRouter();
const showInterface = ref(true);

onMounted(() => {
    setTimeout(() => {
        showInterface.value = false;
        // Redirection vers la nouvelle route
        router.push('/app/home');
    }, 3000);
});
</script>

<template>
    <Transition name="fade" mode="out-in">
        <div v-if="!showInterface" class="redirecting">
            Redirection...
        </div>
        <div v-else class="container">
            <div class="content">
                <div class="head">
                    <img class="point" src="../assets/point.svg">
                    <p>ALARM</p>
                </div>
                <div class="welcome">
                    <p>[WELCOME, <span class="player">Player</span>.]</p>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    width: 40%;
    background-color: #202020;
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    align-items: center;
    background-image: url('../assets/Intercace.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 1em;
    box-shadow: 0px 0px 15px #555d62;
    animation: opened 2s ease forwards, glowPulse 2s ease-in-out infinite;
}

@keyframes opened {
    from {
        height: 10%;
    }
    to {
        height: 55%;
    }
}

.point {
    width: 1.5em;
    height: 1.5em;
}

.head {
    margin-top: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 15px;
    width: 60%;
    padding: 1em;
    padding-top: 1em;
    font-size: 2em;
    color: #fff;
    font-weight: bold;
}

.head p {
    margin: 0;
    font-family: 'Arial', sans-serif;
}

.welcome {
    margin: 0;
    padding: 1em;
    width: 70%;
    font-size: 1.5em;
    text-align: center;
}

.welcome p {
    margin: 0;
    padding: 1em;
    color: #fff;
    letter-spacing: 5px;
}

p span {
    color: greenyellow;
    letter-spacing: 2px;
}

/* Animations de transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

/* Animation de scintillement pour le conteneur avant la transition */
@keyframes glowPulse {
    0% {
        box-shadow: 0px 0px 15px #555d62;
    }
    50% {
        box-shadow: 0px 0px 30px #555d62, 0px 0px 50px #555d62;
    }
    100% {
        box-shadow: 0px 0px 15px #555d62;
    }
}

.redirecting {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2em;
    color: #fff;
    background-color: #202020;
}
</style>