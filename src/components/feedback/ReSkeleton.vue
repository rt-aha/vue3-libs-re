<template>
  <div
    class="c-skeleton"
    :class="{
      'c-skeleton--animate--fadeInOut': animateFadeInOut,
    }"
    :style="marginSetting"
  >
    <div v-if="type === 'rect'" class="c-skeleton__rect" :style="rectStyle" />
    <div v-if="type === 'circle'" class="c-skeleton__circle" :style="circleStyle" />
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'rect',
    validtor: val => ['rect', 'circle'].includes(val),
  },
  bgColor: {
    type: String,
    default: '#DDDFE5',
  },
  mt: {
    type: String,
    default: '',
  },
  mb: {
    type: String,
    default: '',
  },
  round: {
    type: String,
    default: '',
  },
  wh: {
    type: String,
    default: '',
  },
  bold: {
    type: String,
    default: '12px',
  },
  animateFadeInOut: {
    type: Boolean,
    default: false,
  },
});

const rectStyle = computed(() => {
  return {
    height: props.bold,
    backgroundColor: props.bgColor,
    borderRadius: props.round,
  };
});

const circleStyle = computed(() => {
  console.log('firstprops.round', props.round);
  const radius = `${props.wh.replace('px', '') / 2}px`;

  return {
    width: props.wh,
    height: props.wh,
    backgroundColor: props.bgColor,
    borderRadius: props.round || radius,
  };
});

const marginSetting = computed(() => {
  return {
    marginTop: props.mt,
    marginBottom: props.mb,
  };
});
</script>

<style lang="scss" scoped>
.c-skeleton {
  overflow: hidden;

  &--animate {
    &--fadeInOut {
      animation: 3s fadeInOut infinite;
    }
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 0.4;
  }

  50% {
    opacity: 0.8;
  }

  100% {
    opacity: 0.4;
  }
}
</style>
