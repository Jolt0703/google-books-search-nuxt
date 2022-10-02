<template>
  <v-form @submit.prevent="onSubmit">
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="11">
          <v-text-field v-model="searchKeyword" type="text" placeholder="キーワードで書籍を検索する…"></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn type="submit" depressed> 検索 </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { QueryBase, QueryParams } from '@/types';

@Component
export default class Search extends Vue {
  searchKeyword = '';

  onSubmit() {
    this.push<QueryParams>({ search: this.searchKeyword });
  }

  push<T extends QueryBase>(params: T) {
    this.$router.push({ path: '/', query: { ...params } });
  }
}
</script>
