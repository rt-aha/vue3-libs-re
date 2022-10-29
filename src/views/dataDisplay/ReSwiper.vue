<template>
  <div class="v-swiper">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReSwiper
          :data="imgList"
          :swiper-config="{}"
          extra-class-name="basic"
          @onSlideChange="onSlideChange"
        >
          <template #default="slotData">
            <div
              class="img-box"
              :style="{
                'background-image': `url('${slotData.data.imgSrc}')`,
              }"
            />
          </template>
        </ReSwiper>
      </div>
    </dev-section>

    <dev-section
      title="點擊圓點切換，需要定位的圓點放進 slot:extra "
    >
      <div class="wrap">
        <ReSwiper
          :data="imgList"
          :swiper-config="{}"
          extra-class-name="dot"
          @onSlideChange="onSlideChange"
          @onSwiper="onDotSwiper"
        >
          <template #default="slotData">
            <div
              class="img-box"
              :style="{
                'background-image': `url('${slotData.data.imgSrc}')`,
              }"
            />
          </template>

          <template #extra>
            <div class="dot-list-wrap">
              <ul class="dot-list">
                <li v-for="item of imgList.length" :key="item" class="dot-list__item">
                  <div
                    class="dot-list__item__circle"
                    :class="{
                      'dot-list__item__circle--active': activeIndex === item - 1,
                    }"

                    @click="onClickDot(item - 1)"
                  />
                </li>
              </ul>
            </div>
          </template>
        </ReSwiper>
      </div>
    </dev-section>

    <dev-section
      title="左右切換，需要定位的左右放進 slot:extra"
    >
      <div class="wrap">
        <ReSwiper
          :data="imgList"
          :swiper-config="swiperPrevNextConfig"
          extra-class-name="prev-next"
          @onSlideChange="onSlideChange"
        >
          <template #default="slotData">
            <div
              class="img-box"
              :style="{
                'background-image': `url('${slotData.data.imgSrc}')`,
              }"
            />
          </template>

          <template #extra>
            <div class="arrow arrow--prev">
              <component :is="IconLeft" />
            </div>

            <div class="arrow arrow--next">
              <component :is="IconRight" />
            </div>
          </template>
        </ReSwiper>
      </div>
    </dev-section>

    <dev-section
      title="多個斷點不同的設定"
    >
      <div class="wrap">
        <ReSwiper
          :data="imgList"
          :swiper-config="swiperMultiBreakpointConfig"
          extra-class-name="multiBreakpoint"
          @onSlideChange="onSlideChange"
        >
          <template #default="slotData">
            <div
              class="img-box"
              :style="{
                'background-image': `url('${slotData.data.imgSrc}')`,
              }"
            />
          </template>
        </ReSwiper>
      </div>
    </dev-section>

    <dev-section
      title="中間顯示，左右只顯示一半"
    >
      <div class="wrap">
        <ReSwiper
          :data="imgList"
          :swiper-config="swiperCenterConfig"
          extra-class-name="center"
          @onSlideChange="onSlideChange"
        >
          <template #default="slotData">
            <div
              class="img-box img-box--center"
              :style="{
                'background-image': `url('${slotData.data.imgSrc}')`,
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
import IconLeft from '~icons/carbon/chevron-left';
import IconRight from '~icons/carbon/chevron-right';

import { useSiteStore } from '@/stores/site';

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

// hooks
const siteStore = useSiteStore();

const swiperPrevNextConfig = computed(() => {
  const navigation = {
    prevEl: '.arrow--prev',
    nextEl: '.arrow--next',
  };

  const inAllConfig = {
    spaceBetween: 10,
    navigation,
  };

  return {
    slidesPerView: 1,
    ...inAllConfig,
  };
});

const swiperMultiBreakpointConfig = computed(() => {
  const inAllConfig = {
    spaceBetween: 10,
  };

  if (siteStore.deviceType.includes('tablet')) {
    return {
      slidesPerView: 3,
      ...inAllConfig,
    };
  }

  if (siteStore.deviceType.includes('portrait')) {
    return {
      slidesPerView: 2,
      ...inAllConfig,
    };
  }

  return {
    slidesPerView: 1,
    ...inAllConfig,
  };
});

const swiperCenterConfig = computed(() => {
  const inAllConfig = {
    spaceBetween: 20,
    centeredSlides: true,
    initialSlide: 2,
  };

  return {
    slidesPerView: 1.5,
    ...inAllConfig,
  };
});

const dotSwiper = ref();
const activeIndex = ref(0);

const onClickDot = (val) => {
  console.log('val', val);
  dotSwiper.value.slideTo(val);
  activeIndex.value = val;
};

const onDotSwiper = (sw) => {
  dotSwiper.value = sw;
  dotSwiper.value.slideTo(0);
};

const onSlideChange = () => {

};
</script>

<style lang="scss" scoped>
.v-swiper {
  width: 100%;
}

.img-box {
  @include normalBg();
  width: 100%;
  height: 500px;
  transition: 0.4s;

  &--center {
    height: auto;
    padding-top: 100%;
    transform: scale(0.9);

    &:hover {
      transform: scale(1);
    }
  }
}

.wrap {
  // position: relative;
}

.dot-list-wrap {
  @include position(bl, -20px, 50%);
  z-index: 10;
  width: 20px;
  height: auto;
  transform: translateX(-50%);
}

.dot-list {
  @include flex();

  &__item {
    & + & {
      margin-left: 10px;
    }

    &__circle {
      @include circle(8px);
      box-sizing: border-box;
      cursor: pointer;
      border: 1px solid rgba($c-deepblue, 0.5);

      &--active {
        background-color: $c-deepblue;
      }
    }
  }
}

.arrow {
  z-index: 10;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: rgba($c-white, 0.3);
  transform: translateY(-50%);

  &--prev {
    @include position(tl, 50%, 0);
  }

  &--next {
    @include position(tr, 50%, 0);
  }

  svg {
    @include position(center);
    // width: 30px;
    font-size: 24px;
  }
}
</style>
