<script setup>
import { useLangStore } from '../store/modules/lang';
import { ref, computed, defineProps, toRefs } from 'vue'
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const langStore = useLangStore()

const items = ref(langStore.locales)
console.log(items.value)

const setLocale = (lang) => {
  langStore.setLocale(lang)
}

const props = defineProps({
  color: {
    type: String,
    default: ''
  },
  variant : {
    type: String,
    default: 'text'
  },
  icon: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: String,
    default: 'lg'
  },
  listRounded: {
    type: String,
    default: 'lg'
  },
  listColor: {
    type: String,
    default: ''
  },
  shortName: {
    type: Boolean,
    default: false
  }
})

const { color, variant, icon, rounded, listRounded, listColor, shortName } = toRefs(props)

const currentLocale = computed(() => {
  let displayName = shortName.value ? t(`locales.${locale.value}`).substring(0, 3) : t(`locales.${locale.value}`)
  return displayName
})
</script>

<template lang="">
<v-btn
  :color="color"
  :variant="variant"
  :class="shortName ? '' : 'text-capitalize'"
  :rounded="icon ? 'xl' : rounded"
  :icon="icon"
  @click="setLocale(locale)"
>
  <v-icon v-if="icon">mdi-translate</v-icon>
  <div v-else>
    <span>
      {{ currentLocale }}
    </span>
  </div>

  <v-menu activator="parent">
    <v-list 
        density="compact"
        :color="listColor ? listColor : color"
        :rounded="listRounded"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="setLocale(i)"
        :active="locale === i"
      >
        <v-list-item-title>{{ t(`locales.${i}`) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</v-btn>
</template>

<style lang="">
    
</style>