<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        Google Books Search
        <small>with Nuxt</small>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class Search extends Vue {}
</script>
