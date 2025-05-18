<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

const route = useRoute();
const showLayout = ref(true);

// Watcher pour s'assurer que le layout est correctement appliqué
watch(
  () => route.path,
  (newPath) => {
    // Réinitialiser le layout quand la route change
    showLayout.value = false;
    setTimeout(() => {
      showLayout.value = true;
    }, 0);
  },
  { immediate: true }
);
</script>

<template>
    <div v-if="showLayout" class="layout-container">
        <Header />
        <main class="main-content">
            <RouterView />
        </main>
        <Footer />
    </div>
    <RouterView v-else />
</template>

<style scoped>
.layout-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    position: relative;
}

.main-content {
    flex: 1;
    width: 100%;
    overflow-x: hidden;
    position: relative;
    z-index: 1;
}
</style>