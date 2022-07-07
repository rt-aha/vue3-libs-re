<template>
  <div class="re-form">
    <slot />
  </div>
</template>

<script>
import { forEach } from 'lodash';
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
    // console.log('formValue',props.formValue)
    const innerFormValue = ref({});
    const formErrorMessage = ref({});

    const validate = (rules, value) => {
      for (let rule of rules) {
        const valid = rule.validator(value)
        if (!valid) {
          return rule.message;
        }
      }

       return null;
    }

    const validateFields = () => {
      formErrorMessage.value = {}
      const formValueKeys = Object.keys(innerFormValue.value)

      formValueKeys.forEach(key => {
        if (key in props.formRules) {
          const errorMessage = validate(props.formRules[key], innerFormValue.value[key]);

          if (errorMessage) {
            formErrorMessage.value[key] = errorMessage;
          }
        }
      })
    }

    watch(() => props.formValue, () => {
      innerFormValue.value = props.formValue;
      validateFields();
    }, { deep: true })

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
