import { createI18n } from 'vue-i18n'
import messages from '@/lang/index.js'

export const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    messages: messages
})