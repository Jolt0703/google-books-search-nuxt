<template>
  <v-card height="300px" width="220px">
    <v-layout column justify-space-between align-content-space-between fill-height>
      <v-flex><v-img :src="thumbnail" height="180px"></v-img></v-flex>
      <v-flex><v-card-title v-text="title"></v-card-title></v-flex>
      <v-flex><v-card-text v-text="author"></v-card-text></v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Book } from '~/types';

@Component
export default class extends Vue {
  @Prop({ type: Object, required: true }) book!: Book;

  get title() {
    const title = this.book.volumeInfo.title;
    return title.length > 18 ? `${title.slice(0, 18)}...` : title;
  }

  get author() {
    if (!this.book.volumeInfo.authors) return '';
    return this.book.volumeInfo.authors[0];
  }

  get thumbnail() {
    if (!this.book.volumeInfo.imageLinks) return '/thumbnail-placeholder.svg';
    return this.book.volumeInfo.imageLinks.thumbnail;
  }
}
</script>

<style lang="scss" scoped>
.v-card__title {
  font-size: $font-size-book-title;
  line-height: $font-size-root;
  padding: $card-text-padding;
}

.v-card__text {
  font-size: $font-size-book-author;
  line-height: $font-size-root;
  padding: $card-text-padding;
}
</style>
