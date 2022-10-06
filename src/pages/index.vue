<template>
  <Container>
    <Search />
    <Books />
    <Pagination />
  </Container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Route } from 'vue-router';
import { Book, QueryBase, QueryParams } from '@/types';

Component.registerHooks(['beforeRouteUpdate', 'beforeRouteEnter']);

@Component
export default class IndexPage extends Vue {
  async beforeRouteUpdate(to: Route, _from: Route, next: Function) {
    await this.fetchData(to.query);
    next();
  }

  beforeRouteEnter(to: Route, _from: Route, next: Function) {
    next(async (component: IndexPage) => {
      await component.fetchData(to.query);
    });
  }

  async fetchData(query: QueryBase) {
    if (!query || !query.search) {
      this.$store.dispatch('initializeState');
      return;
    }
    const queryParams: QueryParams = {};
    if (typeof query.search === 'string') {
      queryParams.search = query.search;
    }
    if (query.page && typeof query.page === 'string') {
      queryParams.page = Number.parseInt(query.page);
    }
    if (query.maxResults && typeof query.maxResults === 'string') {
      queryParams.maxResults = Number.parseInt(query.maxResults);
    }
    try {
      await this.$store.dispatch('fetchBooksData', queryParams);
    } catch (e: any) {
      console.error(e);
      this.$nuxt.error({ statusCode: 500, message: '書籍情報が取得できませんでした。' });
    }
  }

  get books(): Book[] {
    return this.$store.getters.books;
  }
}
</script>
