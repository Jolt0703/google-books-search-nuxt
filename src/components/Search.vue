<template>
  <v-form @submit.prevent="onSubmit">
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="11">
          <v-text-field
            v-model="search"
            type="text"
            placeholder="キーワードで書籍を検索する…"
            color="teal"
          ></v-text-field>
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
import { QueryBase } from '@/types';

@Component
export default class extends Vue {
  search = '';

  onSubmit() {
    this.push({ search: this.search });
  }

  push<T extends QueryBase>(params: T) {
    this.$router.push({ path: '/', query: { ...params } });
  }
}
</script>
