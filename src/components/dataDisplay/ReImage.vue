<template>
  <div class="c-image" :style="imgContainerStyle">
    <div
      v-if="bg"
      class="c-image__bg"
      :style="{
        'background-image': `url('${imgSrc}')`,
        ...bgStyle,
      }"
    />
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
    >
  </div>
</template>

<script setup>
import imagePlaceholder from '@/assets/image/image-placeholder.jpeg';

const props = defineProps({
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
});

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
      'width': props.width,
      'height': props.height,
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
    'width': props.bgSetting.width,
    'height': props.bgSetting.height,
    'background-position': props.bgSetting.position || 'center',
    'background-repeat': props.bgSetting.repeat || 'no-repeat',
    'background-size': props.bgSetting.size || 'cover',
  };
});
</script>

<style lang="scss" scoped>
.c-image {
  box-sizing: border-box;
  width: 100%;

  &__img {
    width: 100%;
    vertical-align: bottom;

    &--contain {
      object-fit: contain;
    }
  }
}
</style>
