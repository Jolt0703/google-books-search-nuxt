<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="book in books" :key="book.id" cols="2">
        <Book :book="book" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Book } from '@/types';

@Component
export default class extends Vue {
  get books(): Book[] {
    return this.$store.getters.books;
  }
}
</script>
