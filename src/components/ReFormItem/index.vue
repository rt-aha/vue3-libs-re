<template>
  <div class="re-form-item">
    <p class="re-form-item__label">輸入框</p>
    <slot />
    <ReFormMessage :errorMessage="formErrorMessage[formKey]"/>
  </div>
</template>
<script>
import { defineComponent, inject,computed } from 'vue';
import ReFormMessage from '@/components/ReFormMessage/index.vue'

export default defineComponent({
  name: 'ReFormItem',
  components: {
    ReFormMessage
  },
  props: {
    formKey: {
      type: String,
      default: ''
    }
  },
  setup() {

    const val = computed(() => inject('formValue')())
    const formErrorMessage = computed(() => inject('formErrorMessage')())
    const formRules = inject('formRules');

    return {
      val,
      formRules,
      formErrorMessage
    }
  }
});
</script>
<style lang="scss" scoped>

.re-form-item {
  &__label {
    @include font-style($c-input-label, 14, 400, 1px);
    margin-bottom: 5px;
  }
}
</style>
