<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class extends Vue {}
</script>
