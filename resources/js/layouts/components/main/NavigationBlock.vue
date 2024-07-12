<script setup>
    import { useTheme } from 'vuetify'
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router';
    import routes from '../../../router/routes';
    import { useI18n } from 'vue-i18n';
    import { useThemeStore } from '../../../store/modules/theme';

    const { t } = useI18n();
    const theme = useTheme()
    const themeStore = useThemeStore()
    const route = useRoute()

    const selectedItem = ref(null)

    const items = ref([
      { 
        // text: 'Dashboard',   
        icon: 'mdi-view-dashboard', 
        to: 'home' 
      },
      { 
        // text: 'About',   
        icon: 'mdi-information',          
        to: 'about'   
      },
    ])

</script>

<template lang="">

  <div
    class="d-flex flex-column ma-3 mr-0 elevation-1 border rounded-lg bg-white"
    :class="themeStore.isDark ? 'bg-grey-darken-3' : 'bg-white'"
    style="height: calc(100vh - 160px);"
  >
    <v-list-subheader class="pl-5 py-2 rounded-lg text-uppercase">{{ t('text_pages.main_layout.menu') }}</v-list-subheader>
    <v-divider></v-divider>
    <v-list density="compact" style="overflow-y: auto; min-height: calc(100vh - 200px);">    
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        :to="{ name: item.to }"

        @click="selectedItem = item"
      >
        <template v-slot:prepend>
          <v-icon :icon="route.name === item.to ? item.icon : `${item.icon}-outline`"></v-icon>
        </template>

        <v-list-item-title >{{ t(`routes.${item.to}`) }}</v-list-item-title>
      </v-list-item> 
    </v-list>
    
  </div>

</template>

<style lang="">
    
</style>