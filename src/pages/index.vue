<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <client-only>
        <swiper
          :options="swiperOption"
          :slides-per-view="3"
          :space-between="50"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide class="swiper-no-swiping">
            <v-card class="logo p-4 m-2 d-flex justify-center">
              <NuxtLogo />
            </v-card>
          </swiper-slide>
          <swiper-slide class="swiper-no-swiping">
            <v-card class="logo p-4 m-2 d-flex justify-center">
              <VuetifyLogo />
            </v-card>
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination"></div>
          <div slot="button-prev" class="swiper-button-prev"></div>
          <div slot="button-next" class="swiper-button-next"></div>
        </swiper>
      </client-only>
    </v-col>
  </v-row>
</template>

<script lang="ts">
// Import Swiper Vue.js components
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { QueryParams } from '@/types';

@Component
export default class IndexPage extends Vue {
  queryParams: QueryParams = {};

  swiperOption = {
    // 中略
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet(index: number, className: string) {
        return `<span class="${className}" data-index=${index}>` + (index + 1) + '</span>';
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    noSwiping: true,
  };

  @Watch('$route.query', { immediate: true })
  onChangeQueryParams(query: QueryParams) {
    this.queryParams = { ...query };
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }
}
</script>
