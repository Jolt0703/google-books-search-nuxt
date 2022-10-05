<template>
  <v-app>
    <Header />
    <MainContents>
      <Nuxt />
    </MainContents>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class extends Vue {}
</script>
