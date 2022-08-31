<template>
  <div class="c-image" :style="imgContainerStyle">
    <div
      class="c-image__bg"
      :style="{
        'background-image': `url('${imgSrc}')`,
        ...bgStyle,
      }"
      v-if="bg"
    ></div>
    <img
      v-else
      class="c-image__img"
      :class="{
        'c-image__img--contain': contain,
      }"
      :style="imgStyle"
      :src="imgSrc"
      :alt="alt"
      :ariaLabel="arialLabelValue"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import imagePlaceholder from '@/assets/image/image-placeholder.jpeg';

export default defineComponent({
  name: 'ReImage',
  props: {
    src: {
      props: [String, Object],
      default: '',
    },
    alt: {
      props: String,
      default: '圖片',
    },
    ariaLabel: {
      props: String,
      default: '圖片',
    },
    srcPlaceholder: {
      props: [String, Object],
      default: '',
    },
    width: {
      props: String,
      default: '100%',
    },
    height: {
      props: String,
      default: 'auto',
    },
    contain: {
      type: Boolean,
      default: false,
    },
    containBg: {
      type: String,
      default: 'transparent',
    },
    containBorder: {
      type: String,
      default: '',
    },
    // 以下用於設定背景圖
    bg: {
      type: Boolean,
      default: false,
    },
    bgSetting: {
      width: '100%',
      height: '100%',
      position: 'center',
      repeat: 'no-repeat',
      size: 'cover',
    },
  },
  setup(props) {
    const imgSrc = computed(() => {
      return props.src || props.srcPlaceholder || imagePlaceholder;
    });

    const arialLabelValue = computed(() => {
      return props.ariaLabel || props.alt;
    });

    const imgStyle = computed(() => {
      if (props.contain) {
        return {
          width: props.width,
          height: props.height,
        };
      }

      return {
        height: props.height,
      };
    });

    const imgContainerStyle = computed(() => {
      if (props.contain) {
        const tempStyle = {
          width: props.width,
          height: props.height,
          'background-color': props.containBg,
        };

        if (props.containBorder) {
          tempStyle.outline = props.containBorder;
        }

        return tempStyle;
      }

      return {
        width: props.width,
      };
    });

    const bgStyle = computed(() => {
      return {
        width: props.bgSetting.width,
        height: props.bgSetting.height,
        'background-position': props.bgSetting.position || 'center',
        'background-repeat': props.bgSetting.repeat || 'no-repeat',
        'background-size': props.bgSetting.size || 'cover',
      };
    });

    return {
      imagePlaceholder,
      imgSrc,
      arialLabelValue,
      imgStyle,
      imgContainerStyle,
      bgStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
.c-image {
  width: 100%;
  box-sizing: border-box;

  &__img {
    width: 100%;
    vertical-align: bottom;

    &--contain {
      object-fit: contain;
    }
  }
}
</style>
