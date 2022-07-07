<template>
  <div class="re-form">
    <slot />
  </div>
</template>

<script>

import { defineComponent, watch, provide, ref } from 'vue';

export default defineComponent({
  name: 'ReReForm',
  props: {
    formValue: {
      type: Object,
      default: () => ({})
    },
    formRules: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props) {
    const innerFormValue = ref({});
    const formErrorMessage = ref({});

    watch(() => props.formValue, () => {
      innerFormValue.value = props.formValue;
    }, { deep: true, immediate: true })

    provide('formValue', () => innerFormValue.value)
    provide('formErrorMessage', () => formErrorMessage.value)
    provide('formRules', props.formRules);

    return {

    }
  }
});
</script>

<style lang="scss" scoped>
</style>
