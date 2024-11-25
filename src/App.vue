<script lang="ts">
import TheHome from './components/TheHome.vue'

export default {
  components: { TheHome },
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <TheHome />
      </v-container>
    </v-main>
  </v-app>
</template>
