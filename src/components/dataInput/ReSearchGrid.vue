<template>
  <div class="re-search-grid" :style="gridStyle">
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { debounce } from 'lodash';

export default defineComponent({
  name: 'ReSearchGrid',
  props: {
    layout: {
      type: [Object, null],
      default: null,
    },
  },
  setup(props) {
    // const deviceType = ref([]);
    const layoutSetting = ref();

    const selectLayoutSetting = () => {
      if (!props.layout) { return; }

      layoutSetting.value = '24';
      const windowWidth = document.body.clientWidth;
      const widthBreakPoint = Object.keys(props.layout)
        .map(item => Number(item))
        .sort((a, b) => b - a);

      for (const breakPoint of widthBreakPoint) {
        if (windowWidth > breakPoint) {
          layoutSetting.value = String(breakPoint);
          return;
        }
      }

      return layoutSetting.value;
    };

    const gridStyle = computed(() => {
      if (!props.layout) {
        return {
          width: '100%',
        };
      }

      if (layoutSetting.value === '24') {
        return {
          width: '100%',
        };
      }

      return {
        width: `${(props.layout[layoutSetting.value] / 24) * 100}%`,
      };
    });

    const reCalcWindowWidthDebounce = debounce(() => {
      selectLayoutSetting();
    }, 100);

    onMounted(() => {
      selectLayoutSetting();
      window.addEventListener('resize', reCalcWindowWidthDebounce);
    });

    return {
      gridStyle,
      layoutSetting,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-search-grid {
  @include padding(0 10px);
  width: 33.333333%;
  flex: none;
}
</style>
