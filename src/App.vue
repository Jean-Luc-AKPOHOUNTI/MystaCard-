<script setup>
  import Header from './components/Header.vue';
  
</script>


<template>
  <div class="container">
    
    <RouterView />
    
  </div>
</template>

<style scoped> 
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  
</style>
