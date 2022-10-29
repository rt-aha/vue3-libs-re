<template>
  <div class="re-swiper">
    <!-- <div class="re-swiper__content"> -->
    <Swiper
      :pagination="false"
      v-bind="formatSwiperConfig"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(d, index) of data" :key="index" :class="`extra-class__${extraClassName}`">
        <slot :data="d" :index="index" />
      </SwiperSlide>
    </Swiper>
    <slot name="extra" />
    <!-- </div> -->
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

const formatSwiperConfig = computed(() => {
  const defualtSetting = {
    loop: true,
    autoplay: {
      autoplay: true,
    },
  };

  return {
    ...defualtSetting,
    ...props.swiperConfig,
  };
});

const onSwiper = (swiper) => {
  emit('onSwiper', swiper);
};
const onSlideChange = (val) => {
  emit('onSlideChange', val);
};
</script>

<style lang="scss" scoped>
.re-swiper {
  position: relative;
  height: 100%;

  .swiper {
    height: 100%;
  }
}

.extra-class {
  position: relative;
}
</style>
