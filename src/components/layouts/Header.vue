<template>
  <v-app-bar color="nuxt" app>
    <v-toolbar-title class="header__link" @click="onClick">
      Google Books Search
      <small>with Nuxt</small>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class extends Vue {
  onClick() {
    this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
.header {
  &__link {
    color: $font-color;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
