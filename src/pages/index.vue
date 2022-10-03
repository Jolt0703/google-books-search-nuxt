<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <Search />
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        {{ books }}
        <VuetifyLogo />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import { NavigationGuard } from 'vue-router';
import { QueryBase, QueryParams } from '@/types';

Component.registerHooks(['beforeRouteUpdate', 'beforeRouteEnter']);

@Component
export default class IndexPage extends Vue {
  beforeRouteUpdate: NavigationGuard = async (to, _from, next) => {
    console.log('beforeRouteUpdate');
    await this.fetchData(to.query);
    next();
  };

  beforeRouteEnter: NavigationGuard = async (to, _from, next) => {
    console.log('beforeRouteEnter');
    await this.fetchData(to.query);
    next();
  };

  @Watch('$route.query', { immediate: true })
  watchRouteQuery = async (query: QueryBase) => {
    console.log('watchRouteQuery');
    await this.fetchData(query);
  };

  async asyncData({ query, store }: Context) {
    console.log('asyncdata呼ばれたよ!', query);

    if (!query || !query.search) return;
    const queryParams: QueryParams = {};
    if (query.search && typeof query.search === 'string') {
      queryParams.search = query.search;
    }
    if (query.page && typeof query.page === 'string') {
      queryParams.page = Number.parseInt(query.page);
    }
    if (query.maxResults && typeof query.maxResults === 'string') {
      queryParams.maxResults = Number.parseInt(query.maxResults);
    }
    await store.dispatch('fetchBooksData', queryParams);
  }

  async fetchData(query: QueryBase) {
    if (!query || !query.search) return;
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
    await this.$store.dispatch('fetchBooksData', queryParams);
  }

  get books() {
    return this.$store.getters.books;
  }
}
</script>
