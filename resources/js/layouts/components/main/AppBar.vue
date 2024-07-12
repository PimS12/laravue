<template lang="">
  <div
    class="d-flex flex-column ma-3 elevation-1 border rounded-lg bg-white"
    :class="theme.global.current.value.dark ? 'bg-grey-darken-3' : 'bg-white'"
  >
    <div class="pa-3 d-flex">
      <div class="d-flex align-center">
        <v-btn 
          @click="drawer = !drawer" 
          icon 
          variant="flat" 
          fab 
          class="mr-2"
          :color="theme.global.current.value.dark ? 'grey-darken-3' : 'white'"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <h2>Laravue</h2>
      </div>          

      <v-spacer />

      <div class="w-25">
        <v-text-field 
          variant="outlined"
          label="Search"
          hide-details
          density="comfortable"
          append-inner-icon="mdi-magnify"
          rounded="lg"
        />            
      </div>

    </div>
    
    <v-divider />

    <div class="pa-3 pl-6">
      <v-fade-transition>
        <span>{{ route.name }}</span>              
      </v-fade-transition>

    </div>
  </div>
</template>
<script setup>
  import { useTheme } from 'vuetify'
  import { ref, onMounted, inject, watch, provide } from 'vue'
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '../../../store/modules/auth';
  import routes from '../../../router/routes';

  const theme = useTheme()
  const route = useRoute()
  const authStore = useAuthStore()

  const drawer = ref(true)

  provide('drawer', drawer)

</script>
<style lang="">
    
</style>