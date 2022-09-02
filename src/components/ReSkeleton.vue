<template>
  <div
    class="c-skeleton"
    :class="{
      'c-skeleton--animate--fadeInOut': animateFadeInOut,
    }"
    :style="marginSetting"
  >
    <div class="c-skeleton__rect" v-if="type === 'rect'" :style="rectStyle"></div>
    <div class="c-skeleton__circle" v-if="type === 'circle'" :style="circleStyle"></div>
  </div>
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
  },

  setup(props) {
    const rectStyle = computed(() => {
      return {
        height: props.bold,
        backgroundColor: props.bgColor,
        borderRadius: props.round,
      };
    });

    const circleStyle = computed(() => {
      console.log('firstprops.round', props.round);
      const radius = props.wh.replace('px', '') / 2 + 'px';

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

    return {
      rectStyle,
      circleStyle,
      marginSetting,
    };
  },
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
