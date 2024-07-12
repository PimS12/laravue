<template lang="">
  <div>
    <v-card
      v-for="n in 1"
      :color="theme.global.current.value.dark ? 'grey-darken-3' : 'white'"
      variant="elevated"
      border
      rounded="lg"
    >
      <v-card-item>
        <div>
          <div class="text-overline mb-1">
            Dashboard
          </div>
          <div class="text-h6 mb-1">
            <!-- Welcome Back ! -->
            {{ $t('message') }}
          </div>
          <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

</script>

<style lang="">
    
</style>