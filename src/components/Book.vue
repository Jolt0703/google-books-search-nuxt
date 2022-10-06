<template>
  <v-card height="270px" width="140px">
    <v-layout column justify-space-between align-content-space-between fill-height>
      <v-flex>
        <a :href="infoLink" target="_blank">
          <v-img class="book__thumbnail" :src="thumbnail" lazy-src="/thumbnail-placeholder.svg" height="180px">
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </a>
      </v-flex>
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
    if (!this.book.volumeInfo.imageLinks) return '/thumbnail-not-found.svg';
    return this.book.volumeInfo.imageLinks.thumbnail;
  }

  get infoLink() {
    return this.book.volumeInfo.infoLink;
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

.book__thumbnail {
  &:hover {
    cursor: pointer;
    box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 0 5px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
}
</style>
