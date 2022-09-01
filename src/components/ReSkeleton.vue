<template>
  <div
    class="c-skeleton c-skeleton__rect"
    :class="{
      'c-skeleton--animate--fadeInOut': animateFadeInOut,
      'c-skeleton--animate--progressing': animateProgressing,
    }"
    v-if="type === 'rect'"
    :style="rectStyle"
  ></div>
  <div
    class="c-skeleton c-skeleton__circle"
    :class="{
      'c-skeleton--animate--fadeInOut': animateFadeInOut,
      'c-skeleton--animate--progressing': animateProgressing,
    }"
    v-if="type === 'circle'"
    :style="circleStyle"
  ></div>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ReSkeleton',
  props: {
    type: {
      type: String,
      default: 'rect',
      validtor: (val) => ['rect', 'circle'].includes(val),
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
    animateProgressing: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const rectStyle = computed(() => {
      return {
        height: props.bold,
        marginTop: props.mt,
        marginBottom: props.mb,
        backgroundColor: props.bgColor,
        borderRadius: props.round,
      };
    });

    const circleStyle = computed(() => {
      console.log('firstprops.round', props.round);
      const radius = props.wh.replace('px', '') / 2 + 'px';

      return {
        marginTop: props.mt,
        marginBottom: props.mb,
        width: props.wh,
        height: props.wh,
        backgroundColor: props.bgColor,
        borderRadius: props.round || radius,
      };
    });
    return {
      rectStyle,
      circleStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
.c-skeleton {
  height: 12px;

  &--animate {
    &--fadeInOut {
      animation: 3s fadeInOut infinite;
    }

    &--progressing {
      animation: 3s progressing infinite;
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
