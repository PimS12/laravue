<template lang="">
<!-- <MainLayout> -->
  <div>
    <h1>AboutPage</h1>
    <p>{{ authStore.check}}</p>

  </div>
<!-- </MainLayout> -->
</template>
<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import { useTheme } from 'vuetify'
import { useAuthStore } from '../store/modules/auth';

const authStore = useAuthStore()
const theme = useTheme()

</script>

<style lang="">
    
</style>