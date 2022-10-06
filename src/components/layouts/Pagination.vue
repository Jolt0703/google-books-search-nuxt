<template>
  <div v-show="totalItems" class="text-center">
    <v-pagination :value="page" :length="length" total-visible="8" color="nuxt" circle @input="onInput"></v-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { QueryBase } from '@/types';
import { generateRange } from '@/utils/pages';

@Component
export default class extends Vue {
  get page(): number {
    return this.$store.getters.currentPage;
  }

  get search(): string {
    return this.$store.getters.search;
  }

  get totalItems(): number {
    return this.$store.getters.totalItems;
  }

  get maxResults(): number {
    return this.$store.getters.maxResults;
  }

  get length() {
    const lastPage = Math.floor(this.totalItems / this.maxResults);
    const [, end] = generateRange(this.page, lastPage);
    return end;
  }

  onInput(page: string) {
    this.push({ search: this.search, page });
  }

  push<T extends QueryBase>(params: T) {
    this.$router.push({ path: '/', query: { ...params } });
  }
}
</script>
