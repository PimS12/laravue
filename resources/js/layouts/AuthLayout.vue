<template>
  <v-sheet 
    style="height: 100vh; border: 0px; background-color: transparent; box-shadow: none;"  
    class="d-flex flex-column align-center justify-center"
  >
    <router-view />
  </v-sheet>
</template>
  
<script setup>
  import { useRouter } from 'vue-router';
</script>
  
<style>
  
</style>