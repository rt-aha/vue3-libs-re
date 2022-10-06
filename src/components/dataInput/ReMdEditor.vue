<template>
  <div class="c-md-editor">
    <v-md-editor v-model="mdTexts" height="400px" />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import useValidate from '@/hooks/useValidate';

export default defineComponent({
  name: 'ReInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const mdTexts = ref('');
    const { validFn } = useValidate();
    const updateValue = (value) => {
      emit('update:modelValue', value);

      // validFn(event);
    };

    watch(
      () => mdTexts.value,
      (newValue) => {
        // console.log('input', 'newValue',newValue)
        updateValue(newValue);
      },
    );

    const init = () => {
      mdTexts.value = props.modelValue;
    };

    init();

    return {
      updateValue,
      mdTexts,
    };
  },
});
</script>

<style lang="scss"></style>
