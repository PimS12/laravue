import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify'

export const useThemeStore = defineStore('theme', () => {
    // state
    const theme = useTheme()

    onMounted(() => {
        theme.global.name.value = Cookies.get('theme') || 'light'
    })

    // getters
    const currentTheme = computed(() => {
        return theme.global.current.value.dark ? 'dark' : 'light'
    })

    const isDark = computed(() => {
        return theme.global.current.value.dark
    })
    
    //actions
    const changeTheme = () => {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
        Cookies.set('theme', theme.global.name.value, { expires: 365 })
    }

    return { 
        theme,
        currentTheme,
        isDark,
        changeTheme
    }
})