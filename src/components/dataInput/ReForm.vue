<template>
  <div class="re-form">
    <slot />
  </div>
</template>

<script>
import { defineComponent, provide, ref, watch } from 'vue';

export default defineComponent({
  name: 'ReReForm',
  props: {
    formValue: {
      type: Object,
      default: () => ({}),
    },
    formRules: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const innerFormValue = ref({});
    const formErrorMessage = ref({});

    watch(
      () => props.formValue,
      () => {
        innerFormValue.value = props.formValue;
      },
      { deep: true, immediate: true },
    );

    provide('formValue', () => innerFormValue.value);
    provide('formErrorMessage', () => formErrorMessage.value);
    provide('formRules', props.formRules);
    provide('formSetting', props.setting);

    return {};
  },
});
</script>

<style lang="scss" scoped>
.re-form {
  @include flex(flex-start, flex-start);
  margin: 0 -8px;
  flex-wrap: wrap;
}
</style>
