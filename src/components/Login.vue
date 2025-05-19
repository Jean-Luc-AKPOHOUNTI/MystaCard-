<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import img1 from '../assets/loginMages/1.png';
import img2 from '../assets/loginMages/2.png';
import img3 from '../assets/loginMages/3.png';
import img4 from '../assets/loginMages/4.png';
import img5 from '../assets/loginMages/5.png';
import img6 from '../assets/loginMages/6.png';
import img7 from '../assets/loginMages/7.png';
import img8 from '../assets/loginMages/8.png';
import img9 from '../assets/loginMages/9.png';

let mages = ref([
  { name: '1', src: img1 },
  { name: '2', src: img2 },
  { name: '3', src: img3 },
  { name: '4', src: img4 },
  { name: '5', src: img5 },
  { name: '6', src: img6 },
  { name: '7', src: img7 },
  { name: '8', src: img8 },
  { name: '9', src: img9 },
]);
const currentIndex = ref(0);
let intervalId = null;

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');

// Computed properties pour l'état du formulaire
const isLoading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % mages.value.length;
};

onMounted(() => {
  intervalId = setInterval(nextImage, 3000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

const handleSubmit = async () => {
  if (!username.value || !password.value) {
    authStore.simulateError();
    return;
  }

  const success = await authStore.login({
    username: username.value,
    password: password.value
  });

  if (success) {
    router.push('/app/home');
  }
};
</script>
<template>
  <div class="container">
    <div class="content">
      <section class="left">
        <div class="carousel">
          <transition name="fade" mode="out-in">
            <img :key="currentIndex" :src="mages[currentIndex].src" :alt="mages[currentIndex].name"
              class="carousel-img">
          </transition>
        </div>
      </section>

      <section class="right">
        <h3>
          Sign In
        </h3>
        <form @submit.prevent="handleSubmit">
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <div class="user">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username"
              v-model="username"
              :disabled="isLoading"
              required
            >
          </div>

          <div class="pass">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password"
              v-model="password"
              :disabled="isLoading"
              required
            >
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="submit-button"
          >
            <span v-if="isLoading">Connexion...</span>
            <span v-else>Sign In</span>
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.router-link {
  text-decoration: none;
  color: #ffffff;
  width: 100%;
  text-align: center;
}

.carousel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.carousel-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: opacity 2s ease-in;
}

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

.left {
  overflow: hidden;
}

.container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9e9e9cc;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70%;
  width: 60%;
  border-radius: 1em;
  box-shadow: 1px 1px 5px;
  background: linear-gradient(-99deg, #070e52be, #ffffff00, #ffffff);
  position: relative;
}

.right,
.left {
  width: 50%;
  height: 100%;
}

.left {
  background-color: rgba(117, 120, 171, 0.986);
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  border-top-right-radius: 6em;
  border-bottom-right-radius: 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 0px 5px cornsilk;
  z-index: 1;
  animation: slide 2s linear normal;
}

@keyframes slide {
  from {
    transform: translateX(470px);
  }

  to {
    transform: translateX(0px);
  }
}

.left img {
  height: 90%;
}

.right {
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #d4d4d4;
  position: absolute;
  right: 0;
  height: 100%;
}

.right h3 {
  font-size: 2.5em;
  font-weight: bolder;

}

form {
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user,
.pass {
  display: flex;
  flex-direction: column;
  height: 30%;
  width: 100%;
  margin-bottom: 1.5em;
}

label {
  margin-left: 0.4em;
  margin-bottom: 0.5em;
  color: #212121;
  font-size: 1.35em;
}

input {
  padding-inline: 1em;
  padding-block: .2em;
  outline: none;
  border: none;
  height: 2.3em;
  border-radius: .5em;
  font-size: 1.5em;
}

button {
  padding: 1em;
  width: 35%;
  color: aliceblue;
  border: none;
  background-color: #4e76f8b6;
  border-radius: 1em;
}

button:hover {
  background-color: #7b98f8c4;
}

.error-message {
  color: #ff4444;
  background-color: rgba(255, 68, 68, 0.1);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: center;
}

.submit-button {
  position: relative;
  min-width: 120px;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>