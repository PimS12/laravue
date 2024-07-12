<template>
<v-navigation-drawer 
  app 
  v-model="drawer" 
  style="border: 0px; background-color: transparent; box-shadow: none; min-width: 270px;"
  width="270"
>
  <UserBlock />
  <NavigationBlock />
  
</v-navigation-drawer>
</template>

<script setup>
    import { inject } from 'vue'
    import UserBlock from './UserBlock.vue';
    import NavigationBlock from './NavigationBlock.vue';

    const drawer = inject('drawer')
</script>

<style>
    
</style>