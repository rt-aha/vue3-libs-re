<template>
  <div class="re-form-item">
    <p class="re-form-item__label">
      <span v-if="required" class="re-form-item__label__required" />
      <span class="re-form-item__label__text">{{ label }}</span>
      <span class="re-form-item__label__hint">{{ hint }}</span>
    </p>
    <slot />
    <p class="re-form-item__message">
      <ReFormMessage v-show="formErrorMessage" :error-message="formErrorMessage" />
    </p>
  </div>
</template>

<script setup>
import ReFormMessage from '@/components/dataInput/ReFormMessage.vue';

const props = defineProps({
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
  required: {
    default: false,
  },
});
const formErrorMessage = ref('');
const formValue = inject('formValue');
const formRules = inject('formRules');

const validate = async (event) => {
  const rule = formRules[props.formKey];

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

defineExpose({
  validateFields,
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
      @include font-style($c-deepblue, 14, 400, 1.6px, 20px);
      display: inline-block;
    }

    &__required {
      @include circle(4px);
      position: relative;
      top: -4px;
      display: inline-block;
      margin-right: 5px;
      background-color: $c-red;
    }

    &__hint {
      @include font-style($c-input-hint, 12, 400, 1.4px, 24px);
      display: inline-block;
    }
  }

  &__message {
    height: 20px;
  }
}
</style>
