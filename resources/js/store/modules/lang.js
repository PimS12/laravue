import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';

export const useLangStore = defineStore('lang', () => {
    
    // state
    const { locale } = useI18n()
    const locales = ref(window.config.locales)

    onMounted(() => {
        locale.value = Cookies.get('locale') || 'ru'
    })
    
    //actions
    const setLocale = (lang) => {
        locale.value = lang
        
        Cookies.set('locale', lang, { expires: 365 })
    }

    return { 
        locale,
        locales,
        setLocale
    }
})