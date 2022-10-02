<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <Search />
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        {{ queryParams.search }}
        <VuetifyLogo />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { QueryParams } from '@/types';

@Component
export default class IndexPage extends Vue {
  queryParams: QueryParams = {};

  @Watch('$route.query', { immediate: true })
  onChangeQueryParams(query: QueryParams) {
    this.queryParams = { ...query };
  }
}
</script>
