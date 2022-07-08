<template>
  <div class="v-collapse-transition" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted,watch } from 'vue';

export default defineComponent({
  name: 'ReCollapseTransition',
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    const calcHeight = ref(0);
    const wrapper = ref(null);

    const hide = () => {
      wrapper.value.style.height = '0px';
    }

    const show = () => {
      wrapper.value.style.height = `${calcHeight.value}px`;
    }


    onMounted(() => {
      calcHeight.value = wrapper.value.clientHeight;
      wrapper.value.style.height = '0px';
    })

    watch(() => props.show, (newVal) => {
      
      if (newVal) {
        show()
      } else {
        hide();
      }
    })

    return {
      show,
      calcHeight,
      wrapper,
      hide,
      show,
    }
  }
});
</script>
<style lang="scss" scoped>
.v-collapse-transition {
  overflow: hidden;
  transition: .4s;
  box-shadow: 0 0 10px 3px $c-shadow;
}
</style>
