import { createApp } from "vue"
import App from './App.vue'
import { vuetify } from '@/plugins/vuetify'
import { pinia } from '@/plugins/pinia'
import { i18n } from '@/plugins/i18n'
import Router from './router/router.js'
import VueApexCharts from "vue3-apexcharts";

import '@/plugins/axios'

const app = createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(i18n)
    .use(Router)
    .use(VueApexCharts)

app.mount('#app')

