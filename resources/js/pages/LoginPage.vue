<script setup>
  import { useTheme } from 'vuetify'
  import { useRouter } from 'vue-router';
  import { ref } from 'vue'
  import { useAuthStore } from '../store/modules/auth';
  import { useThemeStore } from '../store/modules/theme';
  import Cookies from 'js-cookie'
  import Form from 'vform'
  import { toast } from 'vuetify-sonner'
  import { useI18n } from 'vue-i18n';
  import LocaleDropdown from '../components/LocaleDropdown.vue';

  const { t } = useI18n();
  const theme = useTheme()
  const router = useRouter()
  const authStore = useAuthStore()
  const themeStore = useThemeStore()

  const form = ref(new Form({
    email: '',
    password: ''
  }))
  const remember = ref(false)
  const appName = ref(window.config.appName)
  const showPassword = ref(false)

  const redirect = () => {
    const intendedUrl = Cookies.get('intended_url')

    if (intendedUrl) {
      Cookies.remove('intended_url')
      router.push({ path: intendedUrl })
    } else {
      router.push({ name: 'home' })
    }
  }
  const login = async () => {
    await form.value.post('api/login').then(({data}) => {

      authStore.login({
        token: data.access_token,
        remember: remember.value
      })

      toast.success(t('alerts.login.success'), { 
        duration: 2000,  
        prependIcon: 'mdi-check-circle-outline',
      })

      redirect()
    }).catch(error => {
      toast.error(t('alerts.login.error'), { 
        duration: 2000,  
        prependIcon: 'mdi-alert-circle-outline',
      })
    })
  }
</script>

<template>
  <div class="pa-3 w-100 d-flex align-center flex-column">
    <div class="w-100 d-flex align-center justify-center" style="max-width: 500px">
      <h1 class="">{{ appName }}</h1>
    </div>

    <v-card
      class="d-flex flex-column ma-3 elevation-1 border rounded-lg w-100"
      :class="theme.global.current.value.dark ? 'bg-grey-darken-3' : 'bg-white'"
      max-width="500"
      @keyup.enter="login()"
    >
      <v-card-title class="d-flex justify-space-between align-center">
        {{ t('text_pages.login.title') }}
        
        <locale-dropdown
          icon
        />
      </v-card-title>

      <v-divider/>

      <v-card-text class="pa-3">
        <v-text-field 
          v-model="form.email"
          variant="outlined"
          :label="t('fields.login')"
          density="comfortable"
          rounded="lg"
          class="pb-2"
          :error-messages="form.errors.get('email')"
          @input="form.errors.clear('email')"
        />  

        <v-text-field 
          v-model="form.password"

          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append-inner="showPassword = !showPassword"
          variant="outlined"
          :label="t('fields.password')"
          density="comfortable"
          rounded="lg"
          type="password"
          :error-messages="form.errors.get('password')"
          @input="form.errors.clear('password')"
        />

        <v-checkbox
          v-model="remember"
          :label="t('text_pages.login.remember_me')"
          hide-details
          rounded="lg"
        />
      </v-card-text>

      <v-divider/>

      <v-card-actions class="d-flex flex-column">
        <v-spacer />
        <v-btn
          @click="login()"
          variant="flat"
          rounded="lg"
          class="w-25"
          :loading="form.busy"
        >
          {{ t('buttons.login') }}
        </v-btn>
        <v-spacer />
      </v-card-actions>
      
    </v-card>      
  </div>
</template>

<style lang="">
    
</style>