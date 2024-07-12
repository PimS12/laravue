import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import { ru } from 'vuetify/locale'

export const vuetify = createVuetify({
  components,
  directives,

  locale: {
    locale: 'ru',
    fallback: 'en',
    messages: { ru }
  },
  theme: {
    defaultTheme: 'light',
    // defaultTheme: 'dark',
  }

//   defaults: {
//     VBtn: {
//       rounded: 'lg'
//     },
//     VCard: {
//       rounded: 'lg'
//     },
//     VCardItem: {
//       style: 'padding: 12px'
//     },
//     VCardText: {
//       style: 'maring: 0px; padding: 12px'
//     },
//     VCardActions: {
//       style: 'justify-content: flex-start; margin: 0px; padding: 12px'
//     },
//     VTextField: {
//       density: 'compact',
//       variant: 'outlined',
//       color: 'primary',
//       rounded: 'lg'
//     },
//     VTextarea: {
//       density: 'compact',
//       variant: 'outlined',
//       color: 'primary',
//       rows: 3
//     },
//     VAutocomplete: {
//       density: 'compact',
//       variant: 'outlined',
//       color: 'primary'
//     },
//     VTooltip: {
//       location: 'top'
//     },
//     VCol: {
//       style: 'padding: 12px; padding-bottom: 0px;'
//     }
//   }
})
