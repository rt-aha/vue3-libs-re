<template>
  <div class="re-form-grid" :style="gridStyle">
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { debounce } from 'lodash';

export default defineComponent({
  name: 'ReFormGrid',
  props: {
    layout: {
      type: [Object, null],
      default: null,
    },
    extraSetting: {
      type: Object,
      default: () => ({}),
    },

  },
  setup(props) {
    // const deviceType = ref([]);
    const layoutSetting = ref();
    const formSetting = inject('formSetting');

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
          marginBottom: props.extraSetting?.itemSpace || formSetting?.itemSpace || '0px',
        };
      }

      if (layoutSetting.value === '24') {
        return {
          width: '100%',
          marginBottom: props.extraSetting?.itemSpace || formSetting?.itemSpace || '0px',
        };
      }

      return {
        width: `${(props.layout[layoutSetting.value] / 24) * 100}%`,
        marginBottom: props.extraSetting?.itemSpace || formSetting?.itemSpace || '0px',
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
      formSetting,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-form-grid {
  @include padding(0 8px);
  width: 33.333333%;
  flex: none;
}
</style>
