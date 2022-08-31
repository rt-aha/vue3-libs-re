<template>
  <div class="c-image" :style="imgContainerStyle">
    <img
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

    return {
      imagePlaceholder,
      imgSrc,
      arialLabelValue,
      imgStyle,
      imgContainerStyle,
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
