<template>
  <div class="re-form-item">
    <p class="re-form-item__label">{{label}}</p>
    <slot />
    <ReFormMessage :errorMessage="formErrorMessage" />
  </div>
</template>
<script>
import { defineComponent, inject, ref } from 'vue';
import ReFormMessage from '@/components/ReFormMessage.vue'

export default defineComponent({
  name: 'ReFormItem',
  components: {
    ReFormMessage
  },
  props: {
    formKey: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    const formErrorMessage = ref('')
    const formValue = inject('formValue');
    const formRules = inject('formRules');

    const validate = (event) => {
      for (let rule of formRules[props.formKey]) {
        const triggerEvents = rule.trigger || [];

        if (triggerEvents.includes(event)) {
          const valid = rule.validator(formValue()[props.formKey])
          if (!valid) {
            return rule.message;
          }
        }
      }

      return null;
    }

    const validateFields = (event) => {
      if (formRules[props.formKey]) {

        const errorMessage = validate(event);
        if (errorMessage) {
          formErrorMessage.value = errorMessage;
        }
      }
    }

    return {
      formValue,
      formRules,
      formErrorMessage,
      validateFields
    }
  }
});
</script>
<style lang="scss" scoped>
.re-form-item {

  &+& {
    margin-top: 10px;
  }

  &__label {
    @include font-style($c-input-label, 14, 400, 1px);
    margin-bottom: 5px;
  }
}
</style>
