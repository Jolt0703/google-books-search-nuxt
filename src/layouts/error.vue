<template>
  <v-app>
    <Header />
    <h3 class="error-message" color="error">{{ error.message }}</h3>
  </v-app>
</template>

<script lang="ts">
import { NuxtError } from '@nuxt/types';
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class ErrorLayout extends Vue {
  @Prop({ required: true })
  error!: NuxtError;

  pageNotFound = '404 Not Found';
  otherError = 'An error occurred';

  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  }
}
</script>

<style lang="scss" scoped>
.error-message {
  text-align: center;
  color: $font-color-error;
}
</style>
