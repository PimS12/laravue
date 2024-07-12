<template>
  <v-app id="inspire" :class="themeStore.isDark ? 'bg-grey-darken-4' : 'bg-grey-lighten-4'">
    <!-- <v-progress-linear 
      model-value="100" 
      color="primary" 
      class="blink blinking"
      style="position: fixed; top: 0; left: 0; z-index: 9999;"
    >
    </v-progress-linear> -->

    <transition name="page" mode="out-in">
      <div>
        <component :is="layout" />

        <VSonner 
          position="bottom-right"
          :visible-toasts="9"
        />


        <v-fab 
          icon="mdi-theme-light-dark" 
          variant="tonal" 
          @click="toggleTheme" 
          absolute
          style="bottom: 16px; right: 16px;"
        ></v-fab>
      </div>
    </transition>
  </v-app>
</template>

<script setup>
import { defineAsyncComponent, onMounted, shallowRef, watch, ref } from 'vue';
import { useAuthStore } from './store/modules/auth';
import { useLangStore } from './store/modules/lang';
import { useThemeStore } from './store/modules/theme';
import { useRouter, useRoute } from 'vue-router';
import { useTheme } from 'vuetify';
import { VSonner, toast } from 'vuetify-sonner'
import { useI18n } from 'vue-i18n';
import Cookies from 'js-cookie'
import 'vuetify-sonner/style.css'

const { t, locale } = useI18n();
const theme = useTheme()
const router = useRouter()

const langStore = useLangStore()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const layoutName = ref('AuthLayout')
const layout = shallowRef(null)

const items = ref(
  langStore.locales
)

const setLocale = (lang) => {
  langStore.setLocale(lang)
}

watch(router.currentRoute, (newValue, oldValue) => {
  if (newValue.meta.auth && oldValue.meta.layout !== newValue.meta.layout) {
    layout.value = changeLayout(newValue.meta.layout)

  } else if (!newValue.meta.auth) {

    layout.value = changeLayout(newValue.meta.layout)
  }
});

const toggleTheme = () => {
  themeStore.changeTheme()
}
  

onMounted(() => {
  theme.global.name.value = Cookies.get('theme') || 'light'
});

function changeLayout(layout) {
  return defineAsyncComponent(() => import(`./layouts/${layout}.vue`));
}
</script>

<style>
@keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.blinking {
  animation: blink 1.3s linear infinite;
}
</style>