<template>
  <!-- Navigation -->
  <v-navigation-drawer 
    app 
    v-model="drawer" 
    style="border: 0px; background-color: transparent; box-shadow: none; min-width: 270px;"
    width="270"
  >
    <UserBlock />
    <NavigationBlock />
    
  </v-navigation-drawer>
  
  <v-main>
    <!--App bar-->
    <div
      class="d-flex flex-column ma-3 elevation-1 border rounded-lg bg-white"
      :class="themeStore.isDark ? 'bg-grey-darken-3' : 'bg-white'"
    >
      <div class="pa-3 d-flex">
        <div class="d-flex align-center">
          <v-btn 
            @click="drawer = !drawer" 
            icon 
            variant="flat" 
            fab 
            class="mr-2"
            :color="themeStore.isDark ? 'grey-darken-3' : 'white'"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>

          <h2 v-if="!smAndDown">{{ appName }}</h2>
        </div>          

        <v-spacer />

        <div :class="smAndDown ? 'w-100' : 'w-25'">
          <v-text-field 
            variant="outlined"
            :label="t('fields.search')"
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
          <span>{{ t(`routes.${route.name}`) }}</span>              
        </v-fade-transition>
      </div>
    </div>

    <!--Content-->
    <div
      style="min-height: calc(100vh - 160px); max-height: calc(100vh - 160px); overflow-y: auto; "
      class="d-flex flex-column ma-3 rounded-lg"
    >
      <v-fade-transition>
        <router-view />          
      </v-fade-transition>  
    </div>      

  </v-main>
</template>
    
<script setup>
  import { ref, onMounted, provide, watch } from 'vue'
  import { useTheme, useDisplay } from 'vuetify'
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '../store/modules/auth';
  import { useThemeStore } from '../store/modules/theme';
  import NavigationDrawer from './components/main/NavigationDrawer.vue';
  import { useI18n } from 'vue-i18n';
  import UserBlock from './components/main/UserBlock.vue';
  import NavigationBlock from './components/main/NavigationBlock.vue';

  const route = useRoute()
  const authStore = useAuthStore()
  const themeStore = useThemeStore()
  const { t } = useI18n()
  const { smAndDown } = useDisplay()

  const drawer = ref(null)
  const selectedItem = ref(null)
  const appName = ref(window.config.appName)
  const items = ref([
    { 
      text: 'Dashboard',   
      icon: 'mdi-view-dashboard', 
      to: 'home' 
    },
    { 
      text: 'About',   
      icon: 'mdi-information',          
      to: 'about'   
    },
  ])

  const theme = useTheme()
</script>

<style>
* {
  scrollbar-color: #E0E0E0 #ffffff;
  scrollbar-width: thin;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(2em);
  opacity: 0;
}
</style>