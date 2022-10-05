<template>
  <div class="v-swiper">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReSwiper
          :data="imgList"
          :swiper-config="swiperConfig"
          extra-class-name="history"
          @onSlideChange="onSlideChange"
        >
          <template #default="slotData">
            <div
              class="img-box"
              :style="{
                'background-image': `url('${slotData.data.d.imgSrc}')`,
              }"
            />
          </template>
        </ReSwiper>
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReSwiper from '@/components/dataDisplay/ReSwiper.vue';

import tokyo1 from '@/assets/image/tokyo1.jpeg';
import tokyo2 from '@/assets/image/tokyo2.jpeg';
import tokyo3 from '@/assets/image/tokyo3.jpeg';
import tokyo4 from '@/assets/image/tokyo4.jpeg';
import tokyo5 from '@/assets/image/tokyo5.jpeg';

const imgList = [
  {
    imgSrc: tokyo1,
  },
  {
    imgSrc: tokyo2,
  },
  {
    imgSrc: tokyo3,
  },
  {
    imgSrc: tokyo4,
  },
  {
    imgSrc: tokyo5,
  },

];

const swiperConfig = {};

const onSlideChange = (val) => {};
</script>

<style lang="scss" scoped>
.v-swiper {
  width: 100%;
}

.img-box {
  width: 100%;
  height: 500px;
  @include normalBg();
}
</style>
