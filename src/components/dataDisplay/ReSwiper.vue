<template>
  <div class="c-swiper">
    <Swiper
      :slides-per-view="swiperConfig.slidesPerView"
      :space-between="swiperConfig.gap"
      :initial-slide="swiperConfig.initialSlide || 0"
      :centered-slides="swiperConfig.centeredSlides || false"
      loop
      :autoplay="{ autoplay: true }"
      :pagination="false"
      :navigation="{ prevEl: `.${swiperConfig.prevEl}`, nextEl: `.${swiperConfig.nextEl}` }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(d, idx) of data" :key="idx" :class="`extra-class__${extraClassName}`">
        <slot :data="{ d, idx }" />
      </SwiperSlide>
    </Swiper>
    <slot name="prevNext" />
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  swiperConfig: {
    type: Object,
    default: () => ({
      slidesPerView: 3,
    }),
  },
  extraClassName: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['onSwiper', 'onSlideChange']);

SwiperCore.use([Pagination, Autoplay, Navigation]);
const onSwiper = (swiper) => {
  emit('onSwiper', swiper);
};
const onSlideChange = (val) => {
  emit('onSlideChange', val);
};
</script>

<style lang="scss" scoped>
.c-swiper {
  position: relative;
}

.extra-class {
  position: relative;
  // &__history {
  //   position: relative;

  //   &::after {
  //     content: '';
  //     width: 1px;
  //     height: 100%;
  //     background-color: $c-grey5;
  //     @include position(tl, 0, -1px);
  //   }
  // }
}
</style>
