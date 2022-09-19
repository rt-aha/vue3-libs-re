<template>
  <div class="v-collapse-transition" ref="wrapper">
    <div class="v-collapse-transition__content">
      <slot />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, watch, nextTick } from 'vue';

export default defineComponent({
  name: 'ReCollapseTransition',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    detect: {},
  },
  setup(props) {
    const calcHeight = ref(0);
    const wrapper = ref(null);

    const hide = () => {
      wrapper.value.style.height = '0px';
    };

    const show = () => {
      wrapper.value.style.height = `${calcHeight.value}px`;
    };

    const reCalcHeight = async () => {
      wrapper.value.style.height = 'auto';
      await nextTick();
      calcHeight.value = wrapper.value.clientHeight;
      wrapper.value.style.height = '0px';
    };

    onMounted(() => {
      reCalcHeight();
    });

    watch(
      () => props.show,
      (newVal) => {
        if (newVal) {
          show();
        } else {
          hide();
        }
      },
    );

    watch(
      () => props.detect,
      () => {
        reCalcHeight();
        show();
      },
      // { deep: true },
    );

    return {
      calcHeight,
      wrapper,
      hide,
    };
  },
});
</script>
<style lang="scss" scoped>
.v-collapse-transition {
  transition: 0.4s;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 1px 1px 5px #ededed;

  &__content {
  }
}
</style>
