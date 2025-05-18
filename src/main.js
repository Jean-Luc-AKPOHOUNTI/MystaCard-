import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router';
import App from './App.vue';
import './assets/fonts.css';

// Ajout des styles globaux
import './assets/main.css';  // Créez ce fichier si nécessaire

const app = createApp(App);
const pinia = createPinia();

// Ajout d'un style global pour le body
app.mixin({
  mounted() {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.minHeight = '100vh';
    document.body.style.width = '100%';
  }
});

app.use(pinia);
app.use(router);
app.mount('#app');