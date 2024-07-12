<script setup>
    import { useTheme } from 'vuetify'
    import { useAuthStore } from '../../../store/modules/auth';
    import { useThemeStore } from '../../../store/modules/theme';
    import { ref, computed } from 'vue'
    import { useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const theme = useTheme()
    const themeStore = useThemeStore()
    const router = useRouter()
    const authStore = useAuthStore()

    const truncate = (str, n) => {
        return (str.length > n) ? str.slice(0, n - 1) + '...' : str
    }

    const initialsName = (str) => {
      const data = str.split(' ')

      return `${data[0]} ${data.length >= 2 ? `${data[1].charAt(0)}.` : ''} ${data.length >= 3 ? `${data[2].charAt(0)}.` : ''}`
    }

    const handle = () => {
      console.log('handle')
    }

    const logout = async () => {
      await authStore.logout()
      router.push({ name: 'login' })
    }
</script>

<template lang="">
  <div
    class="d-flex flex-column ma-3 mr-0 elevation-1 border rounded-lg bg-white"
    :class="themeStore.isDark ? 'bg-grey-darken-3' : 'bg-white'"
  > 
    <div class="d-flex align-center pa-3 pb-2 pt-1" v-if="authStore.user">
      <v-avatar size="60">
        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>

      <div class="d-flex flex-column ml-3 w-100">
        <span class="font-weight-bold">
          {{ truncate(initialsName(authStore.user.name), 20) }}
          <v-tooltip
            activator="parent"
            location="bottom"
          >
            {{ authStore.user.name }}
          </v-tooltip>
        </span>

        <span class="font-weight-light text-subtitle-2">
          {{ truncate(initialsName('Продюссер-консультант'), 13) }}
          <v-tooltip
            activator="parent"
            location="bottom"
          >
            {{ 'Продюссер-консультант' }}
          </v-tooltip>
        </span>
      </div>

      <v-spacer />

      <v-btn 
        icon 
        variant="flat" 
        size="small"
        fab 
        :color="themeStore.isDark ? 'grey-darken-3' : 'white'"
      >
        <v-badge
          color="error"
          dot
        >
          <v-icon size="24" icon="mdi-bell-outline"></v-icon>
        </v-badge>
      </v-btn>
    </div>

    <div
      class="pa-1"
      :class="themeStore.isDark ? 'bg-grey-darken-3' : 'bg-white'"
      v-else
    >
      <v-skeleton-loader 
        color="transparent"
        type="list-item-avatar-two-line" 
      ></v-skeleton-loader>
    </div>
    
    <v-divider />   
    
    <div class="pa-2 px-3 d-flex align-center" style="height: 48px!important;">
      <div class="d-flex align-center w-100 justify-space-between">
        <v-btn 
          @click="handle()" 
          variant="text"
          size="small"
          prepend-icon="mdi-account"
          rounded="lg"
        >
          {{ t('buttons.profile') }}
        </v-btn>
        
        <v-divider
          vertical
        />

        <v-btn 
          @click="logout()" 
          variant="text"
          size="small"
          prepend-icon="mdi-logout"
          rounded="lg"
        >
          {{ t('buttons.logout') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="">
    
</style>