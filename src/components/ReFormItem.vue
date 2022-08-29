<template>
  <div class="re-form-item">
    <p class="re-form-item__label">
      <span class="re-form-item__label__text">{{ label }}</span>
      <span class="re-form-item__label__hint">{{ hint }}</span>
    </p>
    <slot />
    <p class="re-form-item__message">
      <ReFormMessage :errorMessage="formErrorMessage" v-show="formErrorMessage" />
    </p>
  </div>
</template>
<script>
import { defineComponent, inject, ref } from 'vue';
import ReFormMessage from '@/components/ReFormMessage.vue';

export default defineComponent({
  name: 'ReFormItem',
  components: {
    ReFormMessage,
  },
  props: {
    formKey: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const formErrorMessage = ref('');
    const formValue = inject('formValue');
    const formRules = inject('formRules');

    const validate = async (event) => {
      let rule = formRules[props.formKey];

      if (rule) {
        const triggerEvents = rule.trigger || [];

        if (triggerEvents.includes(event) || event === 'enforceValidate') {
          // 這個 validator 就是是外面設定的
          const result = await rule.validator({
            value: formValue()[props.formKey],
            label: props.label,
            trigger: triggerEvents,
          });

          if (!result.isPass) {
            return result.errorMessage;
          }
        }
      }

      return null;
    };

    const validateFields = async (event) => {
      if (formRules[props.formKey]) {
        const errorMessage = await validate(event);

        if (errorMessage) {
          formErrorMessage.value = errorMessage;
          return false;
        }

        formErrorMessage.value = '';
        return true;
      }
    };

    return {
      formValue,
      formRules,
      formErrorMessage,
      validateFields,
    };
  },
});
</script>
<style lang="scss" scoped>
.re-form-item {
  position: relative;

  & + & {
    margin-top: 10px;
  }

  &__label {
    margin-bottom: 5px;

    &__text {
      display: inline-block;
      @include font-style($c-main, 14, 400, 1.6px, 20px);
    }

    &__hint {
      display: inline-block;
      @include font-style($c-input-hint, 12, 400, 1.4px, 24px);
    }
  }

  &__message {
    height: 20px;
  }
}
</style>
